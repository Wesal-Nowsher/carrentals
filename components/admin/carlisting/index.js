            
import React,{useEffect,useState} from "react" 


import Modalcaredit from "./modalcaredit"

import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Newcar from "./newcar"

import axios from "axios";
import {api} from "../../utils"

export default function Carlistings(props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const [itembooking, setItembooking] = useState(false);
    const [indexbooking, setIndexbooking] = useState(false);
    const [carvalues, setCar]=useState([]);
    const [editId, setEditid]=useState("");
    useEffect(()=>{
      getallcars();
    },[])
    const getallcars=()=>{
      axios.get(`${api}Cars/GetAll`).then((res)=>{
        
        res.data && setCar([...res.data])
      })  
    }
    const deletecar=(id)=>{
      if(window.confirm("Are you sure to delete?")===true){
        axios.delete(`${api}Cars/Delete/${id}`).then((res)=>{
          
          getallcars()
          
        })  
      }
    }
    
  return (  
    <>
    <div className="row">
             {
                 carvalues && carvalues.map((item,index)=>{
                  return (
                    <div key={index} className={`admin-car col-md-6 col-lg-3 mb-4 mt-5  ${ item.offer===1 ? "add-radius":"" }`}> 
                  <div className="listing d-block  align-items-stretch">
                <div className="listing-img h-100  position-relative">
                 {
                  item.discountStatusId===1 && 
                   <p className="discount " 
                   // style={{backgroundImage: "url(images/firedribbble.gif)"}}
                  
                   >{item.discountPercentage}%
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
                    {item.offerText.substring(0,25)}
                  </span>

                  }
                 </div>
                    {/* 
                    
                    { index=== 0 && <img src="images/car_6.jpg" alt="Image" className="img-fluid" />}
                    { index=== 1 && <img src="images/car_1.jpg" alt="Image" className="img-fluid" /> }
                    { index=== 2 && <img src="images/car_3.jpg" alt="Image" className="img-fluid" />}
                    { index=== 3 && <img src="images/car_4.jpg" alt="Image" className="img-fluid" />}
                    { index=== 4 && <img src="images/car_5.jpg" alt="Image" className="img-fluid" />}
                    { index=== 5 && <img src="images/car_2.jpg" alt="Image" className="img-fluid" />}
                    
                    */}
                </div>
                <div className="listing-contents h-100">
                  <h3 className="d-flex justify-content-between position-relative"><span>
                  {item.carName}
                  </span>
                  
                  </h3>
                  {
                  item.priceStatusId===1 &&   item.priceDailyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED{item.dailyPriceBefore}</strong><span className="mx-1">/</span>Daily</del>
                     &nbsp; <span>  <strong>AED{item.dailyPriceAfter}</strong><span className="mx-1">/</span>Daily 
                     </span>
                  </div>
                  }
                  
                  {
                  item.priceStatusId===1 && item.priceMonthlyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED {item.monthlyPriceBefore}</strong><span className="mx-1">/</span>Monthly</del>
                     &nbsp; <span>  <strong>AED{item.monthlyPriceAfter}</strong><span className="mx-1">/</span>Monthly
                     </span>
                  </div>
                  }
                  {
                   item.priceStatusId===1 && item.priceYearlyStatus===1&&
                    <div className="rent-price">
                   
                     <del><strong>AED {item.yearlyPriceBefore}</strong> <span className="mx-1">/</span>Yearly</del>
                     &nbsp;  <span> <strong>AED{item.yearlyPriceAfter}</strong><span className="mx-1">/</span>Yearly
                     </span>
                  </div>
                  }
                  {/* <div className="d-block d-md-flex mb-3 border-bottom pb-3">
                    <div className="listing-feature pr-4">
                      <span className="caption">{item.luggage}:</span>
                      <span className="number">8</span>
                    </div>
                    <div className="listing-feature pr-4">
                      <span className="caption">{item.doors}:</span>
                      <span className="number">4</span>
                    </div>
                    <div className="listing-feature pr-4">
                      <span className="caption">{item.Passenger}:</span>
                      <span className="number">4</span>
                    </div>
                  </div> */}
                  <div>
                    <p>{item.description.substring(0,70)}</p>
                   <div className="booking-whatsapp">
                     
                   <p className="delete-edit-btn">
                            <span className="service-1-icon"  onClick={()=> {setEditid(item.carId); setIsOpen(true); }} ><span className="icon-edit"></span></span>
                            <span className="service-1-icon ml-2" onClick={()=> deletecar(item.carId)} ><span className="icon-trash"></span></span>
                  </p>
                    
                   
                   </div>
                  </div>
                </div> 
              </div>
            </div>
                  )
                 })
             }
         
         <ToastContainer />
         <Modalcaredit modalIsOpen={modalIsOpen} editId={editId}   setIsOpen={setIsOpen} getallcars={getallcars}  />
         <Newcar modalIsOpennew={props.modalIsOpennew}   setIsOpennew={props.setIsOpennew}  getallcars={getallcars} />
     </div>


    
</>
  )
}
