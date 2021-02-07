import './App.css';
import React,{useState,useEffect} from 'react';
import Home from "./Components/CompilerComp/Home";
import MultilineTextFields from "./Components/QuestionComp";
import firebase from "./Components/firebase";

import { BrowserRouter, Route, Switch } from "react-router-dom";
require('dotenv').config()


function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then((val) => {
      setFirebaseInitialized(val);
    });
  });
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/add">
        <MultilineTextFields />
      </Route>
      
      
    </Switch>
  </BrowserRouter>
  );
}

export default App;



