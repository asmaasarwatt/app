'use client'
import React from 'react'
import * as zod from "zod"
import { Controller , useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field , FieldLabel , FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from '@/schema/registerSchema';
import { useRouter } from 'next/navigation';
export default function Register() {
  const router = useRouter()
  const form = useForm({
    defaultValues :{
      name:'',
      email:'',
      password:'',
      // rePassword:'',
      phone:''
    },
    resolver:zodResolver(schema),
    mode:'onBlur'
  })
  async function submitForm(values:zod.infer<typeof schema>){
    const response = await fetch (`https://ecommerce.routemisr.com/api/v1/auth/signup`,{
      method:'POST',
      body:JSON.stringify(values),
      headers:{
        'Content-type':'application/json'
      }
    })

    const payload = await response.json()
    console.log(payload)
    if(payload.message=='success'){
      router.push('/login')
    }
   
  }
  return (
    <>
    <div className="mx-auto w-1/2 p-10 rounded mt-10 bg-gray-200">
    <h2 className="text-green-600 font-bold text-2xl text-center">Register Now!</h2>
      <form onSubmit={form.handleSubmit(submitForm)}>
     <div className="mt-4">
      <Controller
  name="name"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Name :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your name"
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
     </div>
     <div className="mt-4">
      <Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email:</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your email"
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
     </div>
     <div className="mt-4">
      <Controller
  name="password"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Password :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your password"
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
     </div>
     <div className="mt-4">
      <Controller
  name="rePassword"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>rePassword :</FieldLabel>
      <Input className='bg-white'
        {...field}
        id={field.name}
        aria-invalid={fieldState.invalid}
        placeholder="Enter your repassword"
      />
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
     
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
     </div>
         <Button type='submit' className="my-5 w-full">Submit</Button>
      </form>


    </div>
    
    </>
  )
}
