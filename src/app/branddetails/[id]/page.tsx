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
import brands from '@/app/brands/page';
import { ProductCard } from '@/app/_components/ProductCard/productCard';
import { BrandCard } from '@/app/_components/BrandCard/brandCard';
// type myProps={
//   params:{
//     id:string
    
//   }
// }
export default async function BrandDetails({params}:{params:{id:string}}) {
  let {id} = await params
  console.log(id);
    let response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    const {data: brand} = await response.json()
 

const prodRes= await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
    const {data: products} = await prodRes.json()
    
  return (
    <>
  <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {products?.map((prod:any)=><ProductCard key={prod._id} prod={prod}/>)}
   </div>





   
    </>
  )
}
