
import ImageSlider from "../components/Products/ImageSilder"
import ProductLists from "../components/Products/ProductLists"
import Featured from '../components/Products/Featured'
import { useContext } from 'react'
import { ProductContext } from '../Context/ProductContext'


 const Home = () => {
  const {products} = useContext(ProductContext);
  return (
    <>

      <ImageSlider />
      <Featured />
      <h1 className="text-2xl text-center font-semibold mb-8 head-product" id="products">Our products</h1>
      <ProductLists  products={products}/>
    </>
  )
}

export default Home
