import { useState, useEffect } from "react"
import axios from "axios"
import { Bar } from 'react-chartjs-2'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

        const productRes = await axios.get("http://localhost:4000/products");
        setTotalProducts(productRes.data.length);

        const sortedOrders = allOrders.sort((a,b)=> new Date(b.orderDate) - new Date(a.orderDate));
        const latestOrders = sortedOrders.slice(0,5);
        setRecentOrders(latestOrders);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const getStatus = (status) => {
    switch (status) {
      case "shipped":
        return "bg-blue-400 text-blue-900";
      case "pending":
        return "bg-yellow-500 text-yellow-900";
      case "delivered":
        return "bg-green-500 text-green-100";
      case "canceled":
        return "bg-red-500 text-red-100";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const chartData = {
    labels: ['Users', 'Products', 'Orders', 'Revenue'],
    datasets: [
      {
        label: 'Statistics',
        data: [totalUsers, totalProducts, totalOrders, revenue / 1000],
        backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EC4899'],
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      title: { display: false },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const percentage = (totalOrders / 100) * 100;

  return (
    <div className="p-4">
      <h1 className="text-3xl check-head font-bold mb-6 text-center sm:text-left ">Admin Dashboard</h1>

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

      <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-3xl check-head font-bold mb-4 text-center sm:text-left">Site Overview</h2>
        <div className="relative" style={{ width: '80%', height: '300px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-3xl check-head font-bold mb-4 text-center sm:text-left">Order Completion Progress</h2>
        <div className="w-40 mx-auto flex items-start">
          <CircularProgressbar
            value={percentage}
            text={`${totalOrders} Orders`}
            styles={buildStyles({
              pathColor: `#F59E0B`,
              textColor: '#333',
              trailColor: '#E5E7EB',
            })}
          />
        </div>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-lg mt-8 ">
        <h2 className="text-2xl font-bold mb-4 check-head text-center sm:text-left">Recent Orders</h2>
        <div className="overflow-x-auto" >
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-300 text-gray-800">
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="bg-white even:bg-gray-200">
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{order.shipping_Details.name}</td>
                <td className="border px-4 py-2">{order.orderDate}</td>
                <td className="border px-4 py-2">Rs.{order.totalPrice}</td>
                <td className={`border px-4 py-2 font-semibold ${getStatus(order.status)}`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
