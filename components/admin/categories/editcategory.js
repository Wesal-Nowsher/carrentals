
import React,{useEffect,useState} from "react" 
import {customStyles2} from "../../utils";;

import Modal from 'react-modal';

import Link from 'next/link'

import { Carousel } from 'react-responsive-carousel';

import data2 from "../../../pages/English.json";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

import {api,serialize} from "../../utils"
import data1 from "../../../pages/arabic.json";
export default function Modalcat(props){
      const [category, setCat]=useState();
      const [images, setImages]= useState([]);
      const [cate, setNameOfCat]=useState({
        name: "",
        nameArabic: "",
        nameGerman: "",
        nameRussian: "",
        nameIndian: "",
        urls: [
          
        ]
      });
      
      useEffect(()=>{
        // getcatbyId();
     
        getcatbyId(props.editId && props.editId)
      
      },[props.editId]);
     const getcatbyId=(editId)=>{
        axios.get(`${api}CarCategory/GetById/${editId}`).then((res)=>{
           
          res.data && setNameOfCat({...res.data});
          res.data && res.data && setNameOfCat({...res.data})
          res.data && res.data.urls && setImages([...res.data.urls])
        })  
      } 

    const Uploadfile=(file)=>{ 
      let files=[...file.files]; 
      let formData = new FormData();
      for (const image of files) {
        formData.append("files", image);
      }    
      axios.post(`${api}Resource/uploadImage`,formData).then((res)=>{    
            let lastimages=[...images]; 
            let newimages= res.data && [...res.data]; 
            lastimages=[...lastimages, ...newimages];
            setImages([...lastimages]); 
      }).catch((err)=>{
        
      }) 
    }
    const Editcategory=(e)=>{
      e.preventDefault()
      if(cate.name==="" ){
        toast("Name of the Category in English is required!")
        return
      }
      if(images.length===0){
        toast("Please Add one image at minimum!")
        return
      }
      
          let bodyofdata={...cate};
          bodyofdata.urls=[...images]
          let stringifieddata= serialize({...bodyofdata});
           
          axios.put(`${api}CarCategory/Update`,bodyofdata).then((res)=>{
            props.getallcategories();
            props.editsetOpencat(false);
            toast("Category Updated!")
          
      }).catch((err)=>{
     
      })

       
    }
    const Changing=(e)=>{
      
      setNameOfCat({...cate, [e.target.name]:e.target.value})
    }
    const removeimage=(index)=>{
      let newimages=[];
      images&& images.map((item,inde)=>{
        if(inde!==index){
          newimages.push(item);
        }
      })
      setImages([...newimages])
     }
     const empty=()=>{
      setNameOfCat({
        name: "",
        nameArabic: "",
        nameGerman: "",
        nameRussian: "",
        nameIndian: "",
        urls: []
      })
     }
    return(
        <Modal
        isOpen={props.editopencat}
       
        onRequestClose={()=> {empty();props.editsetOpencat(false)}}
        style={customStyles2}
        contentLabel="Example Modal"
      >
               <div className="row"> 
               <div className="col-lg-12 col-md-12 mb-4 modal-booking" > 
            <form action="#"   className="   ">
              
            <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for English language"
                      defaultValue={cate.name} 
                       onChange={(e)=> Changing(e)}  name="name" />
                    </div> 
                  </div>
                  
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for Arabic language" 
                       onChange={(e)=> Changing(e)} 
                       defaultValue={cate.nameArabic} 
                       name="nameArabic" />
                    </div> 
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for German language" 
                      onChange={(e)=> Changing(e)} 
                      defaultValue={cate.nameGerman} 
                      name="nameGerman" />
                    </div> 
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for Russian language" 
                       onChange={(e)=> Changing(e)} 
                       defaultValue={cate.nameRussian} 
                       name="nameRussian" />
                    </div> 
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for Indian language " 
                      onChange={(e)=> Changing(e)} 
                      defaultValue={cate.nameIndian} 
                      name="nameIndian" />
                    </div> 
                  </div>
              
              <div className="form-group row">
                <div className="col-md-12">
                  <input type="file" className=""  onChange={(e)=> Uploadfile(e.target) }  multiple/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                {/* <select name="" id="" className="form-control">
                        <option >Add cars from the list</option>
                    </select> */}
                </div>
              </div>

              
              <div className="form-group row">
                <div className="col-md-3 mr-auto">
                  <button onClick={(e)=> Editcategory(e)} className="btn btn-block btn-primary text-white py-3  " >
                      Edit
                  </button>
                </div>
              </div>
            </form>
            <div className="images-category-form ">
              {
                images && images.map((item,index)=>{
                  return (
                    <div key={index} className="position-relative">
                    <img  src={item} alt="" />
                    <span className="service-1-icon ml-2" onClick={()=> removeimage(index)} ><span className="icon-trash"></span></span>
                    </div>
                  )
                })
              }
            </div>
          </div>
            </div>
            
      </Modal>
    )
}