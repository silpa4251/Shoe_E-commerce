import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:4000/users");
        const normalUsers = userRes.data.filter((user) => !user.admin);
        setTotalUsers(normalUsers.length);
        let orderSum = 0;
        let revenueSum = 0;
        let allOrders = [];

        normalUsers.forEach((user) => {
          if (user.orders) {
            user.orders.forEach((order) => {
              orderSum += order.ordered_Items.length;
              revenueSum += parseFloat(order.totalPrice);
              allOrders.push(order);
            });
          }
        });
        setTotalOrders(orderSum);
        setRevenue(revenueSum);
        setRecentOrders(allOrders);

        const productRes = await axios.get("http://localhost:4000/products");
        setTotalProducts(productRes.data.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const getStatus = (status) => {
    switch (status) {
      case "shipped":
        return "bg-yellow-300 text-yellow-900";
      case "pending":
        return "bg-red-500 text-red-100";
      case "delivered":
        return "bg-green-500 text-green-100";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 check-head">Admin Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-3xl mt-4">{totalUsers}</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold">Total Products</h2>
          <p className="text-3xl mt-4">{totalProducts}</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold">Total Orders</h2>
          <p className="text-3xl mt-4">{totalOrders}</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg rounded-lg">
          <h2 className="text-lg font-bold">Total Revenue</h2>
          <p className="text-3xl mt-4">Rs.{revenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Orders</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100 text-gray-600">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{order.shipping_Details.name}</td>
                <td className="border px-4 py-2">{order.orderDate}</td>
                <td className="border px-4 py-2">Rs.{order.totalPrice}</td>
                <td className={`border px-4 py-2 text-center font-semibold rounded ${getStatus(order.status)}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard
