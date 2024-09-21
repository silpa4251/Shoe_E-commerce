import { NavLink, Outlet } from "react-router-dom"



const Admin = () => {
    
  return (
    <div className="flex min-h-screen">
        <aside className="w-64 sidenav text-white p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
            <nav>
                <ul>
                    <li className="mb-2">
                        <NavLink to='/admin/dashboard' className="block p-2 rounded sidebar">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to='/admin/users' className="block p-2 rounded sidebar">
                            Users List
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to='/admin/productlist' className="block p-2 rounded sidebar">
                            Product List
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink to='/admin/orders' className="block p-2 rounded sidebar">
                            Orders
                        </NavLink>
                    </li>
                </ul>
                       
            </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
        </main>
    </div>
  )
}

export default Admin