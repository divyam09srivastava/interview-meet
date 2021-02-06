

import "./Home.css";

import React from 'react'
import logo from "../images/interview-meet-logo.PNG";
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
import $ from 'jquery';


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
        fontFamily:"Montserrat"
    },
    btn1: {
        color:"black", fontFamily:"Montserrat",
        marginLeft:"10px",
        marginRight:"10px",
        background:"white",float:"right"

    }
  }));

const Home=() => {
   
    const classes = useStyles();
    const [lang, setLang] = React.useState('');
    const [open, setOpen] = React.useState(false);
  
    const handleChange = (event) => {
      setLang(event.target.value);
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

$("body").keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
        run();
    }
});

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






    return (
        <>
        <div className="root">
        <AppBar position="static" style={{background:"black" , display:"flex"}}>
          <Toolbar>
           <img src={logo} className="navbar__logo"></img>
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
      <Button className={classes.btn1}>Download Source Code</Button>
      <Button id="run" onClick={run} className={classes.btn}>RUN</Button>
          </Toolbar>
          
        </AppBar>
      </div>
        <div className="container__compiler">
            <div className="vertical__split">
        <div className="questions">
          <textarea rows="32" cols="20" style={{resize:"horizontal" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
                Question Goes Here
          </textarea>
        </div>
        <div className="Source__code">
          <textarea id="source" rows="32" cols="105"  style={{resize:"horizontal" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
              Source code goes here
          </textarea>

        </div>
        </div>
        <div  className="horizontal__split">
        <div className="std__input">
        <textarea id ="input" rows="14" cols="40" style={{resize:"vertical" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
            Std:input goes here
        </textarea>
        </div>
        <div className="std__output">
        <textarea readonly id="output"rows="16" cols="40" style={{resize:"vertcial" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
            
        </textarea>
        </div>
        </div>
        </div>
        </>
    );
};
export default Home;
