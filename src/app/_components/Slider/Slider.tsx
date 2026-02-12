'use client'
import React from 'react'
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import {Autoplay} from 'swiper/modules';
import { Category } from '@/types/productInterface';

export default function Slider({categories}:{categories:Category[]}) {
  return (
    <>
    <Swiper
     modules={[Autoplay]}
     autoplay={{
        delay:600
     }}
      spaceBetween={0}
      slidesPerView={8}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {categories?.map((category, index)=>{ return <div key={index}>
              <SwiperSlide  key={category._id}><Image className='w-full object-cover h-[200px]' src={category.image} alt='img1'  width={600} height={300}></Image></SwiperSlide>
         <h2>{category.name}</h2>
      </div>})}    
     
      
    </Swiper>
    </>
  )
}
