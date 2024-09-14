
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
// import ProductLists from './Pages/ProductLists'

function App() {


  return (
    <>
      <ProductProvider>
        <Navbar />
        <Routes>
          <Route path='/' element = {<Home />} />
          <Route path='/men' element={<Men />} />
          <Route path='/women' element={<Women />} />
          <Route path='/kids' element={<Kids />} />
          <Route path='/products' element={<Home/> } />
          <Route path='/products/:id' element={<SingleProduct/>} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cartProducts' element={<CartProduct />} />

          <Route path='/login' element= {<Login />} />
          <Route path='/register' element= {<Register />} />
        </Routes>
        <Footer/>
      </ProductProvider>
    </>
  )
}

export default App
