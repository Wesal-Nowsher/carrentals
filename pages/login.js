
import React,{useEffect,useState} from "react" 

import Link from 'next/link'

import data2 from "./English.json";

import data1 from "./arabic.json"; 

export default function Login() { 
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
    <div className="site-section bg-light" id="register-section"> 
      <div className="container pt-5">
        <div className="row  pt-5 justify-content-start  ">
        <div className="col-7  pt-5 mb-5">
          <h2 className="section-heading "><strong>{fillerdata && fillerdata.login && fillerdata.login.title}</strong></h2> 
        </div>
      </div>
        <div className="row">
          <div className="col-lg-12 mb-5" >
            <form action="#" method="post">      
              <div className="form-group row">
                <div className="col-md-6">
                  <input type="text" className="form-control" placeholder={fillerdata && fillerdata.login && fillerdata.login.Formplace[0]} />
                </div>
              </div> 
              <div className="form-group row">
                <div className="col-md-6">
                  <input type="password" className="form-control" placeholder={fillerdata && fillerdata.login && fillerdata.login.Formplace[1]} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
                  <p>{fillerdata && fillerdata.login && fillerdata.login.Formplace[2]} <Link href="/register" className=" ">here</Link> </p>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3  ">
                  <button   className="btn btn-block btn-primary text-white py-3 px-5"   >
                  {fillerdata && fillerdata.login && fillerdata.login.Formplace[3]}

                  </button>
                </div>
              </div>
            </form>
          </div> 
        </div>
      </div>
    </div>
  </>
  )
}

   