"use client";
import { useState } from "react";
import axios from 'axios'

export default function ForgotPassword() {
 

  return (
    <form className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold  text-green-600">Forgot Password</h2>
      <input type="email" placeholder="Enter your email" className="w-full border p-3 rounded"/>
      <button className="bg-green-600 text-white w-full p-3 rounded">Send Code</button>
    </form>
  );
}