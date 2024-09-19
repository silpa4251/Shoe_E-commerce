import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";


const CartProduct = ({ product }) => {
  const { cart, dispatch } = useContext(ProductContext);

  const Increase = (id) => {
    dispatch({ type: "Increase", id });
  };

  const Decrease = (id) => {
    dispatch({ type: "Decrease", id });
  };

  const removeProduct = (id) => {
    dispatch({ type: "Remove", id });
  };

  const productInCart = cart.find((p) => p.id === product.id);
  const quantity = productInCart ? productInCart.quantity : 0;

  return (
    <div className="flex items-center border border-gray-300 p-4 mb-4 rounded-lg shadow-sm">
      <img 
        src={product.image_url} 
        className="w-24 h-24 object-contain rounded-md" 
        alt={product.name} 
      />
      
      <div className="ml-6 flex-1">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h4>
        <h5 className="text-xl font-semibold text-green-600 mb-4">${product.price.toFixed(2)}</h5>

        <div className="flex items-center space-x-4 border border-red-200 bg-gray-200 w-24">
          <button
            className="bg-gray-200 text-gray-800 rounded w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-300"
            onClick={() => Decrease(product.id)}
            aria-label={`Decrease quantity of ${product.name}`}
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="bg-gray-200 text-gray-800 rounded w-8 h-8 flex items-center justify-center font-bold hover:bg-gray-300"
            onClick={() => Increase(product.id)}
            aria-label={`Increase quantity of ${product.name}`}
          >
            +
          </button>
        </div>

        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          onClick={() => removeProduct(product.id)}
          aria-label={`Remove ${product.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartProduct;

