
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { ProductProvider } from './Context/ProductContext'
import Men from './components/Products/Men'
import Women from './components/Products/Women'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Kids from './components/Products/Kids'
import SingleProduct from './Pages/SingleProduct'
import Cart from './Pages/Cart'
import CartProduct from './components/Cart/CartProduct'
import SearchPage from './Pages/SearchPage'
import PrivateRoute from './components/Route/PrivateRoute'
import CheckoutPage from './Pages/CheckoutPage'
import TermsofUse from './Pages/TermsofUse'
import PaymentPolicy from './Pages/PaymentPolicy'
import Return_Policy from './Pages/Return_Policy'
import Profile from './Pages/Profile'
import Admin from './components/Admin/Admin'
import Dashboard from './components/Admin/Dashboard'
import AllUsers from './components/Admin/AllUsers'
import UserDetails from './components/Admin/UserDetails'
import AllProduct from './components/Admin/AllProduct'
import Orders from './components/Admin/Orders'
import AdminRoute from './components/Route/AdminRoute'
import PageNotFound from './Pages/PageNotFound'
// import ProductLists from './Pages/ProductLists'

function App() {


  return (
    <>
      <ProductProvider>
        <Navbar />
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
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element= {<Login />} />
          <Route path='/register' element= {<Register />} />
          <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>}>
            <Route index element={<Dashboard />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='users' element={<AllUsers />} />
            <Route path='users/:id' element={<UserDetails />} />
            <Route path='productlist' element={<AllProduct />} />
            <Route path='orders' element={<Orders />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer/>
      </ProductProvider>
    </>
  )
}

export default App
