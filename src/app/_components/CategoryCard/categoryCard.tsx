
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
import { Brand, Category, ProductItem } from "@/types/productInterface"
import Link from "next/link"
import Productimg from "../productImg/productimg"
import AddBtn from "../addBtn/addBtn"
import brands from "@/app/brands/page"
export function CategoryCard({category}:{category:Category}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
     <Link href={`/categories/${category._id}`}> 
     <Image width={100} height={100} src={category.image} alt={category.name}className="w-full object-cover" />
      <CardHeader>
        <CardAction>
        </CardAction>
        <CardTitle className="m-auto">{category.name}</CardTitle>
      </CardHeader>
     </Link>
    </Card>
  )
}