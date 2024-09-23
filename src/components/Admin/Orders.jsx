import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:4000/users');
        const normalUsers = res.data.filter((user) => !user.admin);
        let allOrders = [];
        normalUsers.forEach((user) => {
          if (user.orders) {
            user.orders.forEach((order) => {
              allOrders.push({...order, customer: user.username, userId: user.id});
            });
          }
        });
        setOrders(allOrders);
        setFilteredOrders(allOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  const filterOrders = (status) => {
    const filtered = orders.filter(order => 
      status ? order.status === status : true
    );
    setFilteredOrders(filtered);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterOrders(status);
  };

  const handleView = (order) => {
    navigate(`/admin/orders/${order.userId}/${order.orderId}`);
  };

  const handleDelete = async (orderId, userId) => {
    try {
      const res = await axios.get(`http://localhost:4000/users/${userId}`);
      const user = res.data;
      const updatedOrders = user.orders.filter(order => order.orderId !== orderId);
      await axios.patch(`http://localhost:4000/users/${userId}`, { orders: updatedOrders });
      toast.success('Order deleted successfully');
      setOrders(orders.filter(order => order.orderId !== orderId));
      setFilteredOrders(filteredOrders.filter(order => order.orderId !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus, userId) => {
    try {
      const res = await axios.get(`http://localhost:4000/users/${userId}`);
      const user = res.data;
      const updatedOrders = user.orders.map(order => 
        order.orderId === orderId ? { ...order, status: newStatus } : order
      );
      await axios.patch(`http://localhost:4000/users/${userId}`, { orders: updatedOrders });
      toast.success('Order status updated');
      setOrders(orders.map(order => (order.orderId === orderId ? { ...order, status: newStatus } : order)));
      setFilteredOrders(filteredOrders.map(order => (order.orderId === orderId ? { ...order, status: newStatus } : order)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-semibold check-head">Order Management</h2>
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="border rounded p-2 mr-4"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Customer</th>
            <th className="border px-4 py-2 text-left">Total Items</th>
            <th className="border px-4 py-2 text-left">Total Price</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="6" className="border px-4 py-2 text-center">No orders found</td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order.orderId} className="border-b hover:bg-gray-200">
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">{order.customer}</td>
                <td className="border px-4 py-2">{order.totalItem}</td>
                <td className="border px-4 py-2">Rs.{order.totalPrice}</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdateStatus(order.orderId, e.target.value, order.userId)}
                    className="border rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button onClick={() => handleView(order)} className="bg-blue-500 text-white px-3 rounded">
                      View
                    </button>
                    <button onClick={() => handleDelete(order.orderId, order.userId)} className="bg-red-500 text-white px-3 py-1">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement
