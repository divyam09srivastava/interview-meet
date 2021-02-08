const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const WebSocket = require('ws');
const Y = require('yjs');
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ noServer: true })

const docs = new Map()

const messageSync = 0
const messageAwareness = 1
const messageAuth = 2

const afterTransaction = (doc, transaction) => {
  if (transaction.encodedStructsLen > 0) {
    const encoder = Y.encoding.createEncoder()
    Y.encoding.writeVarUint(encoder, messageSync)
    Y.syncProtocol.writeUpdate(encoder, transaction.encodedStructsLen, transaction.encodedStructs)
    const message = Y.encoding.toBuffer(encoder)
    doc.conns.forEach((_, conn) => conn.send(message))
  }
}

class WSSharedDoc extends Y.Y {
  constructor () {
    super({ gc: true })
    this.mux = Y.createMutex()
    /**
     * Maps from conn to set of controlled user ids. Delete all user ids from awareness when this conn is closed
     * @type {Map<Object, Set<number>>}
     */
    this.conns = new Map()
    this.awareness = new Map()
    this.on('afterTransaction', afterTransaction)
  }
}

const messageListener = (conn, doc, message) => {
  const encoder = Y.encoding.createEncoder()
  const decoder = Y.decoding.createDecoder(message)
  const messageType = Y.decoding.readVarUint(decoder)
  switch (messageType) {
    case messageSync:
      Y.encoding.writeVarUint(encoder, messageSync)
      Y.syncProtocol.readSyncMessage(decoder, encoder, doc)
      if (Y.encoding.length(encoder) > 1) {
        conn.send(Y.encoding.toBuffer(encoder))
      }
      break
    case messageAwareness: {
      Y.encoding.writeVarUint(encoder, messageAwareness)
      const updates = Y.awarenessProtocol.forwardAwarenessMessage(decoder, encoder)
      updates.forEach(update => {
        doc.awareness.set(update.userID, update.state)
        doc.conns.get(conn).add(update.userID)
      })
      const buff = Y.encoding.toBuffer(encoder)
      doc.conns.forEach((_, c) => {
        c.send(buff)
      })
      break
    }
  }
}

const setupConnection = (conn, req) => {
  conn.binaryType = 'arraybuffer'
  // get doc, create if it does not exist yet
  let doc = docs.get(req.url.slice(1))
  if (doc === undefined) {
    doc = new WSSharedDoc()
    docs.set(req.url.slice(1), doc)
  }
  doc.conns.set(conn, new Set())
  // listen and reply to events
  conn.on('message', message => messageListener(conn, doc, message))
  conn.on('close', () => {
    const controlledIds = doc.conns.get(conn)
    doc.conns.delete(conn)
    const encoder = Y.encoding.createEncoder()
    Y.encoding.writeVarUint(encoder, messageAwareness)
    Y.awarenessProtocol.writeUsersStateChange(encoder, Array.from(controlledIds).map(userID => {
      doc.awareness.delete(userID)
      return { userID, state: null }
    }))
    const buf = Y.encoding.toBuffer(encoder)
    doc.conns.forEach((_, conn) => conn.send(buf))
  })
  // send sync step 1
  const encoder = Y.encoding.createEncoder()
  Y.encoding.writeVarUint(encoder, messageSync)
  Y.syncProtocol.writeSyncStep1(encoder, doc)
  conn.send(Y.encoding.toBuffer(encoder))
  if (doc.awareness.size > 0) {
    const encoder = Y.encoding.createEncoder()
    const userStates = []
    doc.awareness.forEach((state, userID) => {
      userStates.push({ state, userID })
    })
    Y.encoding.writeVarUint(encoder, messageAwareness)
    Y.awarenessProtocol.writeUsersStateChange(encoder, userStates)
    conn.send(Y.encoding.toBuffer(encoder))
  }
}

wss.on('connection', setupConnection)

server.on('upgrade', (request, socket, head) => {
  // You may check auth of request here..
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request)
  })
})

server.listen(PORT);

console.log(`server listening on ${PORT}`);