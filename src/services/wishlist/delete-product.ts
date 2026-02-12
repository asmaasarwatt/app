'use server'
import { JSONSchema } from "zod/v4/core";
import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import { getAccessToken } from "@/schema/access-token";
export async function deleteWishList(productId:string) {
   const token =await  getAccessToken()
if(!token){
    throw new Error('unauthorized...')
}
    const resp= await fetch(`${process.env.API}/wishlist/${productId}`,{
        method:'DELETE',
        headers:{
            token:token,
            'Content-type':'application/json'
        },
    })
    const payload = await resp.json()
    console.log(payload)
    return payload
}