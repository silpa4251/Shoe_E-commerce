import { NavLink, Outlet, useNavigate } from "react-router-dom"
import logo from '../../assets/logo1.png'
import { MdSpaceDashboard,MdOutlineEditCalendar } from "react-icons/md"
import { FaUserEdit } from "react-icons/fa"
import { TiShoppingCart } from "react-icons/ti"
import { useContext } from "react"
import { ProductContext } from "../../Context/ProductContext"
import Breadcrumbs from "./Breadcrumbs"

const Admin = () => {
  const {logout} = useContext(ProductContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
};
  return (
    <div className="flex h-screen">
      <aside className="w-64 sidenav text-white p-4 ">
      
          <img src= {logo}  alt="logo" className="ml-5 w-40 h-40" />
          <h1 className="text-3xl font-bold mb-8">Admin panel</h1>
        

        <nav>
          <ul>
            <li className="mb-2">
              <NavLink to='/admin/dashboard' className="flex items-center p-2 rounded sidebar">
              <MdSpaceDashboard size={24} className="mr-2"/>
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to='/admin/users' className="flex items-center p-2 rounded sidebar">
              <FaUserEdit size={24} className="mr-2"/>
                Users List
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to='/admin/productlist' className="flex items-center p-2 rounded sidebar">
              <TiShoppingCart size={24} className="mr-2"/>
                Product List
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink to='/admin/orders' className="flex items-center p-2 rounded sidebar">
              <MdOutlineEditCalendar size={24} className="mr-2"/>
                Orders
              </NavLink>
            </li>
          </ul>
        </nav>
        <button 
          onClick={handleLogout} 
          className="mt-8 w-full check-btn p-2 rounded transition">
          Logout
        </button>
      </aside>
      <main className="flex-1 p-6 bg-gray-200 overflow-auto">
      <div className="p-6 bg-white shadow rounded-lg mt-2">
        <Breadcrumbs />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin
