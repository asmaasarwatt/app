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
import { CategoryCard } from '@/app/_components/CategoryCard/categoryCard';
// // type myProps={
// //   params:{
// //     id:string
    
// //   }
// // }
// export default async function categoryDetails({params}:{params:{id:string}}) {
//   let {id} = await params
//   console.log(id);
//     let response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
//     const {data: category} = await response.json()
 

// const prodRes= await fetch(`https://ecommerce.routemisr.com/api/v1/products?categories=${id}`)
//     const {data: products} = await prodRes.json()
    
//   return (
//     <>
//   <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//     {category?.map((category:any)=><CategoryCard key={category._id} category={category}/>)}
//    </div>





   
//     </>
//   )
// }
export default async function CategoryDetails({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  // get category info
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]/${id}`
  )

  const { data: category } = await response.json()

  // get products of this category
  const prodRes = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?subcategory=${id}`
  )

  const { data: products }: { data: ProductItem[] } =
    await prodRes.json()

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        {category.name}
      </h1>

      <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products?.map((prod) => (
          <ProductCard key={prod._id} prod={prod} />
        ))}
      </div>
    </>
  )
}
