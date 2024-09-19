import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import  { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa"
import { TbEyeClosed } from "react-icons/tb";


const Register = () => {
  const navigate = useNavigate();
  const initalValue = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initalValue);
  const [showPass,setShowPass] = useState(false);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const togglePass = () => {
    setShowPass(!showPass);
  }
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormError(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('http://localhost:4000/users', formData);
        alert("Registration successful");
        navigate('/login');
      } catch (error) {
        console.error("There was an error registering the user:", error);
      }
    }
  
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSubmit) {
      alert("Form submitted successfully");
    }
  }, [formError, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  return (
    <>
        <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-login-bg login-page"
      >
        <div className="relative p-8 login-back bg-opacity-5 backdrop-blur-md shadow-lg rounded-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold login-head text-center mb-6">
            Happy to see you..!
          </h2>
          <p className="font-bold login-head text-center mb-6">Let your feet do the talking</p>
          <form onSubmit={handleSubmit} className="space-y-4" >
            <div>
              <label
                htmlFor="username"
                className="block font-bold login-head text-sm mb-1"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your Username"
                className="w-full p-2 bg-opacity-20 login-input rounded-md focus:ring-2 focus:ring-red-900 outline-none"
              />
            </div>
            <p className="errmsg">{formError.username}</p>
            <div>
              <label
                htmlFor="email"
                className="block font-bold login-head text-sm mb-1"
              >
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your E-mail address"
                className="w-full p-2  bg-opacity-20 login-input rounded-md focus:ring-2 focus:ring-red-900 outline-none"
              />
            </div>
            <p className="errmsg">{formError.email}</p>
            <div className="relative">
              <label
                htmlFor="password"
                className="block font-bold login-head text-sm mb-1"
              >
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your Password"
                className="w-full p-2  bg-opacity-20 login-input rounded-md focus:ring-2 focus:ring-red-900 outline-none"
              />
               <span onClick={togglePass} className="absolute right-3 bottom-3 flex items-center cursor-pointer">
              {showPass ? <FaEye /> : <TbEyeClosed />}
            </span>
            </div>
            <p className="errmsg">{formError.password}</p>
            <button
              type="submit"
              className="w-full py-2 px-4 product-btn rounded-md text-white font-semibold transition-colors duration-300 ease-in-out"
            >
              Register
            </button>
            <div className="register text-center mt-4">
              <Link to="/login" className="login-sub hover:underline">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register