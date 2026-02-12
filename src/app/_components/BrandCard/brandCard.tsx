
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Brand, ProductItem } from "@/types/productInterface"
import Link from "next/link"
import Productimg from "../productImg/productimg"
import AddBtn from "../addBtn/addBtn"
import brands from "@/app/brands/page"
export function BrandCard({brand}:{brand: Brand}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
     <Link href={`/branddetails/${brand._id}`}> 
     <Image width={200} height={300}
         src={brand.image}
        alt={brand.name}
        className="w-full object-cover"
        />
       {/* <Productimg images={prod.images}></Productimg> */}
      <CardHeader>
        <CardAction>
        </CardAction>
        <CardTitle className="m-auto">{brand.slug.split(' ').slice(0,2).join(' ')}</CardTitle>
      </CardHeader>
     </Link>
    </Card>
  )
}