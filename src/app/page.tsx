import { ProductItem } from "@/types/productInterface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./_components/ProductCard/productCard";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
export default async function Home() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
    // {
    // method:'Get' ,
    // // cache : 'force-cache' //ssg
    // // cache : 'no-store', //ssr
    // next:{
    //   revalidate:60 //isr
    // }
  // }

  let {data : allProducts}:{data : ProductItem[]} = await response.json()
  console.log(allProducts[0])
  return (

   <>
   

<MainSlider/>
<CategorySlider/>
   <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {allProducts?.map((prod)=> <ProductCard key={prod._id} prod={prod}/>)}
   </div>
  
   
   </>
  );
}
