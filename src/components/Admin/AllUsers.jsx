import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      toast.success(`${userToBlock} is blocked`);
      setUsers(users.map(user => (user.id === id ? updatedUser : user))); 
    }
  };

  const unblockUser = async (id) => {
    const userToUnblock = users.find(user => user.id === id);
    if (userToUnblock) {
      const updatedUser = { ...userToUnblock, blocked: false }; 
      await axios.put(`http://localhost:4000/users/${id}`, updatedUser); 
      toast.success(`${userToUnblock} is Unblocked`);
      setUsers(users.map(user => (user.id === id ? updatedUser : user))); 
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    toast.success(`user deleted successfully`);
    setUsers(users.filter(user => user.id !== id));
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-semibold mb-4 check-head">Users</h2>
      <div className="flex justify-end mb-4">
      <div className="relative">
      <input
        type="text"
        placeholder="Search by username or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-2 border-slate-200 focus:border-slate-300 rounded p-2 pr-10 w-64 mb-2"
      />
      <FaSearch size={20} className='absolute right-2 top-[13px] check-head'/>
      </div>
      </div>
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
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">No users found</td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2"> <span className={`py-1 px-3 rounded-full text-white text-sm ${user.blocked ? 'bg-red-500' : 'bg-green-500'}`}>
                      {user.blocked ? 'Blocked' : 'Active'}
                    </span></td>
                <td className="border px-4 py-2">
                  <button onClick={() => viewDetails(user.id)} className='p-2 check-btn rounded '>
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
