
import ProductList from './ProductLists';
import ImageSlider from '../../components/Products/ImageSilder';
import { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext';

const Kids = () => {
  const { products } = useContext(ProductContext);
  const kidShoe = products.filter(product => product.category === 'Kids');

  return (
    <div>
        <ImageSlider />
      <h1 className="text-2xl text-center font-semibold m-6 head-product">Kid&apos;s Shoes</h1>
      <ProductList products={kidShoe} />
    </div>
  );
};

export default Kids