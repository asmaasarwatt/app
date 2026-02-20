'use client'

import React, { useState } from 'react'

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
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { Loader } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const formSchema = z.object({
  email: z.email(),
  newPassword:z.string().nonempty('password is required').min(8, 'min length is 8 chars').regex(
    /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
    "Password must contain uppercase, lowercase, number and special character"),
})
export default function ResetPassword() {
      const [isLoading, setIsLoading] = useState(false)
    
    const [message, setMessage] = useState<null|string>(null)
    const router=useRouter()

    // type FormValues = z.infer<typeof formSchema>
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      newPassword:'',
    },
  })
 
  
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',{
        method:'PUT',
        body:JSON.stringify({
            email:values.email,
            newPassword:values.newPassword,
        }),
        headers:{
            'content-type':'application/json'
        }
        

    })
    const data=await res.json()
    
    if(data.statusMsg=='fail'){
        setMessage(data.message)
    }
    else{
        toast.success('reset password successed')
        router.push('/login')
    }
   setIsLoading(false)
    
  }
  return <>
  <div className='  min-h-[88vh] flex flex-col justify-center items-center min-h-[75vh]'>

    <h1 className=' my-3 text-3xl font-bold'>
      <span className=' text-green-500'>R</span>eset <span className=' text-green-500'>P</span>assword
    </h1>
  <Card className='shadow-xl p-5 w-sm'>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='my-3'>
              <FormLabel>email</FormLabel>
              <FormControl >
                <Input placeholder="enter your email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className='my-3'>
              <FormLabel>newPassword</FormLabel>
              <FormControl >
                <Input type='password' {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

                 {message&&<p className=' text-sm text-red-500 '>{message}</p>}

                <Button className='bg-green-500 hover:bg-green-400 rounded-tl-none  cursor-pointer mt-4' type="submit">{isLoading&&<Loader className=' animate-spin'/>}Submit</Button>
        
      </form>
    </Form>
  </Card>
  </div>
  </>
}