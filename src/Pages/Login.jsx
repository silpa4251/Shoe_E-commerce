import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { FaEye } from "react-icons/fa"
import { TbEyeClosed } from "react-icons/tb";
import { ProductContext } from "../Context/ProductContext";

const initialValue = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValue);
  const [showPass,setShowPass] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(ProductContext); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const togglePass = () => {
    setShowPass(!showPass);
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:4000/users');
      const users = response.data;
      const foundUser = users.find(
        (user) =>
          user.username === formData.username &&
          user.password === formData.password
      );
      if (foundUser) {
        localStorage.setItem("loggedin", "true"); 
        localStorage.setItem('auth', JSON.stringify(foundUser));
        login(foundUser); 
        if (foundUser.admin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError("Incorrect username or password.");
      }
    } catch (err) {
      console.error("Error fetching users", err);
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-login-bg login-page">
      <div className="relative p-8 login-back  bg-opacity-5 backdrop-blur-md shadow-lg rounded-lg max-w-sm w-full">
        <h2 className=" text-2xl font-bold login-head text-center mb-5">
          Good to see you Back..!
        </h2>
        {error && <p className="errmsg text-center mb-3">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block login-head text-sm mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your Username"
              className="w-full p-2  bg-opacity-20 login-input rounded-md focus:ring-2 focus:ring-red-900 outline-none"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block login-head text-sm mb-1">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              className="w-full p-2 bg-opacity-20 login-input rounded-md focus:ring-2 focus:ring-red-900 outline-none"
            />
            <span onClick={togglePass} className="absolute right-3 bottom-3 flex items-center cursor-pointer">
              {showPass ? <FaEye /> : <TbEyeClosed />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 product-btn rounded-md text-white font-semibold transition-colors duration-300 ease-in-out"
          >
            Login
          </button>
          <div className="register text-center mt-4">
            <Link to="/register" className="login-sub hover:underline">
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login
