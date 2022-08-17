            



            
import React,{useEffect,useState} from "react" 

 

import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Modalbooking from "./modalbooking"
import axios from "axios";
import {api} from "../utils"
import { ToastContainer, toast } from 'react-toastify';

import { useRouter } from 'next/router'
export default function Carlistings(props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const [itembooking, setItembooking] = useState(false);
    const [indexbooking, setIndexbooking] = useState(false);
    const [carvalues, setCar]=useState([]);
    const [bookId, setBookId]=useState("");
    const [allcategories, setAllcat]=useState([]);
    const router = useRouter();
    const [searchvalues, setSearch]=useState({
      keyword:"",
      type:"",
      
    });

     
    useEffect(()=>{
      getallcategories(); 
      
       if(router.query && router.query.type){
        let {type}=router.query;
       
        setSearch({...searchvalues,type:type})
        getfilterallcars("",type);
       }
       else{
        getallcars();
       }
        
    },[router.query])
    
    const getallcars=()=>{
      axios.get(`${api}Cars/GetAll`).then((res)=>{
    
        res.data && setCar([...res.data])
      })   
    }
    const getfilterallcars=(keyword, id)=>{
    
      if(keyword!==undefined && id!==undefined){
        if(keyword!=="" && id!==""){
          axios.get(`${api}Cars/GetAll?CategoryId=${id}&SearchQuery=${keyword}`).then((res)=>{
         
            res.data && setCar([...res.data]);
            
          }) 
        }
        else if(keyword==="" && id!==""){
          axios.get(`${api}Cars/GetAll?CategoryId=${id}`).then((res)=>{
         
            res.data && setCar([...res.data]);
            
          }) 
        }
        else if(id==="" && keyword!==""){
          axios.get(`${api}Cars/GetAll?SearchQuery=${keyword}`).then((res)=>{
         
            res.data && setCar([...res.data]);
            
          }) 
        }
      } 
      
    }
    const getallcategories=()=>{
      axios.get(`${api}CarCategory/GetAll`).then((res)=>{
      
        res.data && setAllcat([...res.data])
      })  
    }
     
   
    
    const filter=(e)=>{
      e.preventDefault();;
      getfilterallcars(searchvalues.keyword, searchvalues.type);
    }

  return (  
    <>
     <div className="row mb-5">
          { router && router.pathname!=="/" &&
            <div className="col-lg-12">
            <form className="trip-form">
               <div className="row align-items-center">
              <div className="mb-3 mb-md-0 col-md-4">
                <div className="form-control-wrap"> 
                    <input type="text" id="cf-4" 
                     onChange={(e)=> setSearch({...searchvalues,keyword:e.target.value})}
                     defaultValue={searchvalues.keyword}
                    placeholder={ props?.fillerdata?.formplace?.Searchwithkeword} className="form-control  px-3" />   
                </div>
              </div>
              <div className="mb-3 mb-md-0 col-md-4">
              <select   id=""  className="form-control" name="carCategoryId"
                value={searchvalues.type}
              onChange={(e)=> setSearch({...searchvalues,type:e.target.value})}>
                    <option value="">{props?.fillerdata?.formplace?.Cartype}</option>
                      {
                        allcategories && allcategories.map((item,inasd)=>{
                         return( <option key={inasd} value={item.id}>
                          {props?.lang==="en" && item?.name}
                    {props?.lang==="ar" && item?.nameArabic}
                          </option>)
                        })
                      }
  
                    </select>
              </div>
              
              <div className="mb-3 mb-md-0 col-md-3">
                
                <button onClick={(e)=> filter(e)}  className="btn btn-primary btn-block py-3" >
                {props.fillerdata && props.fillerdata.herosearch && props.fillerdata.herosearch.searchbtn}
                </button>
              </div>
            </div> 
          </form> 
            </div>
          }
        </div>
    <div className="row">
             {
                 carvalues && carvalues.map((item,index)=>{
                  return (
                    <div key={index} className={`  col-md-6 col-lg-4 mb-4  ${ item.offer===1 ? "add-radius":"" }`}> 
                  <div className="listing d-block position-relative  align-items-stretch">
                <div className="listing-img    position-relative">
                 {
                  item.discountStatusId===1 && 
                   <p className="discount "   >{item.discountPercentage}%
                  </p>
                 }
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
                 <div className="day-on-you">
                 {
                   item.offer===1 &&
                   <span className="offer-text splashing">
                    {props?.lang==="en" && item?.offerText?.substring(0,25)}
                    {props?.lang==="ar" && item?.offerTextArabic?.substring(0,25)}
                     
                  </span>

                  }
                 </div>
                    
                </div>
                <div className="listing-contents  ">
                  <h3 className=" position-relative"> 
                   
                  {props?.lang==="en" && item?.carName?.substring(0,25)}
                    {props?.lang==="ar" && item?.carNameArabic?.substring(0,25)}
                  
                  
                  </h3>
                  {
                    item.priceDailyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED{item.dailyPriceBefore}</strong><span className="mx-1">/</span>Daily</del>
                     &nbsp; <span>  <strong>AED{item.dailyPriceAfter}</strong><span className="mx-1">/</span>Daily 
                     </span>
                  </div>
                  }
                  
                  {
                   item.priceMonthlyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED {item.monthlyPriceBefore}</strong><span className="mx-1">/</span>Monthly</del>
                     &nbsp; <span>  <strong>AED{item.monthlyPriceAfter}</strong><span className="mx-1">/</span>Monthly
                     </span>
                  </div>
                  }
                  {
                    item.priceYearlyStatus===1&&
                    <div className="rent-price">
                   
                     <del><strong>AED {item.yearlyPriceBefore}</strong> <span className="mx-1">/</span>Yearly</del>
                     &nbsp;  <span> <strong>AED{item.yearlyPriceAfter}</strong><span className="mx-1">/</span>Yearly
                     </span>
                  </div>
                  }
                  
                  <div>
                  {props?.lang==="en" && <p>{item?.description?.substring(0,70)}</p>}
                  {props?.lang==="ar" && <p>{item?.descriptionArabic?.substring(0,70)}</p>}
                    
                    {/* <p>{item.description.substring(0,70)}</p> */}
                  
                  <div className="booking-whatsapp">
                       <a   className="btn btn-primary btn-sm make-red-important" 
                         
                       onClick={()=> {setBookId(item.carId);setIsOpen(true)}}>
                         {props?.fillerdata?.BookNow}
                       </a> 
                      <h6 className=" ml-3 mr-3">{props?.fillerdata?.OR}</h6>
                      <span  className=" whatsapper mr-3">
                          <Link  href={"https://wa.me/+971507060661?text=Hello%21+I+need+to+rent+a+car%21+Can+you+help+with+me+that%3F"} className="nav-link " target="_blank">
                              <a ><i className="icon-whatsapp"></i></a>
                          </Link>
                      </span>
                      <span  className=" whatsapper  mr-3">
                          <Link  href={"tel:+971507060661"} className="nav-link " target="_blank">
                              <a ><i className="icon-phone"></i></a>
                          </Link>
                      </span>
                      </div>
                  </div>
                </div> 
              </div>
            </div>
                  )
                 })
             } 
              <Modalbooking modalIsOpen={modalIsOpen} bookId={bookId} setIsOpen={setIsOpen}/>
              <ToastContainer />
     </div>  
</>
  )
}

