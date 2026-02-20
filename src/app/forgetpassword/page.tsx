// "use client";
// import { useState } from "react";
// import axios from 'axios'

// export default function ForgotPassword() {
 

//   return (
//     <form className="max-w-md mx-auto mt-20 space-y-4">
//       <h2 className="text-2xl font-bold  text-green-600">Forgot Password</h2>
//       <input type="email" placeholder="Enter your email" className="w-full border p-3 rounded"/>
//       <button className="bg-green-600 text-white w-full p-3 rounded">Send Code</button>
//     </form>
//   );
// }
'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { Loader } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.email({message: 'invaild email'}),
})
export default function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<null|string>(null)
    const router=useRouter()

     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  
   async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const res=await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{
        method:'POST',
        body:JSON.stringify({
            email:values.email
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
        setMessage(null)
        router.push('/verfiycode')
    }
    setIsLoading(false)
  }
  return <>
  <div className='  min-h-[88vh] flex flex-col justify-center items-center min-h-[75vh]'>

    <h1 className=' my-3 text-3xl font-bold text-green-600'>
     Forgot Password
    </h1>
  <Card className=' shadow-xl p-5 w-sm'>
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className='my-4'>
              <FormLabel className='text-green-600'>email :</FormLabel>
              <FormControl >
                <Input placeholder="enter your email" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        {message&&<p className=' text-sm text-red-500 '>{message}</p>}
        <Button className=' bg-green-500 ml-30 rounded cursor-pointer mt-4' type="submit">{isLoading&&<Loader className=' animate-spin'/>}Submit</Button>
      </form>
    </Form>
  </Card>
  </div>
  </>
}