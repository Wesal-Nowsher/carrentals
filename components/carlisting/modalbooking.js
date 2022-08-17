
import React,{useEffect,useState} from "react" 
import {customStyles78} from "../utils";;

import { Carousel } from 'react-responsive-carousel';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

import axios from "axios";
import {api} from "../utils"
export default function Modalbooking(props){
     const [cardata, setCarData]=useState({});
     const [chosetypeofd, setChoosetypeofd]=useState("Salik");

     const [bookvalue, setBookVaue]=useState({
      carId: props.bookId && props.bookId,
      customerName: "",
      pickUp: "",
      dropOff: "",
      email: "",
      phoneNo: "",
      modeOfDeleivery: 0,
      neeedsNote: ""
    })

    useEffect(()=>{  
      props.bookId && getcar(props.bookId);
    },[props.bookId])

    const Changing=(e)=>{
    
      setBookVaue({...bookvalue, [e.target.name]:e.target.value})
    }

    const AddBooking=(e)=>{
      e.preventDefault();
      if(bookvalue.email==="" && bookvalue.phoneNo==="" ){
        toast("Email and phonenumber is required");
        return
      }
      if(bookvalue.email==="" && bookvalue.phoneNo!=="" ){
        toast("Email  required");
        return
      }
      if(  bookvalue.phoneNo!=="" &&bookvalue.email!==""  ){
        toast("Phone Number is required");
        return
      }
      
      let  booking ={...bookvalue};
      booking.carId=props.bookId;
      axios.post(`${api}Bookings/Create`,booking).then((res)=>{ 
       
        props.setIsOpen(false)
        toast("We have recieved your details. Our representative will Contact you shortly");
  }) 
     }
     
    
    const getcar=(id)=>{
      
      axios.get(`${api}Cars/GetById/${id}`).then((res)=>{

        setCarData(res.data && res.data);

      })  
    }
    return(
        <Modal
        isOpen={props.modalIsOpen}
       
        onRequestClose={()=> props.setIsOpen(false)}
        style={customStyles78}
        contentLabel="Example Modal"
      >
            <div className="row">
            <div   className={`col-md-12 col-lg-4 mb-4 ${ cardata &&cardata.offer===1 ? "add-radius":"" }`}> 
                     <div className="listing d-block  align-items-stretch">
                <div className="listing-img    position-relative">
                 {
                  cardata.discountStatusId===1 && 
                   <p className="discount " 
                   // style={{backgroundImage: "url(images/firedribbble.gif)"}}
                  
                   >{cardata &&cardata.discountPercentage}%
                     </p>
                 }
                <Carousel  showThumbs={false} autoPlay={false} infiniteLoop={true} interval={2000}>
                     {              
                               cardata &&cardata.urls && cardata &&cardata.urls.map((ite,indx)=>{
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
                   cardata &&cardata.offer===1 &&
                   <span className="offer-text splashing">
                    {cardata?.offerText?.substring(0,15)}
                  </span>

                  }
                 </div>
                    
                </div>
                <div className="listing-contents  ">
                  <h3 className="d-flex justify-content-between position-relative"><span>
                  {cardata &&cardata?.carName?.substring(0,25)}
                  </span>
                  
                  </h3>
                  {
                    cardata &&cardata.priceDailyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED{cardata &&cardata.dailyPriceBefore}</strong><span className="mx-1">/</span>Daily</del>
                     &nbsp; <span>  <strong>AED{cardata &&cardata.dailyPriceAfter}</strong><span className="mx-1">/</span>Daily 
                     </span>
                  </div>
                  }
                  
                  {
                   cardata &&cardata.priceMonthlyStatus===1 &&
                    <div className="rent-price">
                   
                     <del><strong>AED {cardata &&cardata.monthlyPriceBefore}</strong><span className="mx-1">/</span>Monthly</del>
                     &nbsp; <span>  <strong>AED{cardata &&cardata.monthlyPriceAfter}</strong><span className="mx-1">/</span>Monthly
                     </span>
                  </div>
                  }
                  {
                    cardata &&cardata.priceYearlyStatus===1&&
                    <div className="rent-price">
                   
                     <del><strong>AED {cardata &&cardata.yearlyPriceBefore}</strong> <span className="mx-1">/</span>Yearly</del>
                     &nbsp;  <span> <strong>AED{cardata &&cardata.yearlyPriceAfter}</strong><span className="mx-1">/</span>Yearly
                     </span>
                  </div>
                  }
                  
                  <div>
                    <p>{cardata && cardata.description?.substring(0,25)}</p>
                  
                  
                  </div>
                </div> 
              </div>
               </div>
               <div className="col-lg-8 col-md-12 mb-4 modal-booking" >

                  
            <form action="#"   className="trip-form  ">
              
              <div className="form-group row">
                <div className="col-md-12 mb-4 mb-lg-0">
                  <input type="text" className="form-control" 
                   onChange={(e)=> Changing(e)}
                  placeholder={ "Please Write Your Name Here"}
                  name="customerName"
                  />
                </div> 
              </div>
              <div className="row  mb-4 "> 
               
                <div className="mb-3 mb-md-0 col-md-4">
                  <div className="form-control-wrap">
                    <label >Pick up</label>
                    <input type="date" id="cf-3" 
                     onChange={(e)=> Changing(e)}
                    placeholder={""} name="pickUp" className="form-control datepicker px-3" />
                    

                  </div>
                </div>
                <div className="mb-3 mb-md-0 col-md-4">
                  <div className="form-control-wrap">
                    <label >drop off</label>
                    <input type="date" id="cf-4" 
                     onChange={(e)=> Changing(e)}
                    placeholder={""} name="dropOff" className="form-control datepicker px-3" />
                    
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <input type="email" className="form-control"
                   onChange={(e)=> Changing(e)}
                  name="email" placeholder={"Enter your Email Address"} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <input type="number" className="form-control" 
                   onChange={(e)=> Changing(e)}
                  name="phoneNo" placeholder={"Phone Number"} />
                </div>
              </div>
              <div className="form-group row">
                {/* <div className="col-md-1 pl-3 p-0 d-flex align-items-center">
                  <input type="radio" className=" mr-1 " name="typed" value={"Salik"} checked={chosetypeofd==="Salik"} onChange={(e)=> setChoosetypeofd(e.target.value)}  />
                  Salik
                </div> */}
                <div className="col-md-2   d-flex align-items-center">
                  <input type="radio" className="  mr-1" name="modeOfDeleivery" 
                   onChange={(e)=> setBookVaue({...bookvalue, [e.target.name]:parseInt(e.target.value)})}
                  value={0} checked={bookvalue.modeOfDeleivery===0}    />
                  Pick up
                </div>
                <div className="col-md-2   d-flex align-items-center">
                  <input type="radio" className=" mr-1"  
                   onChange={(e)=> setBookVaue({...bookvalue, [e.target.name]:parseInt(e.target.value)})}
                  name="modeOfDeleivery" value={1} checked={bookvalue.modeOfDeleivery===1}   />
                  <span>Delivery</span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <textarea name="neeedsNote" id="" className="form-control" 
                    onChange={(e)=> Changing(e)}
                  placeholder={"Write your needs"} cols="30" rows="10"></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-2 mr-auto">
                  <button type="submit" className="btn btn-block btn-primary text-white py-3  " 
                    onClick={(e)=> AddBooking(e)}
                  >
                      {"Book"} 
                  </button>
                </div>
              </div>
            </form>
          </div>
            </div>
      </Modal>
    )
}










