            
import React,{useEffect,useState} from "react" 
 



import data2 from "./English.json";

import data1 from "./arabic.json";

export default function FAQS() {
    const [fillerdata, setFillerdata]=useState({});
    const [answershown, setShownanswer]=useState("");
  
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

    <div className="site-section  pt-5  top-padding-standard  section-small-margin"  id="booking-section">       
      <div className="container  ">
        <div className="row   mb-5">
        <div className="col-lg-12">
            <h2 className="section-heading"><strong> {fillerdata && fillerdata.FAQSTITLE && fillerdata.FAQSTITLE }</strong></h2>
            
          </div>
          <div className="col-lg-12   mr-auto  ">
            {fillerdata && fillerdata.faqs && fillerdata.faqs.map((item,index)=>{
                return (
                    <div key={index} className={`cursor-pointer ${ answershown===index ? "box-shdow-on":"box-shdow-on"}`}>
                    <p className="mb-0" onClick={()=> answershown===index ? setShownanswer(""):setShownanswer(index)}>
                        <b>{item.question}</b> &nbsp; &nbsp;<i className={`fa ${answershown===index ? "fa-minus":"fa-plus"}`} ></i>
                    </p> 
                     {
                            answershown===index &&
                            <p className="mb-0  pt-3" dangerouslySetInnerHTML={{ __html: item.answer }} />
                        } 
                    </div>
                )
            })}
           
            
          </div>
        </div>
      </div>
    </div> 
    
</>
  )
}
