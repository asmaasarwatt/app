import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export async function GET(req:NextRequest){
    const token= await  getToken({req})
   
    if(!token){
       return NextResponse.json({error:'unauthorized', staus:401})
    }
    const rep = await fetch(`${process.env.API}/cart`,{
        headers:{
            token:token.token ,
            'Content-type':'application/json'
        }
    })
    const payload= await rep.json()
    return NextResponse.json(payload)
}
