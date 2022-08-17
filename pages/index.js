
import React,{useState,useEffect} from "react"
import Head from 'next/head' 
import styles from '../styles/Home.module.css';
import data2 from "./English.json"; 
import data1 from "./arabic.json"; 
import Carslisting from "../components/carlisting"
import Categoricalcar from "../components/categoricalcars";

import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from "axios";
import {api} from "../components/utils";

import ReactHtmlParser  from 'react-html-parser';


export default function Home() { 
  const [fillerdata, setFillerdata]=useState({});
  const [lang, setlang]=useState("en")
  const [blogs, setBlogs]=useState([]);
  const router = useRouter() 
  useEffect(()=>{ 
    getallblogs()
    if(!localStorage.getItem("languageselected")){
      setFillerdata(data2); 
      setlang("en")
    }
    else{
        if(localStorage.getItem("languageselected")==="english"){
          setFillerdata(data2);
          setlang("en") 
        }
        else if(localStorage.getItem("languageselected")==="arabic"){
          setFillerdata(data1); 
          setlang("ar")
        }
    }
  },[]) 
  const getallblogs=()=>{
    axios.get(`${api}Blogs/GetAll`).then((res)=>{
     
      res.data && setBlogs([...res.data])
    })  
  }
  return (
    <div className={styles.container}> 
      
     
      <div className="container">
      <Categoricalcar fillerdata={fillerdata} />
      </div>
      <div className="site-section bg-light pt-5">
    
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="section-heading"><strong>{ fillerdata?.offer?.name}</strong></h2>
             
        </div>
        {/* <div className="col-lg-5 offer-types">
        {fillerdata && fillerdata.offer && fillerdata.offer.types.map((item,index)=>{
          return ( <button key={index} className={index===0 ? "btn-primary btn-sm":""}>{item}</button> )
        })}     
        </div>  */}
      </div> 
      <Carslisting fillerdata={fillerdata} lang={lang}/>
        <Link href="/cars">
        <button   className=" col-6 col-md-4 col-lg-3 col-sm-6 btn btn-block btn-primary text-white py-3 px-5"   >
                {fillerdata?.ViewMore}
                </button>
        </Link>
    </div>
    </div> 
    
      <div className="site-section pt-5">
      <div className="container " id="rentalplans">
        <div className="row inside-plans">
          <div className="col-lg-12">
            <h2 className="text-center mb-5  Our-Car-Rental-Plans">
               
              { 
                fillerdata?.carrentalplans?.headtext
              }
            </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 d-flex">
              <div className="rental-plans">
              <h4 className="text-center">
               
              { fillerdata?.carrentalplans?.dailyweekly?.header}
              </h4>
              <p>
              { fillerdata?.carrentalplans?.dailyweekly?.texter}
              </p>
              </div>
          </div>
          <div className="col-lg-4  d-flex">
              <div className="rental-plans">
              <h4 className="text-center">
              { fillerdata?.carrentalplans?.monthly?.header}
              </h4>
              <p>
              { fillerdata?.carrentalplans?.monthly?.texter}
               </p>
              </div>
          </div>
          <div className="col-lg-4  d-flex">
             <div className="rental-plans">
             <h4 className="text-center">
             { fillerdata?.carrentalplans?.yearly?.header}
              </h4>
              <p>
              { fillerdata?.carrentalplans?.yearly?.texter}
              </p>
             </div>
          </div>
        </div>
      </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="section-heading"><strong> {fillerdata && fillerdata.whychoose && fillerdata.whychoose.name}</strong></h2>
              <h6 className=" ">{fillerdata && fillerdata.whychoose && fillerdata.whychoose.desc} </h6>    
            </div>
          </div> 
          <div className="row">
            {
              fillerdata && fillerdata.whychoose && fillerdata.whychoose.reason.map((item,index)=>{
                 if(item.desc!=="last"){
                   return(
                    <div key={index} className="col-lg-12 position-relative  ">
                      
                    <div className=" dark   w-100">
                      {/* <span className="service-1-icon">
                        <span className={item.icon}></span>
                      </span> */}
                      <div className=" w-100 flex ">
                        {/* <h3>{item.name}</h3> */}
                        {/* <span className=" ">{index+1}</span> */}
                        <p className="   mb-0 mt-1 w-100">
                        {localStorage.getItem("languageselected")!=="arabic" && <>●</>}
                        {item.desc}
                        {localStorage.getItem("languageselected")==="arabic" && <>●</>}
                        </p>
                        
                      </div>
                    </div>
                  </div>
                  )
                 }else if(item.desc==="last"){
                  return(
                    <div key={index} className="col-lg-12 position-relative d-flex criple-image ">
                      {
                        lang && lang==="ar" &&
                        <img src="images/carrentarabic.jpg" alt="Image" className="   img-categoyry mb-2 mt-2  " />
                      }
                      {
                        lang && lang==="en" &&
                        <img src="images/whychooseus.jpg" alt="Image" className="   img-categoyry mb-2 mt-2  " />
                      }

                    </div>
                   )
                 }
              })
            }
            
          </div>
        </div>
      </div> 
      
     
      <div className="site-section pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="section-heading"><strong> {fillerdata?.Blogs}</strong></h2>
              <p className="mb-5">{fillerdata?.whychoose?.desc} </p>    
            </div>
          </div> 
          <div className="row">
            {
               blogs && blogs.map((item,index)=>{
                  return(
                    <div key={index} className="col-lg-4 mb-5">
                    <div className="service-1 dark" onClick={()=>  router.push(`/blogs/${item.id}`)}>
                      {/* <span className="service-1-icon">
                        <span className={item.icon}></span>
                      </span> */}
                      <div className="blogsimage">
                      {
                        item.urls && item.urls[0] &&
                        <img src={item.urls && item.urls[0] && item.urls[0]} alt="Image" className="   img-categoyry mb-2 w-100" />
                       }
                        
                      </div>
                      <div className="service-1-contents">
                      <h3>{item.header}</h3>
                        <p>{ReactHtmlParser(item.content.substring(0,70))}</p>
                        <p className="mb-0 view-more">
                          <Link href={`/blogs/${item.id}`}>
                            
                           {fillerdata?.ViewMore}
                          </Link></p>
                      </div>
                    </div>
                  </div>
                  )
              })
            }
            
          </div>
        </div>
      </div> 
      {/* <div className="site-section bg-primary py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 mb-4 mb-md-0">
            <h2 className="mb-0 text-white">{fillerdata && fillerdata.whatwaitingfor && fillerdata.whatwaitingfor.title}</h2>
            <p className="mb-0 opa-7">{fillerdata && fillerdata.whatwaitingfor && fillerdata.whatwaitingfor.desc}</p>
          </div>
          <div className="col-lg-5 text-md-right">
            <a href="#" className="btn btn-primary btn-white">{fillerdata && fillerdata.whatwaitingfor && fillerdata.whatwaitingfor.button}</a>
          </div>
        </div>
      </div>
      </div> */}
    </div> 
  )
}
