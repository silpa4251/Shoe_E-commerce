import ProductList from './ProductLists';
import { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext';

const Featured = () => {
  const { products } = useContext(ProductContext);
  const allFeatured = products.filter(product => product.featured === true);

  return (
    <div>
      <h1 className="text-2xl  text-center font-semibold m-6 head-product">Our featured products</h1>
      <ProductList products={allFeatured} />
    </div>
  );
};

export default Featured