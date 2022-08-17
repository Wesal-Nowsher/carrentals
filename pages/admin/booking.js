import React,{useEffect, useState} from "react";
import  Carscom from "../../components/admin/cars/carscomp";
import axios from "axios";
import {api} from "../../components/utils";

import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import Link from 'next/link'
export default function Booking(){
    const [allbookings, setBooking]=useState([]);
    const [cars, setCars]=useState([]);
    useEffect(()=>{
        getallbookings();
        
    },[]);

    const getallbookings=()=>{
        axios.get(`${api}Bookings/GetAll`).then((res)=>{    
            res.data && setBooking([...res.data]);  
             
            axios.get(`${api}Cars/GetAll`).then((resp)=>{ 
                resp.data && setCars([...resp.data]);
                let booking=[...res.data];
                res.data &&  res.data.map((item,index)=>{
                    resp.data && resp.data.map((ite,indx)=>{
                        if(item.carId ===ite.carId){
                            booking[index]["car"]={...ite}
                        }
                    })
                })
               
                setBooking([...booking])    
            });      
          });   
    }
    const deleteBooking=(id)=>{
        if(window.confirm("Are you sure to delete?")===true){
            axios.delete(`${api}Bookings/Delete/${id}`).then((res)=>{
            
              getallbookings();   
            })  
          }
    }
    // {
        // /Bookings/Delete/1
    // }
    
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className='mt-5 pl-5 mb-5' >Bookings</h3>     
            </div>
            <div className="box-booking  admin-booking">
                
                {
                 allbookings && allbookings.reverse().map((item,index)=>{
                  return (
                    <div key={index} className="row pl-2" style={{borderBottom: "2px solid lightgrey",
                        marginBottom: "3rem"}}>
                        {/* <h6 className="pl-5">{index+1}</h6> */}
                        <div className="delete-booking">
                        <span className="icon-trash" onClick={()=> deleteBooking(item.id)}></span>
                        </div>
                    <div  className={` booking-page  col-md-2 col-lg-2 mb-4  ${ item.car && item.car.offer===1 ? "add-radius":"" }`}> 
                  <div className="listing d-block  align-items-stretch"
                  style={{boxShadow: "0px 0px 20px grey"}}
                  >
                <div className="listing-img   position-relative">
                 {
                  item.car && item.car.discountStatusId===1 && 
                   <p className="discount "   >{ item.car && item.car.discountPercentage}%
                  </p>
                 }
                <Carousel  showThumbs={false} autoPlay={false} infiniteLoop={true} interval={2000}>
                     {              
                              item.car && item.car.urls && item.car.urls.map((ite,indx)=>{
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
                  item.car && item.car.offer===1 &&
                   <span className="offer-text splashing">
                    { item.car &&  item.car.offerText}
                  </span>

                  }
                 </div>
                    
                </div>
                <div className="listing-contents ">
                  <h3 className="d-flex justify-content-between position-relative"><span>
                  {item.car &&item.car.carName}
                  </span>
                  
                  </h3>
                  {
                   item.car && item.car.priceDailyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED{item.car && item.car.dailyPriceBefore}</strong><span className="mx-1">/</span>Daily</del>
                     &nbsp; <span>  <strong>AED{ item.car && item.car.dailyPriceAfter}</strong><span className="mx-1">/</span>Daily 
                     </span>
                  </div>
                  }
                  
                  {
                   item.car && item.car.priceMonthlyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED { item.car && item.car.monthlyPriceBefore}</strong><span className="mx-1">/</span>Monthly</del>
                     &nbsp; <span>  <strong>AED{ item.car && item.car.monthlyPriceAfter}</strong><span className="mx-1">/</span>Monthly
                     </span>
                  </div>
                  }
                  {
                   item.car &&   item.car.priceYearlyStatus===1&&
                    <div className="rent-price">
                   
                     <del><strong>AED { item.car && item.car.yearlyPriceBefore}</strong> <span className="mx-1">/</span>Yearly</del>
                     &nbsp;  <span> <strong>AED{ item.car && item.car.yearlyPriceAfter}</strong><span className="mx-1">/</span>Yearly
                     </span>
                  </div>
                  }
                  
                  <div>
                    <p>{ item.car && item.car.description}</p>

                  
                  </div>
                </div> 
              </div>
                    </div>
                    <div className="col-md-10 d-flex align-items-center">
                            <div className="col-md-6 customer-info">
                               <div>
                               <h6>Customer Name:&nbsp;&nbsp;&nbsp;{item.customerName}</h6>
                                 
                                 <h6>Customer  Contact Number:&nbsp;&nbsp;&nbsp;{item.phoneNo}</h6>
                                 <h6>Customer  email:&nbsp;&nbsp;&nbsp;{item.email}</h6>
                                 <h6>Customer  pickUp:&nbsp;&nbsp;&nbsp;{item.pickUp}</h6>
                                 <h6>Customer  dropOff:&nbsp;&nbsp;&nbsp;{item.dropOff}</h6>
                                 
                                 <p>Customer  Messages:&nbsp;&nbsp;&nbsp;{item.neeedsNote}</p>
                                
                                     {
                                         item.modeOfDeleivery===0 && <p> Customer will pick the car himself</p>
                                     }  
                                      {
                                         item.modeOfDeleivery===1 && <p> Customer wants the car be delivered to him</p>
                                     }  
                               </div>
                               
                            </div>
                             
                    </div>
                    
                    </div>
                  )
                 })
             } 
                
            </div>
             
        </div>
    )
}