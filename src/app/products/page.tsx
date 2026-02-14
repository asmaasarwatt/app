import { ProductCard } from "../_components/ProductCard/productCard";
import { ProductItem } from "@/types/productInterface";


export default async function Products() {
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  let { data: allproduct }: { data: ProductItem[] } = await response.json()
  console.log(allproduct[0])
  return (
  <>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-green-500 mb-8 ">All Products</h1>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">

          {allproduct.map((prod) => (
            <ProductCard key={prod._id} prod={prod} />
          ))}

        </div>

</div>
      </>

      );
}