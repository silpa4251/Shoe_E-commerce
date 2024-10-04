import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Login/Register'
import Home from './Pages/Home'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ProductProvider } from './Context/ProductContext'
import Men from './components/Products/Men'
import Women from './components/Products/Women'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Kids from './components/Products/Kids'
import SingleProduct from './components/Products/SingleProduct'
import Cart from './Pages/Cart'
import CartProduct from './components/Cart/CartProduct'
import SearchPage from './components/Products/SearchPage'
import PrivateRoute from './components/Route/PrivateRoute'
import CheckoutPage from './Pages/CheckoutPage'
import TermsofUse from './components/Policies/TermsofUse'
import PaymentPolicy from './components/Policies/PaymentPolicy'
import Return_Policy from './components/Policies/Return_Policy'
import Profile from './components/Login/Profile'
import Admin from './components/Admin/Admin'
import Dashboard from './components/Admin/Dashboard'
import AllUsers from './components/Admin/AllUsers'
import UserDetails from './components/Admin/UserDetails'
import AllProduct from './components/Admin/AllProduct'
import Orders from './components/Admin/Orders'
import AdminRoute from './components/Route/AdminRoute'
import PageNotFound from './Pages/PageNotFound'
import AddProducts from './components/Admin/AddProducts'
import EditProduct from './components/Admin/EditProduct'
import OrderDetails from './components/Admin/OrderDetails'
import WishList from './components/WishList/WishList'
import { useAuth } from './Hooks/Auth'


function App() {

  return (
    <>
      <ProductProvider>
       <NavbarConditional />
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/terms' element={<TermsofUse />} />
          <Route path='/policy' element={<PaymentPolicy />} />
          <Route path='/returns' element={<Return_Policy />} />
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women />} />
          <Route path='/kids' element={<Kids />} />
          <Route path='/products' element={<Home/> } />
          <Route path='/products/:id' element={<SingleProduct/>} />
          <Route path='/search' element={<SearchPage />} />
          <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
          <Route path="/cartProducts" element={<PrivateRoute element={<CartProduct />} />} />
          <Route path="/checkout" element={<PrivateRoute element={<CheckoutPage />} />} /> 
          <Route path='/wishlist' element={<PrivateRoute element={<WishList />} />} /> 
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element= {<Login />} />
          <Route path='/register' element= {<Register />} />
          <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<AllUsers />} />
            <Route path='users/:id' element={<UserDetails />} />
            <Route path='productlist' element={<AllProduct />} />
            <Route path='productlist/:id' element={<EditProduct />} />
            <Route path='add-product' element={<AddProducts />} />
            <Route path='orders' element={<Orders />} />
            <Route path='orders/:userId/:orderId' element={<OrderDetails />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <FooterConditional />
      </ProductProvider>
    </>
  )
}

const NavbarConditional = () => {
  const { isAdmin } = useAuth();
  return !isAdmin && <Navbar />;
};

const FooterConditional = () => {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const noFooter = ["/login","/register"];
  return (!isAdmin && !noFooter.includes(location.pathname)) && <Footer />;
};

export default App
