            
import React,{useEffect,useState} from "react" 
 
import data2 from "../English.json";

import data1 from "../arabic.json";

import {useRouter} from 'next/router';
import Link from 'next/link';
import Carslisting from "../../components/carlisting"
import axios from "axios";
import {api} from "../../components/utils";
import ReactHtmlParser  from 'react-html-parser';

export default function Cars() {
    const [fillerdata, setFillerdata]=useState({});
    const [lang, setlang]=useState("en")
    const [blogs, setBlogs]=useState([]);
    const router = useRouter();
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
          console.log("res cars", res)
          res.data && setBlogs([...res.data])
        })  
      }
  
  return (
     
<> 
    <div className="site-section bg-light top-padding-standard section-small-margin pt-5 mt-5"  id="cars-section">
        <div className="container">
          {/* <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong> Blog</strong></h2>
            </div>
          </div>  */}
          <div className="row">
              
            {
              
             blogs && blogs.map((item,index)=>{
                 if(item.id===parseInt(router && router.query && router.query.index && router.query.index)){
                  return(
                    <div key={index} className="col-lg-12 mb-5">
                    <div className="  dark" >
                      {/* <span className="service-1-icon">
                        <span className={item.icon}></span>
                      </span> */}
                      {
                        lang==="en" &&<h3 className="text-center">{item.header}</h3>
                      }
                      {
                        lang==="ar" &&<h3 className="text-center">{item.headerArabic}</h3>
                      }
 
                      <div className=" w-100 d-flex justify-content-center  " style={{margin:"2rem 0rem "}}>
                      {
                        item.urls && item.urls[0] &&
                        <img src={item.urls && item.urls[0] && item.urls[0]} alt="Image" className="   img-categoyry mb-2 w-50" />
                       }
                       
                      </div>
                      <div className="service-1-contents">
                      {
                        lang==="en" && <p>{ReactHtmlParser(item.content)}</p>
                      }
                      {
                        lang==="ar" && <p>{ReactHtmlParser(item.contentArabic)}</p>
                      }
                        
                       
                         
                      </div>
                    </div>
                  </div>
                  )
                 }
              })
            }
            
          </div>
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong> More Blogs</strong></h2>
            </div>
          </div> 
          <div className="row">
          {
               blogs && blogs.map((item,index)=>{
                if(item.id!==parseInt(router && router.query && router.query.index && router.query.index)){
                  return(
                    <div key={index} className="col-lg-4 mb-5">
                    <div className="service-1 dark" onClick={()=>  router.push(`/blogs/${item.id}`)}>
                      {/* <span className="service-1-icon">
                        <span className={item.icon}></span>
                      </span> */}
                      <div className="blogsimage">
                      {
                        item.urls && item.urls[0] &&
                        <img src={item.urls && item.urls[0] && item.urls[0]} alt="Image" className="   img-categoyry mb-2   " />
                       }
                      </div>
                      <div className="service-1-contents">
                        <h3>{item.title}</h3>
                        <p>{ReactHtmlParser(item.content.substring(0,70))}</p>
                        <p className="mb-0 view-more"><Link href={`/blogs/${item.id}`}> View More</Link></p>
                      </div>
                    </div>
                  </div>
                  )
                } 
             
              })
            }
            
          </div>
        </div>
    </div>  
</>
  )
}
