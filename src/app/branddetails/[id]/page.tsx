import { ProductItem } from '@/types/productInterface';
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import AddBtn from '@/app/_components/addBtn/addBtn';
import Productimg from '@/app/_components/productImg/productimg';
// type myProps={
//   params:{
//     id:string
    
//   }
// }
export default async function BrandDetails({params}:{params:{id:string}}) {
  let {id} = await params
  console.log(id);
    let response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    let {data: brandsData} = await response.json()
       const brand = brandsData[0]
///////////////////////
const prodRes= await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
  
    let {data: products} = await prodRes.json()
    
  return (
    <>
    <div className="grid md:grid-cols-3 gap-5 items-center">
      <div className="md:col-span-1">
       {/* <img src={singleProduct.imageCover} alt={singleProduct.title} /> */}
       <Productimg images={products?.images ?? []}></Productimg>
      </div>
      <div className="md:col-span-2">
  <Card className="relative  w-full  pt-0 p-10">
    
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{products?.brand?.name }</Badge>
        </CardAction>
        <CardTitle>{products?.title?.split(' ').slice(0,2).join(' ')}</CardTitle>
        <CardDescription className="my-3">
       {products?.description}
        </CardDescription>
        <CardDescription className="my-3">
       {products?.name}
        </CardDescription>
        <CardDescription className="my-3">
         <div className="flex justify-between">
            <span>{products?.price} EGP</span>
            <span className="flex">{products?.ratingsAverage} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-yellow-300">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
</svg>
</span>
         </div>
        </CardDescription>
      </CardHeader>
 
     <AddBtn productId={products?._id}/>
    </Card>
    </div>

      </div>
    </>
  )
}
