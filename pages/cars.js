import React,{useEffect,useState} from "react"  
import data2 from "./English.json";
import data1 from "./arabic.json";
import Carslisting from "../components/carlisting";
import axios from "axios";
import {api} from "../components/utils"
import { useRouter } from 'next/router';
export default function Cars() {
    const [ fillerdata, setFillerdata ]=useState({}); 
    const [lang, setlang]=useState("en")
    const router = useRouter();
    const [searchvalues, setSearch]=useState({
      keywork:"",
      type:"",
      search:false
    });
    const [allcategories, setAllcat]=useState([]);
    useEffect(()=>{
        getallcategories()
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
        
        // let {search,type}=router.query

      },[router]) 
      const getallcategories=()=>{
        axios.get(`${api}CarCategory/GetAll`).then((res)=>{
           
          res.data && setAllcat([...res.data])
        })  
      }
      

  return (
  <> 
    <div className="site-section pt-5 bg-light top-padding-standard section-small-margin"  id="cars-section">
      <div className="container  ">
        <div className="row  ">
          <div className="col-lg-12">
            <h2 className="section-heading"><strong> {fillerdata && fillerdata.Carlistings && fillerdata.Carlistings.Name }</strong></h2>
            <p className="mb-5">{ fillerdata && fillerdata.Carlistings && fillerdata.Carlistings.desc }</p>    
          </div>
        </div>
       

       <Carslisting fillerdata={fillerdata} lang={lang} searchvalues={searchvalues} setSearch={setSearch} />
        {/* <div className="row">
          <div className="col-5">
            <div className="custom-pagination">
              <a href="#">1</a>
              <span>2</span>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
            </div>
          </div>
        </div> */}
      </div>
    </div>

    

   
</>
  )
}
