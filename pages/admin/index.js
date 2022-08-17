import React,{useEffect,useState} from "react";

import { useRouter } from 'next/router'
export default function IndexAdmin() {
    const router = useRouter()
    useEffect(()=>{
          router.push("/admin/categories") 
    },[])
    return (
        <></>
    )
}