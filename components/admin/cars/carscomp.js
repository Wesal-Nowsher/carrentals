 import React,{useState,useEffect} from "react"

 
import data2 from "../../../pages/English.json";

import data1 from "../../../pages/arabic.json";

import Carslisting from "../carlisting"

export default function  Car() {
    
    const [fillerdata, setFillerdata]=useState({});
    const [modalIsOpennew, setIsOpennew] = useState(false);
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
    return <>
     
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className='mt-5 pl-5' >Cars</h3>
                  <button className='mt-5  btn btn-primary' onClick={()=> { setIsOpennew(true)}}>Add car</button>
                </div> 
                <Carslisting fillerdata={fillerdata} setIsOpennew={setIsOpennew} modalIsOpennew={modalIsOpennew} />

    </>;
};


