'use client'
import React from 'react'
import { CardFooter} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/services/cart/addProduct'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { addToWishList } from '@/services/wishlist/add-product'
export default function AddBtn({productId}:{productId:string}) {
  const queryClient = useQueryClient()
  const {data ,isPending , isError , error , mutate:addProductToCart} = useMutation({
    mutationFn:addToCart ,
    onSuccess:(data)=>{
      toast.success(data?.message)
      queryClient.invalidateQueries({queryKey:['get-cart']})
    } ,
   onError:()=>{
    toast.error('login first')
   },
  })
  const{mutate:addProductToWishList}= useMutation({
    mutationFn:addToWishList,
    onSuccess:(data)=>{
      toast.success(data?.message)
      queryClient.invalidateQueries({queryKey:[`get-wishlist`]})
    } ,
    onError:()=>{
      toast.error('login first')
    }
  })
 
 
  console.log(data)
  return <>
  <CardFooter className="flex justify-between">
       
        <Button onClick={()=>{addProductToCart(productId)}}   className="">Add to cart</Button>
        
      <Button onClick={()=>{addProductToWishList(productId)}}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
</Button>     
        
      </CardFooter>

  </>
}
