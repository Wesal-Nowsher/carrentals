
import React,{useEffect,useState} from "react" 

import Link from 'next/link'
 
import { useRouter } from 'next/router'

import { ToastContainer, toast } from 'react-toastify';
export default function Login() { 
    const [fillerdata, setFillerdata]=useState({});
    const [formavalues, setForm]=useState({
        usernamepassword:"",
        adminpassword:"" 
    })
    const router = useRouter()
  
    useEffect(()=>{ 
        if( localStorage.getItem("adminstatus")){
            // router.push("/admin/categories") 
        }
      },[])
      const loginadmin=(e)=>{
        e.preventDefault();
        if(formavalues.usernamepassword==="" || formavalues.adminpassword==="" ){
            toast("Please Enter both User Name and Password");
            return
        }
        else{
            if(formavalues.usernamepassword==="socrate@carrental.com" && formavalues.adminpassword==="admin123"){
                   localStorage.setItem("adminstatus", true);
                   window.location.reload()
            }
            else{
                toast("Password or User Name is incorrect");
            }
        }
      }
  return (   
  <> 
    <div className="site-section  " id="register-section"> 
      <div className="container pt-5">
        <div className="row  mt-5 justify-content-start  ">
        <div className="col-12  mt-5 mb-5">
          <h2 className="section-heading " style={{textAlign:"left"}}><strong>Admin Login</strong></h2> 
        </div>
      </div>
        <div className="row">
          <div className="col-lg-12 d-flex w-100 mb-5" >
            <form  className="w-100"  >      
              <div className="form-group row">
                <div className="col-md-6">
                  <input type="text" name="usernamepassword" 
                  style={{textAlign:"left"}}
                  onChange={(e)=> setForm({...formavalues,usernamepassword:e.target.value})} className="form-control" placeholder={"Enter the Admin userName"} autoComplete="false" />
                </div>
              </div> 
              <div className="form-group row">
                <div className="col-md-6">
                  <input type="password" name="adminpassword"  
                  style={{textAlign:"left"}}
                  onChange={(e)=> setForm({...formavalues,adminpassword:e.target.value})}  className="form-control" placeholder={"Enter the Admin Password"} autoComplete="false"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-6">
               
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-3  ">
                  <button onClick={(e)=> loginadmin(e)}   className="btn btn-block btn-primary text-white py-3 px-5"   >
                  login 
                  </button>
                </div>
              </div>
            </form>
          </div> 
        </div>
      </div>
      <ToastContainer />
    </div>

  </>
  )
}

   