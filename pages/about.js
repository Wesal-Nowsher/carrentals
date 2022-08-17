            
import React,{useEffect,useState} from "react" 
 



import data2 from "./English.json";

import data1 from "./arabic.json";

export default function About() {
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

    <div className="site-section   top-padding-standard  section-small-margin"  id="booking-section">       
      <div className="container  ">
        <div className="row   mb-5">
          {/* <div className="col-lg-6 mb-5  mb-lg-0 order-lg-2">
            <img src="images/hero_2.jpg" alt="Image" className="img-fluid rounded" />
          </div> */}
          <div className="col-lg-!2   mr-auto p-5">
            <h1  className="text-cener mb-5 about-us-title">
            {fillerdata && fillerdata.about && fillerdata.about.name}
            </h1>
            
            <h1>{fillerdata && fillerdata.about && fillerdata.about.title}</h1>
            <h5 dangerouslySetInnerHTML={{ __html: fillerdata && fillerdata.about && fillerdata.about.slogan}} />
            
            <p
            dangerouslySetInnerHTML={{ __html: fillerdata && fillerdata.about && fillerdata.about.desc }}
            />
            
          </div>
        </div>
      </div>
    </div> 
    
</>
  )
}
