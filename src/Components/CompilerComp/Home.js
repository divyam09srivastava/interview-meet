import "./Home.css";

import React ,{useEffect} from 'react'
import logo from "../images/interview-meet-logo-rev.png";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import $, { error } from 'jquery';
import useEventListener from '@use-it/event-listener'
import firebase from "../firebase";
import db from '../firebase';

import ScriptTag from 'react-script-tag';
import  "../../../node_modules/socket.io-client/dist/socket.io.js"
import io from "socket.io-client"


const useStyles = makeStyles((theme) => ({
    
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    btn :
    {
        marginLeft:"10px",
        marginRight:"10px",
        background:"green",color:"white",fontFamily:"Montserrat"
    }
    ,
    title:
    {
        marginLeft:"10px",
        marginRight:"10px",
        fontFamily:"Montserrat",
        fontSize:"15px"
    },
    btn1: {
        color:"white", fontFamily:"Montserrat",
        marginLeft:"10px",
        marginRight:"10px",
        background:"green",float:"right"

    },
    btn2 :
    {
      color:"white", fontFamily:"Montserrat",
        marginLeft:"10px",
        marginRight:"10px",
        background:"green"
    }
  }));

const Home=() => {
   
    const classes = useStyles();
    const [lang, setLang] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [question,setQuestion] = React.useState([]);
    const handleChange = (event) => {
      setLang(event.target.value);
    };

    const Random = () =>{
      var RandomNumber = Math.floor(Math.random() * 4) + 1 ;
      return RandomNumber
    }
  //   const fetchQuestion=async()=>{
        
  //       // var RandomNumber = Math.floor(Math.random() * 4) + 1 ;
  //       // var sizeofdata= snapshot.numChildren();
  //       setQuestion = 
  // db.collection('questions')
  // .doc('1');
        
  //     }
  //     useEffect(() => {
  //       fetchQuestion();
  //     }, [])
  //   var data="";
//   db.ref('questions').once('value').then(function(snapshot)
//   {
//       const exist= (snapshot.val() !=null);

//       if(exist) data= snapshot.val();
//       console.log('Single Value ', data);
//   }).catch(error=> console.log(error));
var data
useEffect(() => {


  

  const RandomNumber = Random();
  const fetchdata = async () => {
    
    
    
    await firebase.db
      .collection("questions")
      .where("id", "==", `${RandomNumber}`)
      .get()
      .then((querySnapshot) => {
         data = querySnapshot.docs.map((doc) => doc.data());
         console.log(data);
        // console.log(data[0]);
        console.log(RandomNumber);
         setQuestion(data[0]);
      });
  };



  const clientsocketConnection =  () => {
  
  console.log("HEllo bois")
  var socket = io('https://shielded-caverns-62222.herokuapp.com/', {transports: ['websocket', 'polling', 'flashsocket']});
console.log(socket)
const l = console.log
function getEl(id) {
    return document.getElementById(id)
}
const editor = getEl("source")
editor.addEventListener("keyup", (evt) => {
    const text = editor.value
    socket.send(text)
})
socket.on('message', (data) => {
    editor.value = data
})

};


clientsocketConnection();
fetchdata();
},Random());


// const Demo = props => (
//   <div>
//   <ScriptTag type="text/javascript" src="../../client.js" />
  
//   <ScriptTag type="text/javascript" src="./node_modules/socket.io-client/dist/socket.io.js"/>
//   </div>
//   )


const fetchdatapickaone = async () => {
    const RandomNumber = Random(); 
  
  
  await firebase.db
    .collection("questions")
    .where("id", "==", `${RandomNumber}`)
    .get()
    .then((querySnapshot) => {
       data = querySnapshot.docs.map((doc) => doc.data());
       console.log(data);
      // console.log(data[0]);
      console.log(RandomNumber);
       setQuestion(data[0]);
    });
};

  

    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    var API_KEY = "3f567087f1msh4d658c90814ad06p16672cjsn95ce355e3015"; // Get yours for free at https://judge0.com/ce or https://judge0.com/extra-ce

var language_to_id = {
    "Bash": 46,
    "C": 50,
    "C#": 51,
    "C++": 54,
    "Java": 62,
    "Python": 71,
    "Ruby": 72
};

function encode(str) {
    return btoa(unescape(encodeURIComponent(str || "")));
}

function decode(bytes) {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
}

function errorHandler(jqXHR, textStatus, errorThrown) {
    $("#output").val(`${JSON.stringify(jqXHR, null, 4)}`);
    $("#run").prop("disabled", false);
}

function check(token) {
    $("#output").val($("#output").val() + "\nChecking submission status...");
    $.ajax({
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true`,
        type: "GET",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        },
        success: function (data, textStatus, jqXHR) {
            if ([1, 2].includes(data["status"]["id"])) {
                $("#output").val($("#output").val() + "\nStatus: " + data["status"]["description"]);
                setTimeout(function() { check(token) }, 1000);
            }
            else {
                var output = [decode(data["compile_output"]), decode(data["stdout"])].join("\n").trim();
                $("#output").val(output);
                $("#run").prop("disabled", false);
            }
        },
        error: errorHandler
    });
}

function run() {
    console.log("hello")
    $("#run").prop("disabled", true);
    $("#output").val("Creating submission...");
    $.ajax({
        url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true",
        type: "POST",
        contentType: "application/json",
        headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key": API_KEY
        },
        data: JSON.stringify({
            "language_id": language_to_id[lang],
            "source_code": encode($("#source").val()),
            "stdin": encode($("#input").val()),
            "redirect_stderr_to_stdout": true
        }),
        success: function(data, textStatus, jqXHR) {
            $("#output").val($("#output").val() + "\nSubmission created.");
            setTimeout(function() { check(data["token"]) }, 1000);
        },
        error: errorHandler
    });
}

// $("body").keydown(function (e) {
//     if (e.ctrlKey && e.keyCode == 13) {
//         run();
//     }
// });

const ESCAPE_KEYS = ['27', 'Escape'];


  function handler({ key }) {
    if (ESCAPE_KEYS.includes(String(key))) {
        {
            run();
        }
    }
  }

  useEventListener('keydown', handler);

$("textarea").keydown(function (e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        var append = "    ";
        $(this).val($(this).val().substring(0, start) + append + $(this).val().substring(end));

        this.selectionStart = this.selectionEnd = start + append.length;
    }
});

$("#source").focus();



 function downloadTxtFile()  {
  const element = document.createElement("a");
  const file = new Blob([document.getElementById('source').value],    
              {type: 'text/plain;charset=utf-8'});
  element.href = URL.createObjectURL(file);
  element.download = "myFile.txt";
  document.body.appendChild(element);
  element.click();
}


    return (
        <>
        <div className="root">
        <AppBar position="static" style={{background:"black" , display:"flex"}}>
          <Toolbar>
           <img edge="start" src={logo} className="navbar__logo"></img>
           <FormControl className={classes.formControl}>
           <InputLabel id="demo-controlled-open-select-label" style={{color:"white",fontFamily:"Montserrat",marginRight:"10px",marginLeft:"10px"}}>Language</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={lang}
          onChange={handleChange} style={{color:"white" , fontFamily:"Montserrat"}}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"C"}>C</MenuItem>
          <MenuItem value={"C++"}>C++</MenuItem>
          <MenuItem value={"Python"}>Python</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h6" className={classes.title}>
         Drawing Board
      </Typography>
      <Button onClick={downloadTxtFile} className={classes.btn1}>Download Source Code</Button>
      <Button id="run" onClick={run} className={classes.btn}>RUN</Button>
      <Button  onClick={fetchdatapickaone} className={classes.btn2}>Pick a One</Button>
      <Typography variant="h6" style={{fontSize:"13px", flexGrow:1, float:"right"}}>
        Developed by-: DJ, DS, TK
      </Typography>
          </Toolbar>
          
        </AppBar>
      </div>
        <div className="container__compiler">
          
          <div style={{width:"15vw",height:"91vh", maxHeight:"91vh",minWidth:"10vw", background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
           <h3>{question.title}</h3> 
          <p style={{color:"green"}}>{question.level}</p>
          
          <p> Question : {question.question} </p>
          <p>Example:</p>
          <p>Input1 : {question.input}</p>
          <p>Output : {question.output}</p>
          <p>Explanation : {question.explanation}</p>
          </div>
          
          <div className="source__code">
          <textarea id="source" style={{width:"85vw",height:"70vh",maxHeight:"70vh",minWidth:"70vw",maxWidth:"85vw",resize:"none",background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
          
          </textarea>


        
        
        <div className="horizontal__flex">
        <textarea id ="input" style={{width:"25vw",height:"20vh",minWidth:"25vw" ,background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px",resize:"horizontal"}}>
            Std:input goes here
        </textarea>
     
        <textarea readOnly id="output" style={{width:"60vw",height:"20vh", background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px",resize:"none"}}>
            
        </textarea>
        </div>
        </div>
        </div>

        <>

        {/* <ScriptTag type="text/javascript" src="../../../node_modules/socket.io-client/dist/socket.io.js"/> */}
    
  
  
      </>

        </>
        
    );
    
};
export default Home;
