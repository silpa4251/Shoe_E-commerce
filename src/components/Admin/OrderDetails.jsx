import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const OrderDetails = () => {
  const { orderId, userId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/users/${userId}`);
        const user = res.data;
        const selectedOrder = user.orders.find(order => order.orderId === orderId);
        setOrder(selectedOrder);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [orderId, userId]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-600">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow rounded-lg mt-6 max-w-5xl">
      <h2 className="text-3xl font-bold mb-6 check-head border-b pb-4">Order Details - ID: {order.orderId}</h2>

      <div className="mb-4 text-lg">
        <strong>Customer:</strong> {order.shipping_Details.name}
      </div>
      <div className="mb-4 text-lg">
        <strong>Status:</strong> <span className="text-red-700">{order.status}</span>
      </div>
      <div className="mb-4 text-lg">
        <strong>Total Items:</strong> {order.totalItem}
      </div>
      <div className="mb-4 text-lg">
        <strong>Total Price:</strong> <span className="text-green-700">Rs. {order.totalPrice}</span>
      </div>
      <div className="mb-4 text-lg">
        <strong>Order Date:</strong> {order.orderDate}
      </div>

      <h3 className="text-2xl font-semibold mb-4 check-head border-b pb-2">Ordered Items</h3>

      <ul className="space-y-4">
        {order.ordered_Items.map((item, index) => (
          <li key={index} className="flex items-center space-x-4 p-4 border-b">
            <img
              src={item.Image || 'https://via.placeholder.com/100'}
              alt={item.Item_Name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-gray-700">{item.Item_Name}</h4>
              <div className="text-gray-500">Quantity: {item.Quantity}</div>
              <div className="text-gray-500">Price: Rs. {item.price}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Link to="/admin/orders" className="check-btn font-bold py-2 px-6 rounded transition duration-300">
          Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetails
