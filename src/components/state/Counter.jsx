import React,{useState}from "react";
//import Navbar from "./Navbar";
export default function Counter() {
    const[x, setx]=useState(0);
    const handlecount=()=>{
        setx(x+1);
        console.log(x);
    }
    const handlereset=()=>{
        setx(0);
    }
    return (
        <div>
        <div style={{textAlign:"center",marginTop:"10%"}}>
            <h1>{x}</h1>
            <button onClick={handlecount}>Add</button>
            <button onClick={handlereset}>Reset</button>
        </div>
        </div>
    );
}