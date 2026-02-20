'use client'
import { WishListResponse } from '@/types/wishlist-response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { Button  } from '@/components/ui/button'
import Image from 'next/image'
import cartImg from '../../assets/cart.png'
import Link from 'next/link'
import { deleteWishList } from '@/services/wishlist/delete-product'
import { updateWishListItem } from '@/services/wishlist/update-product'
export default function Wishlist() {
    const queryClient = useQueryClient()
 const{data:wishListData , isLoading , isError} = useQuery<WishListResponse>({
    queryKey:['get-wishlist'] ,
    queryFn:async ()=>{
      const resp = await fetch('/api/wishlist')
      const payload =await resp.json()
      return payload
    }
  })

// delete cart
const {mutate:delWishListItem , isPending  ,} = useMutation({
  mutationFn:deleteWishList ,
  onSuccess:()=>{
    toast.success('product deleted')
    queryClient.invalidateQueries({
      queryKey:['get-wishlist']
    })
  } ,
  onError:()=>{
    toast.error('error')
  }
})

//update updateCartItem

const {mutate:updateWish , isPending:updateLoading } = useMutation({
  mutationFn:updateWishListItem,
  onSuccess:()=>{
    toast.success('product updated')
    queryClient.invalidateQueries({
      queryKey:['get-wishlist']
    })
  } ,
  onError:()=>{
    toast.error('error')
  }
})
function handleUpdate(productId:string ,quantity:number){
  updateWish({productId , quantity})
}

 if(isLoading){
  return <h2>Loading....</h2>
 }
 if(isError){
  return <h2>Error! </h2>
 }
 const products = wishListData?.data ?? []
  return <>

{products.length > 0 ? (
   <div className="flex gap-5 ml-5 mt-5">
  <div className="w-3/4">
  <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
  <table className="w-full text-sm text-left rtl:text-right text-body">
    <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Product
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Price
        </th>
        <th scope="col" className="px-6 py-3 font-medium">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
       {wishListData?.data.map((prod)=>{ return <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
        <td className="p-4">
          <img src={prod.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {prod.title}
        </td>
        <td className="px-6 py-4">
          <form className="max-w-xs mx-auto">
            <label htmlFor="counter-input-1" className="sr-only">choose quantity</label>
            <div className="relative flex items-center">
              {/* <button onClick={()=>{handleUpdate(prod._id , prod.quantity-1)}} type="button" id="decrement-button-1" data-input-counter-decrement="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
              </button>
              <span className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center mx-3" >{prod.count}</span>
              <button onClick={()=>{handleUpdate(prod._id , prod.quantity+1)}} type="button" id="increment-button-1" data-input-counter-increment="counter-input-1" className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6">
                <svg className="w-3 h-3 text-heading" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
              </button> */}
            </div>
          </form>
        </td>
        <td className="px-6 py-4 font-semibold text-heading">
          {prod.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>{delWishListItem(prod._id)}} className="font-medium text-fg-danger hover:underline">Remove</span>
        </td>
      </tr>})}
    </tbody>
  </table>
     {/* { <Button onClick={()=>{removeWish()}} className='my-4 w-full'>Clear Cart</Button> */}

</div>
  </div>
  
</div> ) : <Image className='m-auto mt-9' src={cartImg} alt='cart'  width={400} height={400}/> } 






  </>
} 
