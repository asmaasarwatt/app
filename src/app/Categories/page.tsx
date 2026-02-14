import React from 'react'
import { BrandCard } from '../_components/BrandCard/brandCard'
import { Category } from '@/types/cart-response'
import { CategoryCard } from '../_components/CategoryCard/categoryCard'
import { Button } from '@/components/ui/button'
export default async function categories() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/categories')
      // {
      // method:'Get' ,
      // // cache : 'force-cache' //ssg
      // // cache : 'no-store', //ssr
      // next:{
      //   revalidate:60 //isr
      // }
    // }

  let {data : allCategories}:{data : Category[]} = await response.json()
    console.log(allCategories[0])
  return (
<div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {allCategories?.map((category)=> <CategoryCard key={category._id} category={category}/>)}
   </div>
  )
}
