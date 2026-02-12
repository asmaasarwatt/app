import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
const protectedPages =['/cart', '/profile' , 'wishlist']
const authPages =['/login', '/register']
export async function middleware(req:NextRequest){
 const token = await getToken({req})
   
 if(protectedPages.includes(req.nextUrl.pathname)){
    if(token){
        //cart
        return NextResponse.next();
    }
    else{
        //login
        let redirectUrl = new URL("/login" , process.env.NEXTAUTH_URL );
        redirectUrl.searchParams.set('callback-url' , req.nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }
 }
 if(authPages.includes(req.nextUrl.pathname)){
    if(!token){
        //cart
        return NextResponse.next();
    }
    else{
        //login
        const redirectUrl = new URL('/' , process.env.NEXTAUTH_URL );
        return NextResponse.redirect(redirectUrl);
    }
 }
 return NextResponse.next();
}
