import ProductList from './ProductLists'
import ImageSlider from './ImageSilder'
import { useContext } from 'react'
import { ProductContext } from '../../Context/ProductContext'

const Men = () => {
  const { products } = useContext(ProductContext)
  const menShoe = products.filter(product => product.category === 'Men');

  return (
    <div>
        <ImageSlider />
      <h1 className="text-2xl text-center font-semibold m-6 head-product">Men&apos;s Shoes</h1>
      <ProductList products={menShoe} />
    </div>
  );
};

export default Men
