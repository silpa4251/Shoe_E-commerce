import ProductList from './ProductLists'
import ImageSlider from './ImageSilder'
import { useContext } from 'react'
import { ProductContext } from '../../Context/ProductContext'

const Women = () => {
  const { products } = useContext(ProductContext);
  const womenShoe = products.filter(product => product.category === 'Women');

  return (
    <div>
        <ImageSlider />
      <h1 className="text-2xl text-center font-semibold m-6 head-product">Women&apos;s Shoes</h1>
      <ProductList products={womenShoe} />
    </div>
  );
};

export default Women
