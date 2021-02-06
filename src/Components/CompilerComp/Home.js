import React from 'react'
import Header from "../HeaderComp/Header";
import "./Home.css";



const Home=() => {
   
    return (
        <>
        <Header />
        <div className="container__compiler">
            <div className="vertical__split">
        <div className="questions">
          <textarea rows="32" cols="20" style={{resize:"horizontal" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
                Question Goes Here
          </textarea>
        </div>
        <div className="Source__code">
          <textarea rows="32" cols="105"  style={{resize:"horizontal" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
              Source code goes here
          </textarea>

        </div>
        </div>
        <div  className="horizontal__split">
        <div className="std__input">
        <textarea rows="14" cols="40" style={{resize:"vertical" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
            Std:input goes here
        </textarea>
        </div>
        <div className="std__output">
        <textarea rows="16" cols="40" style={{resize:"vertcial" , background:"black",color:"white",fontFamily:"Montserrat",fontSize:"20px"}}>
            Std:output Goes Here
        </textarea>
        </div>
        </div>
        </div>
        </>
    );
};
export default Home;
