
'use client'

import Link from "next/link"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

type Category = {
  _id: string
  name: string
}

export default function CategoryDropDown() {
  const [open, setOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(
        'https://ecommerce.routemisr.com/api/v1/categories'
      )
      const payload = await res.json()
      return payload.data
    }
  })

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="block py-2 px-3 bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
      >
        Categories
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
          {data?.map((cat: Category) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
