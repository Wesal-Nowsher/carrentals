
            
import React,{useEffect,useState} from "react" 
 
import data2 from "./English.json";

import data1 from "./arabic.json";

export default function Contact() {
    const [fillerdata, setFillerdata]=useState({});
  
    useEffect(()=>{ 
        if(!localStorage.getItem("languageselected")){
          setFillerdata(data2); 
        }
        else{
            if(localStorage.getItem("languageselected")==="english"){
              setFillerdata(data2); 
            }
            else if(localStorage.getItem("languageselected")==="arabic"){
              setFillerdata(data1); 
            }
        } 
      },[])

  return (   
<>     
<div className="site-section bg-light  top-padding-standard" id="contact-section">
    <div className="container  ">
     
    </div>
  </div>


   
</>
  )
}

   