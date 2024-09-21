import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"
import { totalItem } from "../../Context/Hooks/CartReducer";
import { ProductContext } from "../../Context/ProductContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cart,logout,isAuthenticated,user} = useContext(ProductContext);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?name=${encodeURIComponent(search.trim())}`);
    }
  };
  const handleLogout = () => {
    logout();
    navigate('/');
};

  return (
    <nav className="bg-white-800 p-4 sticky top-0 z-50 bg-white">
      <div className=" mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className="flex items-center  text-xl font-bold"
          id="brand-name"
        >
          <img src="/src/assets/logo.png" alt="logo" className="h-10 mr-2" />
          STEP WHISPER
        </NavLink>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex relative search-input">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <input
                type="search"
                placeholder="Search for products..."
                value={search}
                onChange={handleSearch}
                className="w-full max-w-xs px-4 py-2 border rounded-md searchbar"
              />
              <button
                type="submit"
                className="absolute right-3 top-2"
                aria-label="Search"
              >
                <IoSearch size={24} className="search-pic" />
              </button>
            </form>
          </div>
          <div className="flex md:hidden items-center space-x-6 relative">
           
            <NavLink to="/cart">
              <IoIosCart size={24} className="cart-icon" />
              <span className="absolute top-0 left-5 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {totalItem(cart)}
              </span>
            </NavLink>
            {!isAuthenticated ? (
              
            <button
              onClick={() => navigate('/login')}
              className="block navitems px-3 py-2 login-btn"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-4">
                       
            
            <button
              onClick={handleLogout}
              className="block navitems px-3 py-2 login-btn"
            >
              Logout
            </button>
            <NavLink to="/profile" className="hover:underline">
                        <FaUserCircle size={30}  className="text-gray-600"/>
                        </NavLink>
            </div>
          )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
              id="navbtn"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          <div className="hidden md:flex space-x-4 ">
            <NavLink to={"/"} className=" navitems  px-3 py-2 rounded">
              Home
            </NavLink>
            {["Men", "Women", "Kids"].map((item, id) => (
              <NavLink
                key={id}
                to={`/${item.toLocaleLowerCase()}`}
                className=" navitems  px-3 py-2 rounded"
              >
                {item}
              </NavLink>
            ))}
             {user && user.admin && (
              <NavLink to={"/admin"} className=" navitems  px-3 py-2 rounded">
              Admin Dashboard
            </NavLink>
            )}
            
              <NavLink to="/cart" className= "relative">
                <IoIosCart size={24} className="cart-icon mt-2 navitems" />
                <span className="absolute bottom-6 left-4 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItem(cart)}
                </span>
              </NavLink>
              {!isAuthenticated ? (
            <button onClick={() => navigate('/login')} className=" navitems  px-3 py-2 rounded login-btn">
              Login
            </button>
              ) : (
            <div className="flex items-center space-x-4">
              <button onClick={handleLogout} className=" navitems  px-3 py-2 rounded login-btn">
                Logout
              </button>
             <NavLink to="/profile" className="hover:underline">
              <FaUserCircle size={30}  className="text-gray-600"/>
             </NavLink>
            </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 py-2 ">
          <div className="relative search-input">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={search}
                onChange={handleSearch}
                className="w-full px-3 py-2 border rounded-md searchbar"
              />
              <button
                type="submit"
                className="absolute right-3 top-2"
                aria-label="Search"
              >
                <IoSearch size={24} className="text-gray-400 search-pic" />
              </button>
            </form>
          </div>
          <NavLink
            to={"/"}
            onClick={() => setIsOpen(false)}
            className="block navitems px-3 py-2 navitems "
          >
            Home
          </NavLink>
          {["Men", "Women", "Kids"].map((item, id) => (
            <NavLink
              key={id}
              to={`/${item.toLowerCase()}`}
              onClick={() => setIsOpen(false)}
              className="block navitems px-3 py-2 navitems "
            >
              {item}
            </NavLink>
          ))}
          {user && user.admin && (
              <NavLink to={"/admin"} className=" block navitems px-3 py-2 navitems">
              Admin Dashboard
            </NavLink>
            )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
