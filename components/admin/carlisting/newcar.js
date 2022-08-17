
import React,{useEffect,useState} from "react" 
import {customStyles1} from "../../utils";;
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';




import axios from "axios";
import {api} from "../../utils"



export default function Modalbooking(props){
       
        const [form,setForm]=useState({

        })
        
        const [openoffer, setOpenoffer]=useState(false)
        const [images, setImages]= useState([]);

        const [opendiscounts, setOpendiscounts]=useState(false)
        const [beforeprice, setBeforeprice]=useState("");
        const [afterprice, setAfterprice]=useState("");
        const [allcategories, setAllcat]=useState([]);
       
        const [carvalue, setCar]=useState({ 
            carName: "",
            carNameArabic: "",
            carNameGerman: "",
            carNameRussian: "",
            carNameIndian: "",
            description: "",
            descriptionArabic: "",
            descriptionGerman: "",
            descriptionRussian: "",
            descriptionIndian: "  ",
            yearOfMfg: 0,
            carCategoryId: 0,
            brand: "",
            pricePerDay: 0,
            priceStatusId: 0,
            discountStatusId: 0,
            offer: 0,
            offerText: "",
            offerTextArabic: "",
            offerTextGerman: "",
            offerTextRussian: "",
            offerTextIndian: "",
            discountPercentage: 0,
            priceDailyStatus: 0,
            priceMonthlyStatus: 0,
            priceYearlyStatus: 0,
            dailyPriceBefore: 0,
            monthlyPriceBefore: 0,
            yearlyPriceBefore: 0,
            dailyPriceAfter: 0,
            monthlyPriceAfter: 0,
            yearlyPriceAfter: 0,
            urls: []
           } )

        
        useEffect(()=>{
          getallcategories()
        },[]);
        const getallcategories=()=>{
          axios.get(`${api}CarCategory/GetAll`).then((res)=>{
            
            res.data && setAllcat([...res.data])
          })  
        }
        const Changing=(e)=>{
           
          setCar({...carvalue, [e.target.name]:e.target.value})
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
        const Addcar=(e)=>{
          e.preventDefault();
          if(carvalue.carName==="" &&carvalue.carNameArabic==="" &&carvalue.carNameGerman===""
          &&carvalue.carNameRussian==="" &&
         carvalue.carNameIndian==="" 
         ){
           toast("Name of the Car in English is required!")
           return
         }
         
         carvalue.urls=[...images];
         if(carvalue.urls.length===0 ){
             toast("Please Add one image at minimum!")
             return
           }
          carvalue.urls=[...images];
        

          axios.post(`${api}cars/create`,carvalue).then((res)=>{ 
            emptyvalues();
            props.getallcars()
            props.setIsOpennew(false)
          
      }).catch((err)=>{
       
      }) 
        }

        const emptyvalues=()=>{
          setCar({ 
            carName: "",
            carNameArabic: "",
            carNameGerman: "",
            carNameRussian: "",
            carNameIndian: "",
            description: "",
            descriptionArabic: "",
            descriptionGerman: "",
            descriptionRussian: "",
            descriptionIndian: "  ",
            yearOfMfg: 0,
            carCategoryId: 0,
            brand: "",
            pricePerDay: 0,
            priceStatusId: 0,
            discountStatusId: 0,
            offer: 0,
            offerText: "",
            offerTextArabic: "",
            offerTextGerman: "",
            offerTextRussian: "",
            offerTextIndian: "",
            discountPercentage: 0,
            priceDailyStatus: 0,
            priceMonthlyStatus: 0,
            priceYearlyStatus: 0,
            dailyPriceBefore: 0,
            monthlyPriceBefore: 0,
            yearlyPriceBefore: 0,
            dailyPriceAfter: 0,
            monthlyPriceAfter: 0,
            yearlyPriceAfter: 0,
            urls: []
           })
          setImages([])
        }
    return(
        <Modal
        isOpen={props.modalIsOpennew}
       
        onRequestClose={()=> {emptyvalues();props.setIsOpennew(false);}}
        style={customStyles1}
        contentLabel="Example Modal"  >    
            <div className="row">  
             <div className="col-lg-8 col-md-8 mb-4 modal-booking" > 
             <h1 className="ml-5">Add Car</h1>  
            <form action="#"   className="trip-form  "> 
              <div className="form-group row ">
                <div className="col-md-12  mb-lg-0  pr-0 mt-2">
                  <input type="text" className="form-control" name="carName"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter car name for English language" />
                  
                </div> 
                <div className="col-md-12 mb-4 mb-lg-0  pr-0 mt-2">
                  <input type="text" className="form-control" name="carNameArabic"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter car name for Arabic language" />
                  
                </div> 
                <div className="col-md-12 mb-4 mb-lg-0 pr-0 mt-2">
                  <input type="text" className="form-control" name="carNameGerman"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter car name for German language" />
                  
                </div>  
                <div className="col-md-12 mb-4 mb-lg-0 pr-0 mt-2">
                  <input type="text" className="form-control" name="carNameRussian"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter car name for Russian language" />
                  
                </div> 
                <div className="col-md-12 mb-4 mb-lg-0 pr-0 mt-2">
                  <input type="text" className="form-control" name="carNameIndian"
                  onChange={(e)=> Changing(e)}
                  placeholder="Enter car name for Indian language" />
                  
                </div> 
              </div>
              <div className="row  mb-4 "> 
               
                <div className="mb-3 mb-md-0 col-md-4 mt-2">
                  <div className="form-control-wrap">
                    <label >Upload your car images Here</label>
                   <input type="file" className=""  onChange={(e)=> Uploadfile(e.target) }  multiple/>
                    
                  </div>
                </div>
                
              </div>
              <div className="form-group row">
                <div className="col-md-12 mb-4 mb-lg-0  mt-2">
                  <textarea type="text" className="form-control"  name="description"
                  onChange={(e)=> Changing(e)}
                    placeholder="Enter car description for English language" >
                      </textarea>
                </div> 
                <div className="col-md-12 mb-4 mb-lg-0  mt-2">
                  <textarea type="text" className="form-control"  name="descriptionArabic"
                  onChange={(e)=> Changing(e)}
                    placeholder="Enter car description for Arabic language" >
                      </textarea>
                </div> 
                <div className="col-md-12 mb-4 mb-lg-0  mt-2">
                  <textarea type="text" className="form-control"  name="descriptionGerman"
                  onChange={(e)=> Changing(e)}
                    placeholder="Enter car description for German language" >
                      </textarea>
                </div> 
                <div className="col-md-12 mb-4 mb-lg-0  mt-2">
                  <textarea type="text" className="form-control"  name="descriptionRussian"
                  onChange={(e)=> Changing(e)}
                    placeholder="Enter car description for Russian language" >
                      </textarea>
                </div> 
                <div className="col-md-12 mb-4 mb-lg-0 mt-2">
                  <textarea type="text" className="form-control"  name="descriptionIndian"
                  onChange={(e)=> Changing(e)}
                    placeholder="Enter car description for Indian language" >
                      </textarea>
                </div> 
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                   
                  <select   id=""  className="form-control" name="carCategoryId"   onChange={(e)=> Changing(e)}>
                  <option>Car type</option>
                    {
                      allcategories && allcategories.map((item,indeer)=>{
                       return( <option key={indeer} value={item.id}>{item.name}</option>)
                      })
                    }

                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-12">
                <select    className="form-control" name="yearOfMfg"   onChange={(e)=> Changing(e)}>
                    <option value="">Year of manufacture</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option> 
                </select>
                </div>
              </div> 
              <div className="form-group row">
                <div className="col-md-12">
                {/* <select   className="form-control"  name="csr-brand">
                    <option value="">Brand</option>
                    <option value="">Honda</option>
                    <option value="">Toyota</option>
                    <option value="">Lancer</option>
                    <option value="">Nissan</option>
                    <option value="">Brand</option>

                </select> */}
                </div>
              </div> 
              <div className="form-group row">
                <div className="col-md-12 mb-4 mb-lg-0">
                  <input type="nummber" className="form-control" placeholder="Price Per day"    
                  name="pricePerDay"   onChange={(e)=> Changing(e)}
                  />
                </div> 
              </div>
              <div className="form-group row">
                <div className="col-md-12 mb-4 mb-lg-0">
                <h4>offers <input type="checkbox" checked={carvalue.offer===1 ? true:false} 
                    
                      onChange={(e)=> e.target.checked===true ? setCar({...carvalue,offer:1}):setCar({...carvalue, offer:0})} 
                    name="offer"  
                     
                    />
                    {carvalue.offer===1 && <>
                                             <input type="text"  placeholder={`Enter the offer text for English Language`}
                                             onChange={(e)=> Changing(e)}
                                              name="offerText"
                                            className="form-control mt-2"/>
                                            <input type="text"  placeholder={`Enter the offer text for Arabic Language`}
                                             onChange={(e)=> Changing(e)}
                                              name="offerTextArabic"
                                            className="form-control mt-2"/>
                                            <input type="text"  placeholder={`Enter the offer text for German Language`}
                                             onChange={(e)=> Changing(e)}
                                              name="offerTextGerman"
                                            className="form-control mt-2"/>
                                            <input type="text"  placeholder={`Enter the offer text for Russian Language`}
                                             onChange={(e)=> Changing(e)}
                                              name="offerTextRussian"
                                            className="form-control mt-2"/>
                                            <input type="text"  placeholder={`Enter the offer text for Indian Language`}
                                             onChange={(e)=> Changing(e)}
                                              name="offerTextIndian"
                                            className="form-control mt-2"/>
                                            </>
                    }

                    </h4> 
                </div> 
              </div>
              <div className="form-group row">
                <div className="col-md-2">
                    <h4>Prices <input type="checkbox" checked={carvalue.priceStatusId===0 ? false:true} 
                    
                    onChange={(e)=> e.target.checked===true ? setCar({...carvalue,priceStatusId:1}):setCar({...carvalue, priceStatusId:0})} 
                    name="priceStatusId"    
                    />
                    
                    </h4> 
                    {
                        carvalue.priceStatusId===1 &&
                      <>
                        <div className="daily">
                          
                        <input type="checkbox" className="mr-2" name="daily" checked={carvalue.priceDailyStatus===1} 
                        
                        onChange={(e)=> e.target.checked===true ? setCar({...carvalue,priceDailyStatus:1}):setCar({...carvalue, priceDailyStatus:0})}    />Daily
                        </div>
                        <div className="monthly">
                            <input type="checkbox" className="mr-2" name="weekly" checked={carvalue.priceMonthlyStatus===1}
                           onChange={(e)=> e.target.checked===true ? setCar({...carvalue,priceMonthlyStatus:1}):setCar({...carvalue, priceMonthlyStatus:0})}    />Monthly
                        </div>
                        <div className="monthly">
                            <input type="checkbox" className="mr-2" name="monthly"  checked={carvalue.priceYearlyStatus===1}
                            
                            onChange={(e)=> e.target.checked===true ? setCar({...carvalue,priceYearlyStatus:1}):setCar({...carvalue, priceYearlyStatus:0})}    />Yearly
                        </div>
                        </>
                    }
                     
                     
                </div>

                <div className="col-md-8 d-flex ml-2">
                        {
                          carvalue.priceDailyStatus===1 && 
                          <div  >
                            <h5>Daily</h5>
                            <input type="number"  placeholder={`Enter the cut price for Daily basis`}
                           onChange={(e)=> Changing(e)}
                              name="dailyPriceBefore"
                            className="form-control"/>

                            <input type="number"  placeholder={`Enter the price for Daily basis`}
                           onChange={(e)=> Changing(e)}
                              name="dailyPriceAfter"
                            className="form-control"/>
                          </div>
                        }
                        {
                          carvalue.priceMonthlyStatus===1  && 
                          <div className="ml-2">
                            <h5>Monthly</h5>
                            <input type="number"  placeholder={`Enter the cut price for Monthly basis`}
                          onChange={(e)=> Changing(e)}
                              name="monthlyPriceBefore"
                            className="form-control"/>
                            <input type="number"  placeholder={`Enter the price for Monthly basis`}
                           onChange={(e)=> Changing(e)}
                              name="monthlyPriceAfter"
                            className="form-control"/>
                          </div>
                        }
                        {
                         carvalue.priceYearlyStatus===1 && 
                          <div className="ml-2">
                            <h5>Yearly</h5>
                            <input type="number"  placeholder={`Enter the cut price for Yearly basis`}
                            onChange={(e)=> Changing(e)}
                              name="yearlyPriceBefore"
                            className="form-control"/>
                            <input type="number"  placeholder={`Enter the price for Yearly basis`}
                            onChange={(e)=> Changing(e)}
                              name="yearlyPriceAfter"
                            className="form-control"/>
                          </div>
                        }

                </div>
              </div> 
              <div className="form-group row">
                <div className="col-md-4">
                    <h4>Discount <input type="checkbox"
                    name="discountStatusId"
                    checked={carvalue.discountStatusId===1}
                      onChange={(e)=> e.target.checked===true ? setCar({...carvalue,discountStatusId:1}):setCar({...carvalue, discountStatusId:0})}
                      /></h4>  
                         {
                          carvalue.discountStatusId===1 && <>
                                                  
                          <label>Discount percentage</label>
                          <input type="text"  placeholder="Enter before price " className="form-control"
                               onChange={(e)=> Changing(e)}
                          name="discountPercentage"
                          /> 
                          </>
                        }  
                </div>
              </div> 
              <div className="form-group row">
                <div className="col-md-3 mr-auto">
                  <button type=""
                  onClick={(e)=> Addcar(e)}
                  className="btn btn-block btn-primary text-white py-3  "   >
                     Add
                  </button>
                </div>
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