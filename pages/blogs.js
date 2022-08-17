            
import React,{useEffect,useState} from "react" 
 
import data2 from "./English.json";
import { useRouter } from 'next/router'
import Link from 'next/link';
import data1 from "./arabic.json";
import axios from "axios";
import {api} from "../components/utils";
import ReactHtmlParser  from 'react-html-parser';
import Carslisting from "../components/carlisting"
export default function Cars() {
    const [fillerdata, setFillerdata]=useState({});
    const [lang, setlang]=useState("en")
    const router = useRouter()
    const [blogs, setBlogs]=useState([]);
    useEffect(()=>{ 
      getallblogs();
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
     
<> 
    <div className="site-section bg-light top-padding-standard section-small-margin"  id="cars-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <h2 className="section-heading"><strong> {fillerdata?.Blogs}</strong></h2>
              {/* <p className="mb-5">{fillerdata && fillerdata.whychoose && fillerdata.whychoose.desc} </p>     */}
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
                      {
                        lang==="en" &&<h3 className="text-center"> {item.header.substring(0,70)}</h3>
                      }
                       {
                        lang==="ar" &&<h3 className="text-center">{item.headerArabic.substring(0,70)}</h3>
                      }
                         {
                        lang==="en" && <p>{ReactHtmlParser(item.content.substring(0,70))}</p>
                      }
                      {
                        lang==="ar" && <p>{ReactHtmlParser(item.contentArabic.substring(0,70))}</p>
                      }
                        
                        <p className="mb-0 view-more"><Link href={`/blogs/${item.id}`}>{fillerdata?.ViewMore}</Link></p>
                      </div>
                    </div>
                  </div>
                  )
              })
            }
            
          </div>
        </div>
    </div>  
</>
  )
}
