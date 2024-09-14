import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import  { useState } from "react";
const initalValue = {
  username: "",
  password: "",
};
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initalValue);
  const [error, setError] = useState("");
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.get('http://localhost:4000/users');
      const users = response.data;
      const foundUser = users.find(
        (user) => 
          user.username === formData.username && 
          user.password === formData.password
      );
      if (foundUser) {
        localStorage.setItem("loggedin", true);
        navigate('/');
      } else {
        setError("Incorrect username or password.");
      }
    }
    catch (err) {
      console.error("Error fetching users", err);
      setError("An error occurred while logging in. Please try again.");
    }
  };
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-login-bg login-page"
      >
        <div className="relative p-8 bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Good to see you Back..!
          </h2>
          {error && <p className="errmsg text-center">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-white text-sm mb-1"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your Username"
                className="w-full p-2 bg-white bg-opacity-20 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm mb-1"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="w-full p-2 bg-white bg-opacity-20 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition-colors duration-300 ease-in-out"
            >
              Login
            </button>
            <div className="register text-center mt-4">
              <Link to="/register" className="text-white hover:underline">
                Don&apos;t have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login
