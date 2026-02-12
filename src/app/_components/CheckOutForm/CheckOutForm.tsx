'use client'
import React, { useState } from 'react'
import { Controller , useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field , FieldDescription , FieldLabel , FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import   toast  from 'react-hot-toast';
import { payCashOrder } from '@/services/cart/pay-cash';
import { shipping } from '@/types/cart-response';
import { payOnlineOrder } from '@/services/pay-online';

export default function CheckoutForm({cartId}:{cartId:string}) {
    const [isOnline, setisOnline] = useState(true)

 async function payCash(cartId : string , shippingAddress : shipping){
    const response = await payCashOrder(cartId , shippingAddress)
    console.log(response)
    if(response.status=="success"){
        toast.success('Your order will be delivered soon')
        window.location.href='/'
    }
    else{
        toast.error('error')
    }
    }
 async function payOnline(cartId : string , shippingAddress : shipping){
    const response = await payOnlineOrder(cartId , shippingAddress)
    console.log(response)
    if(response.status=="success"){
    //     toast.success('Your order will be delivered soon')
        window.location.href=response.session.url
    }
    else{
        toast.error('error')
    }
    }
 
  const[isLoading, setisLoading] = useState(false)
  const form = useForm({
    defaultValues :{
    details: "",
    phone: "",
    city: ""
    },
   
  })
 async function submitForm(values:shipping){
      setisLoading(true)
    console.log(values)
    const shippingAddress={
        ...values
    }
    if(isOnline){
    payOnline(cartId ,shippingAddress)
    }
    else{
     payCash(cartId ,shippingAddress)
    }
    
   
   setisLoading(false)
  }



  return (
    <>
    <div className="mx-auto w-1/2 p-10 rounded mt-10 bg-gray-200">
    <h2 className="text-green-600 font-bold text-2xl text-center">Login Now!</h2>
      <form onSubmit={form.handleSubmit(submitForm)}>
     <div className="mt-4">
      <Controller
  name="details"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>details:</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your details"
      />
    </Field>
  )}
/>
     </div>
     <div className="mt-4">
      <Controller
  name="city"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>City :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your city"
      />
    </Field>
  )}
/>
     </div>
     <div className="mt-4">
      <Controller
  name="phone"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Phone:</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your phone"
      />
    </Field>
  )}
/>
     </div>
 
    
         <Button onClick={()=>{setisOnline(false)}} disabled={isLoading} type='submit' className="my-5 w-full">
          {isLoading? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg> : 'Pay Cash'}
         </Button>
         <Button onClick={()=>{setisOnline(true)}} disabled={isLoading} type='submit' className="my-5 w-full">
          {isLoading? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
</svg> : 'Pay Online'}
         </Button>
      </form>


    </div>
    
    </>
  )
}
