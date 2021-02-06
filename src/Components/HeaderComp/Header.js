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

import "./Header.css"
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
  
 const Header =() => {
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
    return (
        
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
          <MenuItem value={50}>C</MenuItem>
          <MenuItem value={54}>C++</MenuItem>
          <MenuItem value={71}>Python</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="h6" className={classes.title}>
         Drawing Board
      </Typography>
      <Button className={classes.btn1}>Download Source Code</Button>
      <Button className={classes.btn}>RUN</Button>
          </Toolbar>
          
        </AppBar>
      </div>
        
    );
};


export default Header;


