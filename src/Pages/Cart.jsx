import { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';
import CartProduct from '../components/Cart/CartProduct';
import { totalItem, totalPrice } from '../Context/CartReducer';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart } = useContext(ProductContext);
    const navigate=useNavigate();

    return (
        <div className="container mx-auto my-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {cart.length > 0 ? (
                        cart.map((p) => (
                            <CartProduct key={p.id} product={p} />
                        ))
                    ) : (
                        <div className='flex flex-col items-center'>
                        <p className="text-gray-600 text-2xl text-center mb-4" >Your cart is empty!</p>
                        <button onClick={() => navigate('/')} className="product-btn py-2 px-4 rounded-lg transition duration-300">Add products</button>
                        </div>
                
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
                        <div className="mb-6">
                            <p className="text-lg font-medium">Total Items: <span className="font-semibold">{totalItem(cart)}</span></p>
                            <p className="text-lg font-medium">Total Price: <span className="font-semibold">Rs. {totalPrice(cart).toFixed(2)}</span></p>
                        </div>
                        <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300">
                            Buy Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
