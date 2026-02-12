import React from 'react'
import { BrandCard } from '../_components/BrandCard/brandCard'
import { Brand } from '@/types/productInterface'
export default async function brands() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
      // {
      // method:'Get' ,
      // // cache : 'force-cache' //ssg
      // // cache : 'no-store', //ssr
      // next:{
      //   revalidate:60 //isr
      // }
    // }
  
    let {data : allBrands}:{data : Brand[]} = await response.json()
    console.log(allBrands[0])
  return (
<div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {allBrands?.map((brand)=> <BrandCard key={brand._id} brand={brand}/>)}
   </div>
)
}
