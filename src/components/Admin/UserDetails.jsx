import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:4000/users/${id}`);
        setUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className="container mx-auto p-8 bg-white shadow-lg rounded-lg mt-6 max-w-5xl">
      {user ? (
        <>
          <h2 className="text-3xl font-bold mb-6 check-head">User Details: {user.username}</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Status:</strong> {user.blocked ? <span className="text-red-600">Blocked</span> : <span className="text-green-600">Active</span>}</p>
          </div>

          <h3 className="text-2xl font-semibold check-head mb-4 border-b pb-2">Order History</h3>
          {user.orders && user.orders.length > 0 ? (
            <table className="min-w-full table-auto bg-gray-50 rounded-lg shadow-md mt-4">
              <thead>
                <tr className="bg-gray-300 text-gray-800 uppercase text-sm font-bold">
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Total Price</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Items</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {user.orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-gray-200 hover:bg-gray-200">
                    <td className="py-3 px-6">{order.orderId}</td>
                    <td className="py-3 px-6">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="py-3 px-6 text-green-600 font-bold">Rs.{order.totalPrice}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 rounded-lg text-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      {order.ordered_Items.map((item, index) => (
                        <div key={index} className="flex items-center mb-4 bg-white rounded-lg p-4 shadow-md">
                          <div className="w-20 h-20">
                            <img
                              src={item.Image || 'https://via.placeholder.com/100'}
                              alt={item.Item_Name}
                              className="w-full h-full object-cover rounded-md shadow"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="font-semibold text-lg text-gray-800">{item.Item_Name}</p>
                            <p className="text-gray-500">Quantity: {item.Quantity}</p>
                            <p className="text-gray-500">Price: Rs.{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 mt-4">No orders found.</p>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-bold text-gray-600">Loading user details...</p>
        </div>
      )}
      <div className="mt-6">
        <Link to="/admin/users" className="check-btn font-bold py-2 px-6 rounded transition duration-300">
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserDetails
