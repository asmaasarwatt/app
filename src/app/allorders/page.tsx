import { orders } from '@/types/orders-response'

export default async function AllOrders({params}:{params:{id:string}}) {
  let {id} = await params

  const response = await fetch( `https://ecommerce.routemisr.com/api/v1/orders`)
    


  if (!response.ok) {
    throw new Error('error')
  }

  const json: orders = await response.json()
  const allOrders = json.data   

  return (
    <div className="p-6">
      {allOrders.length > 0 ? (
        allOrders.map((order) => (
          <div  key={order._id} className="border rounded-lg p-4 mb-4 shadow" >
         <h2 className="font-bold text-lg mb-2">Order #{order._id}</h2>
            <p>Total Price: {order.totalOrderPrice} EGP</p>
            <p>Payment: {order.paymentMethodType}</p>
            <p> Paid: {order.isPaid ? "Yes" : "No"}</p>
            <p>Delivered: {order.isDelivered ? "Yes" : "No"}</p>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Products:
              </h3>

              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 mb-2">
                  <img src={item.product.imageCover} className="w-16" />
                  <div>
                    <p>{item.product.title}</p>
                    <p> {item.price} EGP × {item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No Orders Found</p>
      )}
    </div>
  )
}
