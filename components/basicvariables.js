

import jwt_decode from "jwt-decode";
import axios from "axios";
export const url="https://api.sgallo.ae/api/v1.0";



export const header={
    headers: { 'content-type': 'application/json' },
}


export const headerform={
    headers: { "Content-Type": "multipart/form-data" }
  }
  
  
  export default axios.create({
    baseURL: `https://api.sgallo.ae/api/v1.0`,
    headers: { 'content-type': 'application/json' }
  });

export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "70rem",
      height: "80vh"
    },
  };


  
export const PRODCUTPOPcustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: "30rem",
    height: "60vh",
    borderRadius: "1rem",
    boxShadow: "0px 0px 11rem #fdad01"

   
  },
};

  
export const createcartandcheckoututil=()=>{
    let cart =JSON.parse(localStorage.getItem("cart"));
    let decode = localStorage.getItem("token");
    let  decoded = jwt_decode(decode); 
    let checkout=[];
    let purchasemodel1={
            userId: parseInt(decoded.uid),
            quantity: null,
            pricePerUnit: null
    }
    cart.map((item)=>{
        let purchasemodel={...purchasemodel1}
        purchasemodel.quantity=item.quantity;
        purchasemodel.pricePerUnit=item.discountPrice;
        purchasemodel.quantity=item.quantity;
        item.serviceId ? purchasemodel.serviceId=item.serviceId: purchasemodel.productId=item.productId;
        checkout=[...checkout,{...purchasemodel}];
    })
    return checkout;
}






export const addtocartutil=(item, index,pORs)=>{
    let data=JSON.parse(localStorage.getItem("cart")) 
    let newData=data ? [...data]:[]; 
    let alreadyin={yes:true, index:null}
    newData.map((ite ,inde)=>{
        if(ite.id===item.id){
          alreadyin.yes=false;
          alreadyin.index=inde;
        }
    });
    if(alreadyin.yes===true) {
      item.quantity=1;
      item[`${pORs}`]=item.id
      
      newData=[...newData,  item];
      localStorage.setItem("cart",  JSON.stringify(newData));
    }else{
        newData[alreadyin.index].quantity=newData[alreadyin.index].quantity+1;
        localStorage.setItem("cart",  JSON.stringify(newData));
    }
   
}









export const setStorequanutil=()=>{
    let cart=localStorage.getItem("cart") ? [...JSON.parse(localStorage.getItem("cart"))]:[];
    let quan=0;
    cart && cart.map((item)=>{
        quan=quan+item.quantity
    })
    return quan
}












export const removefromcartutil=(modl, index)=>{
        let cart1=[...JSON.parse(localStorage.getItem("cart"))];
        let newCart = cart1 &&cart1.filter(function(item) {
            return modl.id !== item.id
        })

        localStorage.setItem("cart",  JSON.stringify(newCart));
        return newCart && [...newCart];
        
}

