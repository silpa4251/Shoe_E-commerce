import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductLists = ({ products }) => {
  const { dispatch, wishlist, addToWishlist, removeFromWishlist } = useContext(ProductContext);

  const handleCart = (product) => {
    dispatch({ type: 'Add', product });
  };

  return (
    <div className="max-w-7xl mx-auto my-8 px-4">
      <div className="flex flex-wrap -mx-4">
        {products.map((product) => {
          const isInWishlist = wishlist.some((item) => item.id === product.id);
          return (
            <div key={product.id} className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-48 w-full object-contain mb-4 products-image"
                  />
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700">Rs.{product.price}</p>
                </Link>
                <button
                  onClick={() => handleCart(product)}
                  className="mt-4 py-2 px-4 product-btn font-semibold rounded-lg transition duration-300"
                >
                  Add to Cart
                </button>
                <button
                  className="absolute top-4 right-4 text-red-700 hover:text-red-800 transition duration-300"
                  onClick={() => {
                    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
                  }}
                >
                  {isInWishlist ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductLists;
