            
import React,{useEffect,useState} from "react" 
import data2 from "./English.json";

import data1 from "./arabic.json";

import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import {api} from "../components/utils" 
export default function Boking() {
  const [cardata, setCarData]=useState({});
  const [chosetypeofd, setChoosetypeofd]=useState("Salik");
  const [fillerdata, setFillerdata]=useState({});

  const [bookvalue, setBookVaue]=useState({
   carId: "6",
   customerName: "",
   pickUp: "",
   dropOff: "",
   email: "",
   phoneNo: "",
   modeOfDeleivery: 0,
   neeedsNote: ""
 })

 useEffect(()=>{  
  //  props.bookId && getcar(props.bookId);
  if(!localStorage.getItem("languageselected")){
    setFillerdata(data2); 
  }
  else{
      if(localStorage.getItem("languageselected")==="english"){
        setFillerdata(data2); 
      }
      else if(localStorage.getItem("languageselected")==="arabic"){
        setFillerdata(data1); 
      }
  }
 },[])

 const Changing=(e)=>{
   
   setBookVaue({...bookvalue, [e.target.name]:e.target.value});
 }

 const AddBooking=(e)=>{
   e.preventDefault();
  if(bookvalue.email!=="" && bookvalue.phoneNo!="" ){ 
   let  booking = {...bookvalue};
   axios.post(`${api}Bookings/Create`,booking).then((res)=>{ 
     
     toast("We have recieved your details. Our representative will Contact you shortly");
    }) 
  }
  else{
    toast("Please provide your Phone Number and email for least")
  }
   
 }
//  const getcar=(id)=>{
 
//    axios.get(`${api}Cars/GetById/${id}`).then((res)=>{

//      setCarData(res.data && res.data);

//    })  
//  } 
  return (    
<> 
    <div className="site-section bg-light top-padding-standard pt-5 section-small-margin" id="booking-section">
      <div className="container">
        <div className="row   justify-content-center text-center">
        <div className="col-7 text-center   mb-5">
            
          <h2 className="section-heading "><strong> {fillerdata?.formplace?.booking}</strong> </h2>
          <p>{fillerdata?.formplace?.pleasefile}</p>
        </div>
      </div>
        <div className="row">
          <div className="col-lg-12 mb-5" >
          <form action="#"   className="trip-form  " style={{padding:"3vw!important"}}>
              
              <div className="form-group row">
                <div className="col-md-12   mb-lg-0">
                  <input type="text" className="form-control" 
                   onChange={(e)=> Changing(e)}
                  placeholder={fillerdata?.formplace?.PleaseWriteYourNameHere}
                  name="customerName"
                  />
                </div> 
              </div>
              <div className="row  mb-4 "> 
               
                <div className="mb-3 mb-md-0 col-md-4">
                  <div className="form-control-wrap">
                    <label >{ fillerdata?.formplace?.Pickup }</label>
                    <input type="date" id="cf-3" 
                     onChange={(e)=> Changing(e)}
                    placeholder={""} name="pickUp" className="form-control datepicker px-3" /> 
                  </div>
                </div>
                <div className="mb-3 mb-md-0 col-md-4">
                  <div className="form-control-wrap">
                    <label >{ fillerdata?.formplace?.Dropoff }</label>
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
                  name="email" placeholder={fillerdata?.formplace?.PleaseWriteYourEmailHere} />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                  <input type="text" className="form-control" 
                   onChange={(e)=> Changing(e)}
                  name="phoneNo" placeholder={fillerdata?.formplace?.phoneNumber} />
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
                 {fillerdata?.formplace?.Pickup}
                </div>
                <div className="col-md-2  d-flex align-items-center">
                  <input type="radio" className=" mr-1"  
                   onChange={(e)=> setBookVaue({...bookvalue, [e.target.name]:parseInt(e.target.value)})}
                  name="modeOfDeleivery" value={1} checked={bookvalue.modeOfDeleivery===1}   />
                  <span> {fillerdata?.formplace?.Delivery}</span>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                <textarea name="neeedsNote" id="" className="form-control" 
                    onChange={(e)=> Changing(e)}
                  placeholder={fillerdata?.formplace?.Writeyourneeds} cols="30" rows="10"></textarea>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-2 mr-auto">
                  <button type="submit" className="btn btn-block btn-primary text-white py-3  " 
                    onClick={(e)=> AddBooking(e)}
                  >{fillerdata?.BookNow}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
</>
  )
}
