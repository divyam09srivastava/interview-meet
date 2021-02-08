import React, { Component } from 'react';

const Y = require('yjs')

// Yjs plugins
require('y-memory')(Y)
 require('y-array')(Y)
require('y-text')(Y)
require('y-websockets-client')(Y)

var io = Y['websockets-client'].io //need to get this.....

// NOTE: eliminated React warning by following directions in console.info in ./node_modules/yjs/src/y.js

// var link = 'http://localhost:1234' //when running textedit-app-yjs-websockets-server locally
// var link = 'http://localhost:5000' //when running `heroku local web`
var link = process.env.REACT_APP_YJS_HEROKU_URL //this link is set in my .env file, which is hidden from github

// create a connection
var connection = io(link) //need to include LINK within io()...



class Yjs extends Component {

  componentDidMount() {
    console.log('Yjs - componentDidMount - this.props is: ', this.props)
    console.log('Yjs - componentDidMount - this.props.showRoom is: ', this.props.showRoom)
  }

 


  render() {

    //console.logging connection details here won't show until state is updated...
    //note: above logs work after i update state.... -- moved to within promise!

    console.log('Yjs - render - this.props is: ', this.props)

    var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below

    console.log('Yjs -->>> connection in render is: ', connection)
    console.log('Yjs -->>> connection.connected in render is: ', connection.connected)
    console.log('Yjs -->>> connection.id in render is: ', connection.id)

    var connectionId = connection.id
    console.log('connectionId is: ', connectionId)


    if (this.props.connectionExists === false) {
      console.log('Yjs --->> this.props.connectionExists === false')
        // connection.destroy() //this works! server log shows 'user left', and updates to text don't sync on reconnect... (calling disconnect() instead of destroy() made updates still sync.)
        connection.disconnect()
        console.log('connection disconnected...')
        console.log('USER LEFT, connection DESTROYED.')
    } //end if statement

    //putting Y within a ternary operator, so it only gets rendered if connectionExists...
    if (this.props.connectionExists === true) {

      Y({
        db: {
          name: 'memory' // use the memory db adapter
        },
        connector: {
          name: 'websockets-client', // use the websockets-client connector
          room: this.props.showRoom, // passing in room from props...
          socket: connection, // passing connection above as the socket...
          url: link // the connection endpoint (see y-websockets-server)
        },
        share: {
          textarea: 'Text' // y.share.textarea is of type Y.Text
        }
      }).then(function (y) {
        // bind the textarea to a shared text element
        // y.share.textarea.bind(document.getElementById(that.props.showRoom))
        // y.share.textarea.bind(document.querySelector('textarea')) //this will show only first room...

        if (that.props.texteditorIsSummernote === true) {
          console.warn('Yjs ---->>> this Yjs is being rendered by a Summernote text editor!!!')
          console.warn('Yjs --->>>> that.props.showRoom is: ', that.props.showRoom)
          // bind the textarea to a shared text element
          // y.share.textarea.bind(document.getElementsByClassName("note-editable"))
          // y.share.text.bind(document.querySelector("div[contenteditable]")) //// bind text to the first p element that is contenteditable, via: https://github.com/y-js/y-text
          y.share.textarea.bind(document.querySelector("div[contenteditable]")) //// bind text to the first p element that is contenteditable, via: https://github.com/y-js/y-text

          y.share.textarea.delete(0, y.share.textarea._content.length) //first clear all text from y.share.textarea...
          y.share.textarea.insert(0, `initial text for ${that.props.showRoom} here...`) //then give each room some initial text...
        }

        else {
          y.share.textarea.bind(document.getElementById(that.props.showRoom)) // bind the textarea to a shared text element...
          y.share.textarea.delete(0, y.share.textarea._content.length) //first clear all text from y.share.textarea...
          // y.share.textarea.insert(0, `initial text for ${that.props.showRoom} here...`) //then give each room some initial text...
          //NOTE: instead of inserting initial text, using placeholder text instead...
        }

        console.log('HELLO from y promise!!!')
        console.log('y is: ', y)
        // console.log('y.connector.userId is: ', y.connector.userId)
        // console.log('y.connector.connections is: ', y.connector.connections)

        //don't need below if statement with if (this.props.connectionExists === false) above...
        if (that.props.connectionExists === false) {
          console.log('y - if connectionExists is false, destroy connection...')
          y.destroy()
          console.log('called y.DESTROY')
        }

      })
    } //end if statement


    return (
      <div className="Yjs-style">

        {/* <h3>
          Yjs component - connectionExists: {this.props.connectionExists ? "true" : "false"}
        </h3> */}

        <p>
        
            Yjs: {this.props.showRoom}
         
        </p>

      </div>
    );
  }
}

export default Yjs;