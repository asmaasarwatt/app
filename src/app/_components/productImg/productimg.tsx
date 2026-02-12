'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
export default function Productimg({images}:{images:string[]}) {
  return (
    <>
    
    <Carousel   plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
    align: "start",
    loop: true,
  }} >
  <CarouselContent>
  {images.map((src)=>{return   <CarouselItem>
        <Image width={200} height={300}
         src={src}
        alt={src}
        className="w-full object-cover"
        />
    </CarouselItem>})}
    
  </CarouselContent>

</Carousel>
    
    </>
  )
}
