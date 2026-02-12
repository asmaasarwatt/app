'use server'
import { JSONSchema } from "zod/v4/core";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getAccessToken } from "@/schema/access-token";
import { json } from "stream/consumers";
export async function updateCartItem({productId , count}:{productId:string, count:number}) {
   const token =await  getAccessToken()
if(!token){
    throw new Error('unauthorized...')
}
    const resp= await fetch(`${process.env.API}/cart/${productId}`,{
        method:'PUT',
        headers:{
            token:token,
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            count:count
        })
    })
    const payload = await resp.json()
    console.log(payload)
    return payload
}