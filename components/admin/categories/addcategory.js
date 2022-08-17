
import React,{useEffect,useState} from "react" 
import {customStyles2} from "../../utils";;

import Modal from 'react-modal';
import {api} from "../../utils"

import data2 from "../../../pages/English.json";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import data1 from "../../../pages/arabic.json";
export default function Modalcat(props){
    const [cate, setNameOfCat]=useState({
      name: "",
      nameArabic: "",
      nameGerman: "",
      nameRussian: "",
      nameIndian: "",
      urls: [
        
      ]
    });
    const [images, setImages]= useState([]);
    useEffect(()=>{
      setImages([])
    },[])
    const Changing=(e)=>{
      
      setNameOfCat({...cate, [e.target.name]:e.target.value})
    }
    const Uploadfile=(file)=>{
       
      let files=[...file.files];
      
      let formData = new FormData();
      for (const image of files) {
        formData.append("files", image);
      }
     
      // let datasend={"files":files}; 
      axios.post(`${api}Resource/uploadImage`,formData).then((res)=>{ 
            let lastimages=[...images]; 
            let newimages= res.data && [...res.data]; 
            lastimages=[...lastimages, ...newimages]; 
            setImages([...lastimages]);
            

      }).catch((err)=>{
        
      }) 
    }
    const addcategory=(e)=>{
      e.preventDefault()
      if(cate.name===""){
        toast("Name of the Category in English is required!")
        return
      }
      if(images.length===0){
        toast("Please Add one image at minimum!")
        return
      }

          let bodyofdata={...cate};
          bodyofdata.urls=[...images]
          axios.post(`${api}CarCategory/Create`,bodyofdata).then((res)=>{
            props.getallcategories();
            props.setOpencat(false);
            toast("Category Added!")
      }).catch((err)=>{
      
      })

      
      
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
    return(
        <Modal
        isOpen={props.opencat}
       
        onRequestClose={()=> props.setOpencat(false)}
        style={customStyles2}
        contentLabel="Example Modal"
      >
            <div className="row"> 
               <div className="col-lg-12 col-md-12 mb-4 modal-booking" > 
                <form action="#"   className="   ">
                  
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for English language" 
                       onChange={(e)=> Changing(e)}  name="name" />
                    </div> 
                  </div>
                  
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for Arabic language" 
                       onChange={(e)=> Changing(e)} name="nameArabic" />
                    </div> 
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for German language" 
                      onChange={(e)=> Changing(e)} name="nameGerman" />
                    </div> 
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for Russian language" 
                       onChange={(e)=> Changing(e)} name="nameRussian" />
                    </div> 
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12 mb-4 mb-lg-0">
                      <input type="text" className="form-control" placeholder="Enter the name of category for Indian language " 
                      onChange={(e)=> Changing(e)} name="nameIndian" />
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
                      <button onClick={(e)=> addcategory(e)} className="btn btn-block btn-primary text-white py-3  " >
                          Add
                      </button>
                    </div>
                  </div>
                </form>
                <div className="images-category-form position-relative">
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