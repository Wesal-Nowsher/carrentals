 import React,{useEffect, useState} from "react";
import Modalcat from "./addcategory"
import Modalcatedit from "./editcategory";
import { ToastContainer, toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {api} from "../../utils";
import axios from "axios";

export default function  Categories() {
    const [opencat, setOpencat] = useState(false);
    const [editopencat, editsetOpencat] = useState(false);
    const [allcategories, setAllcat]=useState([]);
    const [Editcategory,setCategedit]=useState({})
    const [editId, setEditid]=useState("")
    useEffect(()=>{
      getallcategories();
      setEditid("")
    },[]);
    const getallcategories=()=>{
      axios.get(`${api}CarCategory/GetAll`).then((res)=>{
       
        res.data && setAllcat([...res.data])
      })  
    }
    const deletecat=(id)=>{
      if(window.confirm("Are you sure to delete?")===true){
        axios.delete(`${api}CarCategory/Delete/${id}`).then((res)=>{
         
          getallcategories();   
        })  
      }
    }
    return <> 
     <div className="d-flex justify-content-between align-items-center mb-5">
     <h3 className='mt-5 pl-5' >Categories</h3>
     <button className='mt-5  btn btn-primary' onClick={()=> setOpencat(true)}  >Add Category</button>
     </div>
     <div className=" d-flex categories-admin    mb-5  pb-4  ">
      
          {
            allcategories && allcategories.map((item,indxi)=>{
              return(
                <div key={indxi} className="col-4 col-md-3 col-lg-3 category-car category-car-admin d-flex flex-column position-relative">
                 <Carousel  showThumbs={false} autoPlay={false} infiniteLoop={true} interval={2000}>
                        {              
                                  item.urls && item.urls.map((ite,indx)=>{
                                  return(
                                      <div key={indx}  >
                                      <img className="d-block w-100" src={ite} 
                                      
                                       alt="First slide" /> 
                                </div>
                              )
                              })
                        }
                    </Carousel>
                  <h6 className="text-center">{item.name}</h6>
                  <p className="delete-edit-btn">
                            <span className="service-1-icon"  onClick={()=> {setEditid(item.id);setCategedit(item); editsetOpencat(true);}} ><span className="icon-edit"></span></span>
                            <span className="service-1-icon ml-2" onClick={()=> deletecat(item.id)} ><span className="icon-trash"></span></span>
                  </p>
               </div>
              )
            })
          }
             
            
     </div>  
     <ToastContainer />
     <Modalcat opencat={opencat} setOpencat={setOpencat} getallcategories={getallcategories}  />
     <Modalcatedit editopencat={editopencat} editsetOpencat={editsetOpencat} getallcategories={getallcategories}   editId={editId} />
     
    </>;
};


