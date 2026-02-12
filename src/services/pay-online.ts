'use server'

import { getAccessToken } from "@/schema/access-token";
import { shipping } from "@/types/cart-response";
export async function payOnlineOrder(cartId:string , shippingAddress:shipping) {
   const token =await  getAccessToken()
if(!token){
    throw new Error('unauthorized...')
}
    const resp= await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
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