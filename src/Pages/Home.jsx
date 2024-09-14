import './Home.css'

import ImageSlider from "../components/Products/ImageSilder"
import ProductLists from "../components/Products/ProductLists"
import { useContext } from 'react'
import { ProductContext } from '../Context/ProductContext'
import Featured from '../components/Products/Featured'


 const Home = () => {
  const {products} = useContext(ProductContext);
  return (
    <>

      <ImageSlider />
      <Featured />
      <h1 className="text-2xl text-center font-semibold mb-8 head-product">Our products</h1>
      <ProductLists  products={products}/>
    </>
  )
}

export default Home
