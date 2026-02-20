"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
 
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "code must be 6 characters.",
  }),
})

import React, { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Loader } from "lucide-react"
import Loading from "@/app/loading"

export default function VerifyCode() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<null|string>(null)
const router=useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })
  const {watch,handleSubmit}=form
  const pinValue=watch('pin')
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',{
        method:'POST',
        body:JSON.stringify({
            'resetCode':data.pin
        }),
        headers:{
            'content-type':'application/json'
        }
    })
    const result=await res.json()
    
    if(result.status=='Success'){
        toast.success('verify code successed')
        router.push('/resetPassword')
        setMessage(null)
    }
    else{
        setMessage(result.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    
  if(pinValue.length===6 ){
    handleSubmit(onSubmit)()
  }
    
  }, [pinValue,handleSubmit])
  
  return <>
   <div className='b min-h-[88vh] flex flex-col justify-center items-center min-h-[75vh]'>

    <h1 className=' my-3 text-3xl font-bold'>
      <span className=' text-green-500'>V</span>erify <span className=' text-green-500'>C</span>ode
    </h1>
  <Card className=' shadow-xl p-5 w-sm '>
       <Form {...form} >
      <form  className="w-2/3 space-y-6 ">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem >
              <FormLabel className=" text-xl text-black"> Code</FormLabel>
              
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                
              </FormControl>
              
              <FormMessage />
              
            </FormItem>
          )}
        />
        <div className=" flex justify-center">
        {isLoading&&<Loader className=" animate-spin"/>}</div>
         {message&&<p className=' text-sm text-red-500 '>{message}</p>}


      </form>
    </Form>
  </Card>
  </div>
  </>
}