import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { ProductContext } from "../Context/ProductContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useContext(ProductContext); 
  const [prodata, setProdata] = useState({
    username: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
  });

  
  useEffect(() => {
    if (user) {
      
      setProdata({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProdata({ ...prodata, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.patch(`http://localhost:4000/users/${user.id}`, prodata);
      toast.success('Profile Updated');
      setUser(response.data);
      console.log("Profile Updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-700">
        Welcome, {prodata.username || "Guest User"}
      </h1>
      <div className="flex justify-center mb-8">
        <FaUserCircle className="text-gray-500" size={120} />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={prodata.username}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={prodata.email}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={prodata.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              id="gender"
              name="gender"
              value={prodata.gender}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            id="address"
            name="address"
            value={prodata.address}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 product-btn font-semibold rounded-md focus:outline-none"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
