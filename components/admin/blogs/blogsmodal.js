
import React,{useEffect,useState,useRef } from "react" 
import {customStyles1} from "../../utils";;

import Modal from 'react-modal';


import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import {api} from "../../utils"
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import RichTextEditor from '../../richtexteditor/index';


const config={
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
        '|',
        '|',
        'undo',
        'redo',
        'insertCodeBlock'
      ]
    },
    table: {
      contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells','insertCodeBlock' ]
    },
    language: 'en'
  };

export default function Modalblogs(props){
         let editorRef = useRef();
         const { CKEditor, ClassicEditor } = editorRef.current || {};
         let [loaded, setLoaded] = useState(false);
        const [images, setImages]= useState([]);  
        const [value, onChange] = useState("<p>Your initial <b>html value</b> or an empty string to init editor without value</p>");
        const [blog, setBlog]=useState({ 
            header: "",
            headerArabic: "",
            headerGerman: "",
            headerRussian: "",
            headerIndian: "",
            content: "",
            contentArabic: "",
            contentGerman: "",
            contentRussian: "",
            contentIndian: "",
            urls: []
          })  
        useEffect(()=>{
            editorRef.current = {
                CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
                ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
              };
          
              setLoaded(true);
        },[]);
        
        const Changing=(e)=>{
          
          setBlog({...blog, [e.target.name]:e.target.value})
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
        const Addblogs=(e)=>{
          e.preventDefault();
          if(blog.header===""   ){
            toast("Name of the header in English is required!")
            return
          } 
          if(images.length===0 ){
              toast("Please Add one image at minimum!")
              return
            }
            if(blog.content===""){
              toast("Please add some content for english at minimum!")
              return
            }
          blog.urls=[...images];
         

          axios.post(`${api}Blogs/create`,blog).then((res)=>{ 
            emptyvalues();

            props.setIsOpennew(false)
             
      }).catch((err)=>{
       
      }) 
        }
        const emptyvalues=()=>
        setBlog({
         
            header: "",
            headerArabic: "",
            headerGerman: "",
            headerRussian: "",
            headerIndian: "",
            content: "",
            contentArabic: "",
            contentGerman: "",
            contentRussian: "",
            contentIndian: "",
            urls: []
       })

    return(
        <Modal
        isOpen={props.modalIsOpennew}
       
        onRequestClose={()=> {emptyvalues();props.setIsOpennew(false);}}
        style={customStyles1}
        contentLabel="Example Modal"  >    
            <div className="row">  
             <div className="col-lg-12 col-md-12 mb-4 modal-booking" > 
             <h1 className="ml-5">Add Blogs</h1>  
            <form action="#"   className="trip-form  "> 
              <div className="form-group row">
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" name="header"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter Blogs header in English" />
                </div> 
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" name="headerArabic"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter Blogs header in Arabic" />
                </div> 
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" name="headerGerman"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter Blogs header in German" />
                </div> 
                <div className="col-md-3 mb-4 mb-lg-0">
                  <input type="text" className="form-control" name="headerRussian"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter Blogs header in Russian" />
                </div> 
                <div className="col-md-3 mt-4 mb-lg-0">
                  <input type="text" className="form-control" name="headerIndian"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter Blogs header in Indian" />
                </div> 
              </div>
              <div className="row  mb-4 "> 
              
                <div className="mb-3 mb-md-0 col-md-4">
                  <div className="form-control-wrap">
                   <input type="file" className=""  onChange={(e)=> Uploadfile(e.target) }  multiple/>
                    
                  </div>
                </div>
                
              </div>
           
               <div className="row">
               
               
               <div className="col-md-6   mt-4    mb-4 mb-lg-0">
                   
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        
                        data="Enter you description for English language"
                        config={ 
                            config
                         }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        
                          
                        }}
                        
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor.getData();
                          
                          setBlog({...blog, content:data})
                        }}
                        onBlur={(event, editor) => {
                       
                        }}
                        onFocus={(event, editor) => {
                         
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
              
                <div className="col-md-6 mb-4 mt-4  mb-lg-0">
                 
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data="Enter you description for Arabic language"
                        config={ 
                            config
                         }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                           
                        }}
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor.getData();
                        
                          setBlog({...blog, contentArabic:data})
                        }}
                        onBlur={(event, editor) => {
                         
                        }}
                        onFocus={(event, editor) => {
                        
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
               
                <div className="col-md-6 mb-4 mb-4 mt-4  mb-lg-0">
                  
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data="Enter you description for German language"
                        config={ 
                            config
                         }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                          
                        }}
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor.getData();
                          
                          setBlog({...blog, contentGerman:data})
                        }}
                        onBlur={(event, editor) => {
                        
                        }}
                        onFocus={(event, editor) => {
                         
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
              
                <div className="col-md-6 mb-4  mt-4  mb-lg-0">
                  
                      
                      {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data="Enter you description for Russian language"
                        config={ 
                            config
                         }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        
                        }}
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor.getData();
                          
                          setBlog({...blog, contentRussian:data})
                        }}
                        onBlur={(event, editor) => {
                         
                        }}
                        onFocus={(event, editor) => {
                         
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                </div>  
               
                <div className="col-md-6 mt-4 mb-lg-0">
                   
                    {
                 loaded ? 
                      <CKEditor
                        editor={ClassicEditor}
                        data="Enter you description for Indian language"
                        config={ 
                            config
                         }
                        onReady={(editor) => {
                          // You can store the "editor" and use when it is needed.
                        
                        }}
                        onChange={(event, editor) => {
                          // do something when editor's content changed
                          const data = editor.getData();
                          
                          setBlog({...blog, contentIndian:data})
                        }}
                        onBlur={(event, editor) => {
                      
                        }}
                        onFocus={(event, editor) => {
                        
                        }}
                      />
                    
                     :<h2> Editor is loading </h2>
                  
               }
                    
                </div>    
               
               
               </div>
               <div className="col-md-3 mt-5 mr-auto">
                  <button type=""
                  onClick={(e)=> Addblogs(e)}
                  className="btn btn-block btn-primary text-white py-3  "   >
                     Add
                  </button>
                </div>
            </form>
          </div>
          <div className="col-lg-4 col-md-4 mb-4 ">
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