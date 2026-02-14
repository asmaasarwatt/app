import React from 'react'

export default function resetPassword() {




  return (
    <form  className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Verify Code</h2>
      <input type="text" placeholder="Enter code" className="w-full border p-3 rounded"/>
      <button className="bg-green-600 text-white w-full p-3 rounded"></button>
  </form>
  
  );
}
