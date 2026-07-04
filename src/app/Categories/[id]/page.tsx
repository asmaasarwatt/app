import { ProductCard } from "@/app/_components/ProductCard/productCard";
type Props = {
  params: {
    id: string;
  };
};

export default async function CategoryProducts({ params }: Props) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${params.id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );

  const { data: products } = await response.json();

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Category Products</h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products?.map((product: any) => (
          <ProductCard key={product._id} prod={product} />
        ))}
      </div>
    </div>
  );
}