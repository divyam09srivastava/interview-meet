import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import firebase from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function MultilineTextFields() {
  const classes = useStyles();

//   title,
//     level,
//     question,
//     category,
//     input,
//     output,
//     explanation,
//     testcases
  const [title, setTitle] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [exp, setExp] = React.useState("");



  async function onSubmit() {
    try {
      await firebase.addQuestion(
        title,
    level,
    question,
    category,
    input,
    output,
    exp
      );

      setTitle("");
      setQuestion("");
      setLevel("");
      setOutput("");
      setInput("");
      setExp("");
    } catch (error) {
      alert(error.message);
    }


  }
 

  

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          placeholder="Title"
          rowsMax={4}
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
        />
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Level"
          multiline
          value={level}
          onChange={(e)=>{setLevel(e.target.value)}}
        />
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          placeholder="Question"
          value={question}
          onChange={(e)=>{setQuestion(e.target.value)}}
        />
      </div>
      <div>
        <TextField
          id="filled-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax={4}
          placeholder="Input"
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
          variant="filled"
        />
        <TextField
          id="filled-textarea"
          label="Multiline Placeholder"
          placeholder="Output"
          multiline
          value={output}
          onChange={(e)=>{setOutput(e.target.value)}}
          variant="filled"
        />
        <TextField
          id="filled-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          placeholder="Explanation"
          value={exp}
          onChange={(e)=>{setExp(e.target.value)}}
          variant="filled"
        />
      </div>
      <Button onClick={()=>{onSubmit()}}>ADD</Button>
    </form>
  );
}
