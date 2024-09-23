import { NavLink, Outlet } from "react-router-dom"
import { MdSpaceDashboard,MdOutlineEditCalendar } from "react-icons/md"
import { FaUserEdit } from "react-icons/fa"
import { TiShoppingCart } from "react-icons/ti"

const Admin = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 sidenav text-white p-4 ">
        <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
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
      </aside>
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin
