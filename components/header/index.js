
import React,{useEffect,useState} from "react" 

import Link from 'next/link'
import {useRouter} from 'next/router';
import data2 from "../../pages/English.json"; 
import Flag from 'react-world-flags'
import data1 from "../../pages/arabic.json";
export default function Header() {
  
  const [fillerdata, setFillerdata]=useState({});
  const [search, setSearch]=useState(false);
  const [menu, setMenu]=useState(false);
  const [lang, setLang]=useState(false);

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
     setLang(localStorage.getItem("languageselected") ?  localStorage.getItem("languageselected"):"english");
  },[])

  const Changelanguage=(lang)=>{
      localStorage.setItem("languageselected", `${lang}`);
      window.location.reload();
  }
  
  return (  
  <>
  <div className={`site-mobile-menu site-navbar-target   ${menu===true ? "offcanvas-menu":""} `}>
    <div className="site-mobile-menu-header">
      <div className="site-mobile-menu-close mt-3">
      
        <span className="icon-close2 js-menu-toggle" onClick={()=> setMenu(!menu)}></span>
      </div>
    </div>
    <div className="site-mobile-menu-body">
    <ul className="site-nav-wrap "> 
             {
               fillerdata && fillerdata.nav && fillerdata.nav.map((item,index)=>{
                   return(
                     <li onClick={()=> setMenu(false)} key={index} className={router.pathname===item.href ? "active clicktoclose":"clicktoclose"}>
                       <Link  href={item.href} className="nav-link">{item.name}</Link ></li>
                   )
               })
             } 
              
           </ul>
           

           {/*  */}
    </div>
  </div> 
  <div className={`site-mobile-menu site-navbar-target   ${search===true ? "offcanvas-menu w-100":"w-100"} `}>
    <div className="site-mobile-menu-header">
      <div className="site-mobile-menu-close mt-3">
      
        <span className="icon-close2 js-menu-toggle" onClick={()=> setSearch(!search)}></span>
      </div>
    </div>
    <div className="site-mobile-menu-body">
     
      <div className="form-control-wrap mb-4 mt-4">     
            <input type="text" id="cf-4" placeholder={fillerdata && fillerdata.herosearch && fillerdata.herosearch.keywordsearch} className="form-control  px-3" />   
      </div>
      <div className="mb-3 mb-md-0  mb-4 mt-4 ">
              <select name="" id="" className="custom-select form-control">
                <option value="">{fillerdata && fillerdata.herosearch && fillerdata.herosearch.type}</option>
                <option value="">Ferrari</option>
                <option value="">Toyota</option>
                <option value="">Ford</option>
                <option value="">Lamborghini</option>
              </select>
            </div>
            <div className="mb-3 mb-md-0   mb-4 mt-4 ">
              <div className="form-control-wrap">
                <input type="date" id="cf-3" placeholder={fillerdata && fillerdata.herosearch && fillerdata.herosearch.pick} className="form-control datepicker px-3" /> 
              </div>
            </div> 
            <button type="submit"  className="btn btn-primary btn-block mt-4 py-3" >
              {fillerdata && fillerdata.herosearch && fillerdata.herosearch.searchbtn}
            </button>   
    </div>
  </div> 
  <header className="site-navbar site-navbar-target" role="banner"> 
    <div className="container">
      <div className="row   top-header"> 
        <div className="col-lg-3 col-sm-4 col-7  col-md-4 "> 
        <ul className="list-unstyled social ">
          <li><a href="https://www.facebook.com/Switch-car-rental-100412835755886/"><span className="icon-facebook"></span></a></li>
          <li><a href="https://instagram.com/switch_car_rental?igshid=YmMyMTA2M2Y="><span className="icon-instagram"></span></a></li>
          <li><a href="mailto:info@switchcarrental.com"><span className="icon-envelope-o"></span></a></li>
          {/* <li><a href="#"><span className="icon-linkedin"></span></a></li> */}
        </ul>
        </div> 
        <div className="col-lg-9 col-5  col-sm-8 coicon-menu  text-blackl-md-8  text-right"> 

          <span className="d-inline-flex align-items-center d-lg-none">
           
           
            <span className="lang mr-3">
                <a className="">
                  { lang==="english" && <span>English</span>  }
                  { lang==="arabic" && <span>العربية</span>  }
                  {/* { lang==="russian" && <span>русский</span> }
                  { lang==="indian" && <span> हिन्दी</span>}
                  { lang==="german" && <span> deutsch</span>} */}
                
                </a>
                <ul className="lang-submenu" role="menu" aria-labelledby="dropdownMenu">
                  <li>
                    <a onClick={()=> Changelanguage("english")}>
                    <span>English</span>
                   </a>
                  </li>
                  <li>
                    <a onClick={()=> Changelanguage("arabic")}> 
                    <span>العربية</span>
                    </a>
                  </li>
                  <li className="disabled">
                    <a 
                       // onClick={()=> Changelanguage("russian")} 
                    > 
                    {/* <span>русский</span> */}
                  </a>
                  </li>
                </ul>
              </span>
            <span  className=" search-bar-whats mr-3    ">      
                      <a href="#" className=" site-menu-toggle js-menu-toggle py-5 "  >
                        <span className="icon-search"  onClick={()=> setSearch(!search)}></span></a>  
            </span>
            <a href="#" className=" site-menu-toggle js-menu-toggle   ">
                <span className="icon-menu  text-black"  onClick={()=> setMenu(!menu)}></span>
            </a>
            
          </span>
         
          <nav className="site-navigation text-right ml-auto d-none d-lg-block" role="navigation">
           
            <ul className="site-menu main-menu js-clone-nav ml-auto ">   
              {
                fillerdata && fillerdata.nav && fillerdata.nav.map((item,index)=>{
                    return(
                      <li key={index} className={router.pathname===item.href ? "active":""}><Link  href={item.href} className="nav-link">{item.name}</Link ></li>
                    )
                })
              }
              <li className="lang">
                <a className="">
                { lang==="english" && <span>English</span>  }
                  { lang==="arabic" && <span>العربية</span>  }
                  {/* { lang==="russian" && <span>русский</span> }
                  { lang==="indian" && <span> हिन्दी</span>}
                  { lang==="german" && <span> deutsch</span>} */}
                </a>
              <ul className="lang-submenu" role="menu" aria-labelledby="dropdownMenu">
              <li><a    onClick={()=> Changelanguage("english")}>   <span>English</span></a></li>
              <li className=" "><a   onClick={()=> Changelanguage("arabic")}> <span>العربية</span></a></li>
              {/* <li className=" "><a   onClick={()=> Changelanguage("russian")}> <span>русский</span></a></li>
              <li className=" "><a     onClick={()=> Changelanguage("indian")}> <span> हिन्दी</span></a></li>
              <li className=" "><a     onClick={()=> Changelanguage("german")}> <span> deutsch</span></a></li> */}
              
              
              </ul>
              </li>
               
               
            </ul>
           
          </nav>
        </div>
        
       
      </div>
      <div className="row">
      <div className="site-logo w-100"> 
             
             {
               router && router.pathname && !router.pathname.includes("blogs/[index]") &&
               <a className="w-100 d-flex justify-content-center">
               <video   autoPlay muted loop className="video-logo"> 
                 <source src="/images/logo-video.mp4"  width="100%" />
                 
                 Your browser does not support the video tag.
               </video>
                  {/* <img src="/images/logorentals2.png" alt="Image" className="img-fluid logo-img" /> */}
               </a> 
             }
              
           </div>
      </div>
    </div>
  </header>
  </>

  )
}
