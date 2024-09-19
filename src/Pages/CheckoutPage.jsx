import { useContext, useEffect, useState } from 'react';
import { totalItem, totalPrice } from '../Context/Hooks/CartReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext';

 const getProData =() => {
  const savedProfile = JSON.parse(localStorage.getItem("profile"));
  return savedProfile || [];
 }
const CheckoutPage = () => {
  const { cart,dispatch } = useContext(ProductContext);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();

  useEffect(() => {
    const profileData = getProData();
    if(profileData.address) {
      setAddress(profileData.address);
    }
  },[])

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    console.log('Order placed:', { cart, address, paymentMethod });
    toast.success('Order placed successfully!', {
      position: 'top-center',
      autoClose: 2000,
    })
    dispatch({ type: 'Clear'});
    setTimeout(() => {
      navigate('/');
    },2500);
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
        <form onSubmit={handleOrderSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-lg font-medium">Shipping Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-lg font-medium">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI payments">UPI payments</option>
              <option value="Net Banking">Net Banking</option>
            </select>
          </div>
          <div className="mb-6 border-t border-gray-200 pt-4">
            <p className="text-lg font-medium mb-2">Order Summary</p>
            <p className="text-lg font-medium">Total Items: <span className="font-semibold">{totalItem(cart)}</span></p>
            <p className="text-lg font-medium">Total Price: <span className="font-semibold">Rs. {totalPrice(cart).toFixed(2)}</span></p>
          </div>
          <button
            type="submit"
            className="w-full product-btn font-semibold py-3 px-4 rounded-lg shadow-md transition duration-300"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
