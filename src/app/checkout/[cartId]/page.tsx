import React from 'react'
import CheckoutForm from '@/app/_components/CheckOutForm/CheckOutForm'

export default async function Checkout({params}:{params:{cartId:string}}) {
  const {cartId} = await params
  return (
    <CheckoutForm cartId={cartId}></CheckoutForm>
  )
}
