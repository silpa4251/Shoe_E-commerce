import { useParams } from 'react-router-dom';
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
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      {user ? (
        <>
          <h2 className="text-3xl font-bold mb-4 check-head">User Details: {user.username}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Status:</strong> {user.blocked ? 'Blocked' : 'Active'}</p>


          <h3 className="text-2xl font-semibold mt-4 check-head">Order History</h3>
          {user.orders && user.orders.length > 0 ? (
            <table className="min-w-full table-auto mt-4">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order ID</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Total Price</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Items</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {user.orders.map((order) => (
                  <tr key={order.orderId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{order.orderId}</td>
                    <td className="py-3 px-6">{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td className="py-3 px-6">Rs.{order.totalPrice}</td>
                    <td className="py-3 px-6">{order.status}</td>
                    <td className="py-3 px-6">
                      {order.ordered_Items.map((item, index) => (
                        <div key={index} className="flex items-center mb-4 bg-gray-50 rounded-lg p-4 shadow">
                          <div className="w-20 h-20">
                            <img
                              src={item.Image}
                              alt={item.Item_Name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>
                          <div className="ml-4">
                            <p className="font-semibold text-lg">{item.Item_Name}</p>
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
            <p>No orders found.</p>
          )}
        </>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails
