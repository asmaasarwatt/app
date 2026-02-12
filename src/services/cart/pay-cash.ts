'use server'

import { getAccessToken } from "@/schema/access-token";
import { shipping } from "@/types/cart-response";
export async function payCashOrder(cartId:string , shippingAddress:shipping) {
   const token =await  getAccessToken()
if(!token){
    throw new Error('unauthorized...')
}
    const resp= await fetch(`${process.env.API}/orders/${cartId}`,{
        method:'POST',
        headers:{
            token:token,
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            shippingAddress
        })
    })
    const payload = await resp.json()
    console.log(payload)
    return payload
}