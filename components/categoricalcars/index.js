import React,{useEffect, useState} from "react"; 
import { ToastContainer, toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {api} from "../utils"

import axios from "axios";

import { useRouter } from 'next/router';
export default function  Categories(props) {
    const [opencat, setOpencat] = useState(false);
    const [editopencat, editsetOpencat] = useState(false);
    const [allcategories, setAllcat]=useState([]);
    const [Editcategory,setCategedit]=useState({})
    const router = useRouter() 
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
     
     
     <div className="d-flex justify-content-between align-items-center ">
     <h3 className='  category-gh3  '  >{props.fillerdata?.category}</h3>
      
     </div>
     <div className=" d-flex categorical-cars  mb-5 pb-2      ">
      
          {
            allcategories && allcategories.map((item,ind)=>{
              return(
                <div key={ind} className="col-4 col-md-3 col-lg-3 category-car category-car-admin d-flex flex-column position-relative cursor-pointer"
                onClick={()=>  router.push(`/cars?type=${item.id}`)}
                >
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
                            {/* <span className="service-1-icon"  onClick={()=> {setEditid(item.id);setCategedit(item); editsetOpencat(true);}} ><span className="icon-edit"></span></span>
                            <span className="service-1-icon ml-2" onClick={()=> deletecat(item.id)} ><span className="icon-trash"></span></span> */}
                  </p>
               </div>
              )
            })
          }
             
            
     </div>  
    
     <ToastContainer />
    </>;
};


