'use server'
import { JSONSchema } from "zod/v4/core";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getAccessToken } from "@/schema/access-token";
export async function addToWishList(productId:string) {
   const token =await  getAccessToken()
if(!token){
    throw new Error('unauthorized...')
}
    const resp= await fetch(`${process.env.API}/wishlist`,{
        cache:'no-store',
        method:'POST',
        headers:{
            token:token,
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            productId
        })
    
    })
     
    const payload = await resp.json()
    console.log(payload)
    return payload
 
    
}
