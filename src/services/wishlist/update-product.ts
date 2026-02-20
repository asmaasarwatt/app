'use server'
import { JSONSchema } from "zod/v4/core";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getAccessToken } from "@/schema/access-token";
import { json } from "stream/consumers";
export async function updateWishListItem({productId , quantity}:{productId:string, quantity:number}) {
   const token =await  getAccessToken()
if(!token){
    throw new Error('unauthorized...')
}
    const resp= await fetch(`${process.env.API}/wishlist/${productId}`,{
        method:'PUT',
        headers:{
            token:token,
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            quantity:quantity
        })
    })
    const payload = await resp.json()
    console.log(payload)
    return payload
}