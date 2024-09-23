import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ProductLists from './ProductLists'
import { ProductContext } from "../../Context/ProductContext"

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('name');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { products } = useContext(ProductContext); 

  useEffect(() => {
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query, products]); 

  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {filteredProducts.length > 0 ? (
        <ProductLists products={filteredProducts} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchPage
