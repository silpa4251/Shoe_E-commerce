import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import  { useState, useEffect } from "react";


const Register = () => {
  const navigate = useNavigate();
  const initalValue = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initalValue);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit =  async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormError(errors);
    setIsSubmit(true);
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post('http://localhost:4000/users', formData);
        alert("Registration successful");
        navigate('/');
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
        <div className="relative p-8 bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg max-w-sm w-full">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Happy to see you..!
          </h2>
          <p className="font-bold text-white text-center mb-6">Let your feet do the talking</p>
          <form onSubmit={handleSubmit} className="space-y-4" >
            <div>
              <label
                htmlFor="username"
                className="block font-bold text-white text-sm mb-1"
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
            <p>{formError.username}</p>
            <div>
              <label
                htmlFor="email"
                className="block font-bold text-white text-sm mb-1"
              >
                E-Mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your E-mail address"
                className="w-full p-2 bg-white bg-opacity-20 text-white rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <p>{formError.email}</p>
            <div>
              <label
                htmlFor="password"
                className="block font-bold text-white text-sm mb-1"
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
            <p>{formError.password}</p>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition-colors duration-300 ease-in-out"
            >
              Register
            </button>
            <div className="register text-center mt-4">
              <Link to="/login" className="text-white hover:underline">
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