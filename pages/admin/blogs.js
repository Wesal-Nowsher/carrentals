import React,{useEffect, useState} from "react";
import  Carscom from "../../components/admin/cars/carscomp";
import axios from "axios";
import {api} from "../../components/utils";

import { ToastContainer, toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import data2 from "../English.json";
import { useRouter } from 'next/router'
import Link from 'next/link';
import data1 from "../arabic.json";
import ReactHtmlParser  from 'react-html-parser';
 

import BlogsModal from "../../components/admin/blogs/blogsmodal"
import BlogEdit from "./../../components/admin/blogs/editblogsmodal"
export default function Blogs(){
    const [modalIsOpennew,setIsOpennew]=useState(false);
    const [editIsOpen,seteditIsOpen]=useState(false);
    
    const [fillerdata, setFillerdata]=useState({});
    const [blogs, setBlogs]=useState([]);
    const [editId, setEditid]=useState("")
    const router = useRouter()
    useEffect(()=>{ 
        getallblogs();
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
      const getallblogs=()=>{
        axios.get(`${api}Blogs/GetAll`).then((res)=>{
          
          res.data && setBlogs([...res.data])
        })  
      }
      const deleteblog=(id)=>{
        if(window.confirm("Are you sure to delete?")===true){
            axios.delete(`${api}Blogs/Delete/${id}`).then((res)=>{
              
              getallblogs()
              
            })  
          }
      }
    // {
        // /Bookings/Delete/1
    // }
    
    return (
        <>
        <div className="d-flex justify-content-between align-items-center">
        <h3 className='pt-5 pl-5' >Blogs</h3>
        <button className='mt-5  btn btn-primary' onClick={()=> { setIsOpennew(true)}}>Add Blog</button>
        </div>
         <div className="site-section bg-light top-padding-standard section-small-margin"  id="cars-section">
         <div className="container">   
           <div className="row">
           {
               blogs && blogs.map((item,index)=>{
                   return(
                     <div key={index} className="col-lg-4 mb-5">
                     <div className="service-1 dark"  >
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
                        <p className="mb-0 view-more"><Link href={`/blogs/${item.id}`}> View More</Link></p>
                       </div>
                       <p className="delete-edit-btn">
                            <span className="service-1-icon"  onClick={()=> {setEditid(item.id); seteditIsOpen(true); }} ><span className="icon-edit"></span></span>
                            <span className="service-1-icon ml-2" onClick={()=> deleteblog(item.id)} ><span className="icon-trash"></span></span>
                        </p>
                     </div>
                     
                   </div>
                   )
               })
           }   
           </div>
         </div>
     </div>  
     <ToastContainer />
     {modalIsOpennew &&<BlogsModal modalIsOpennew={modalIsOpennew} setIsOpennew={setIsOpennew} />}
     {editIsOpen && <BlogEdit  editId={editId}   editIsOpen={editIsOpen} seteditIsOpen={seteditIsOpen}
      getallblogs={getallblogs}  />}
     </>
    )
}