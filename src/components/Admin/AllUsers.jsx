import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        setUsers(response.data.filter((user) => user.admin !== true));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const viewDetails = (id) => {
    navigate(`/admin/users/${id}`);
  }

  const blockUser = async (id) => {
    const userToBlock = users.find(user => user.id === id);
    if (userToBlock) {
      const updatedUser = { ...userToBlock, blocked: true }; 
      await axios.put(`http://localhost:4000/users/${id}`, updatedUser); 
      setUsers(users.map(user => (user.id === id ? updatedUser : user))); 
    }
  };

  const unblockUser = async (id) => {
    const userToUnblock = users.find(user => user.id === id);
    if (userToUnblock) {
      const updatedUser = { ...userToUnblock, blocked: false }; 
      await axios.put(`http://localhost:4000/users/${id}`, updatedUser); 
      setUsers(users.map(user => (user.id === id ? updatedUser : user))); 
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-semibold mb-4">Users</h2>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Username</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Details</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">No users found</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.blocked ? 'Blocked' : 'Active'}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => viewDetails(user.id)} className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                    View Details
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    {user.blocked ? (
                      <button 
                        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200" 
                        onClick={() => unblockUser(user.id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button 
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200" 
                        onClick={() => blockUser(user.id)}
                      >
                        Block
                      </button>
                    )}
                    <button 
                      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200" 
                      onClick={() => deleteUser(user.id)}
                    >
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

export default AllUsers;
