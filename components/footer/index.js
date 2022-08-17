            
import React,{useEffect,useState} from "react" 
 

import Link from 'next/link'
import data2 from "../../pages/English.json";

import {useRouter} from 'next/router';
import data1 from "../../pages/arabic.json";

export default function Footer() {
    const [fillerdata, setFillerdata]=useState({});
    const router = useRouter();
    useEffect(()=>{ 
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
  return (
     
<>
<footer className="site-footer">
  <div className="container">
    <div className="row">
      <div className="col-lg-3">
        {/* <h2 className="footer-heading mb-4">
          {fillerdata && fillerdata.footer && fillerdata.footer.about &&fillerdata.footer.about.name}
          </h2> */}
        <div className="site-logo"> 
            <Link href="/"><a className="w-100 d-flex justify-content-center"> <img src="/images/logorentals2.png" alt="Image" className="img-fluid" /></a></Link>
        </div>
        <ul className="list-unstyled social d-flex justify-content-center">
        <li><a href="https://www.facebook.com/Switch-car-rental-100412835755886/"><span className="icon-facebook"></span></a></li>
          <li><a href="https://instagram.com/switch_car_rental?igshid=YmMyMTA2M2Y="><span className="icon-instagram"></span></a></li>
         
          <li><a href="mailto:info@switchcarrental.com"><span className="icon-envelope-o"></span></a></li>
          {/* <li><a href="#"><span className="icon-linkedin"></span></a></li> */}
        </ul>
      </div>
      <div className="col-lg-8  ">
       <div className="col-lg-12 d-flex maps-div">
            <div className="col-lg-6">
            
              <iframe width="100%"
             src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8582.38772407324!2d55.33444361349329!3d25.25545904352293!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf3d5720e7de94fa!2sSwitch%20Car%20-%20Rent%20a%20car%20in%20Dubai!5e0!3m2!1sen!2sae!4v1660631730023!5m2!1sen!2sae"
             style={{border:0,    width: "100%", height: "72%",marginBottom:"1rem",marginTop:"1rem",}}  loading="lazy"  ></iframe>
            </div>
            <div className="col-lg-6 d-flex align-items-center ">
              <div className=" p-1  ">
              
                <ul className="list-unstyled footer-link">
                  <li className="d-block  ">
                    <span className="d-block text-black">{fillerdata && fillerdata.contact && fillerdata.contact.contactinfo && fillerdata.contact.contactinfo.address }:</span>
                    <span>{fillerdata && fillerdata?.address}</span></li>
                  <li className="d-block mb-3"><span className="d-block text-black">{fillerdata && fillerdata.contact && fillerdata.contact.contactinfo && fillerdata.contact.contactinfo.phone }:</span><span>+971507060661</span></li>
                  {/* <li className="d-block mb-3"><span className="d-block text-black">{fillerdata && fillerdata.contact && fillerdata.contact.contactinfo && fillerdata.contact.contactinfo.email }:</span><span>info@yourdomain.com</span></li> */}
                </ul>
              </div>
          </div>
           
         
       </div>
       <div className="col-lg-12 d-flex quick-links">
          <div className="col-lg-10 ">
            <ul className="footer-quick-links ">   
                {
                  fillerdata && fillerdata.nav && fillerdata.nav.map((item,index)=>{
                      return(
                        <li key={index} className={router.pathname===item.href ? "active":""}><Link  href={item.href} className="nav-link">{item.name}</Link ></li>
                      )
                  })
                }    
              </ul>
          </div>
          
           
          
        </div> 
      </div>
    </div>
    <div className="row  mt-5 text-center">
      <div className="col-md-12">
        <div className="border-top  ">
          <p className="text-center">
       
          { fillerdata?.footer?.copy[0]} &copy; {fillerdata && fillerdata.footer && fillerdata.footer.heads &&fillerdata.footer.copy[1]}
        
        </p>
        </div>
      </div>

    </div>
  </div>
</footer>
</>
  )
}
