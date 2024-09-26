import "./Navbar.css"
import { FaBars, FaTimes } from "react-icons/fa"
import { IoIosCart } from "react-icons/io"
import { useContext, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { NavLink, useNavigate } from "react-router-dom"
import { FaUserCircle } from "react-icons/fa"
import { totalItem,totalWish } from "../../Hooks/CartReducer"
import { ProductContext } from "../../Context/ProductContext"
import { BsCalendarHeart } from "react-icons/bs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cart,logout,isAuthenticated,user,wishlist} = useContext(ProductContext);

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
    setShowConfirm(false);
    logout();
    navigate('/');
};
 
 const handleCancelLogout=()=>{
  setShowConfirm(false);
 }
 const handleLogoutClick = () => {
  setShowConfirm(true);
 }

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


          <div className="flex md:hidden items-center space-x-6">
          <div className="relative">
          <NavLink to="/wishlist">
              <BsCalendarHeart size={20} className="cart-icon" />
              <span className="absolute bottom-3 left-5 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {totalWish(wishlist)}
              </span>
            </NavLink>
            </div>
            <div className="relative">
            <NavLink to="/cart">
              <IoIosCart size={24} className="cart-icon" />
              <span className="absolute bottom-3 left-5 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {totalItem(cart)}
              </span>
            </NavLink>
            </div>
            
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
              onClick={handleLogoutClick}
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
             
              <NavLink to="/wishlist" className= "relative">
                <BsCalendarHeart size={20} className="cart-icon mt-2 navitems" />
                <span className="absolute bottom-6 left-4 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalWish(wishlist)}
                </span>
              </NavLink>
            
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
              <button onClick={handleLogoutClick} className=" navitems  px-3 py-2 rounded login-btn">
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


      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
        onClick={handleCancelLogout}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <FaTimes />
      </button>
          <h2 className="text-lg font-bold mb-4 text-center check-head">
            Are you sure you want to logout?
          </h2>
          <div className="flex justify-center">
            <button
              onClick={handleCancelLogout}
              className="bg-gray-500  text-white py-2 px-4 rounded hover:bg-gray-600 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      )}
    </nav>
  );
};

export default Navbar;
