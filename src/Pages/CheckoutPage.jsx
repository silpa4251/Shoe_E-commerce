import { useContext, useEffect, useState } from 'react'
import { totalItem, totalPrice } from '../Hooks/CartReducer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../Context/ProductContext'
import axios from 'axios'



const CheckoutPage = () => {
  const { cart,user,dispatch } = useContext(ProductContext);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const navigate = useNavigate();

  useEffect(() => {
    if(user.username){
      setName(user.username);
    }
    if (user.address) {
      setAddress(user.address);
    }
    if(user.phone) {
      setPhone(user.phone);
    }
  }, [user]);

  const generateId = () => {
    return `Order-${new Date().getTime()}`;
  };
  

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const orderId = generateId();
    const newOrder = {
      orderId,
      shipping_Details:{ name,address,phone,state,pincode,paymentMethod,},
      totalItem: totalItem(cart),
      totalPrice:  totalPrice(cart).toFixed(2),
      orderDate: new Date().toString(),
      status: 'pending',
      ordered_Items : cart.map(item => ({
        Item_Name: item.name,
        Image : item.image_url,
        Size: item.size,
        Quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const updatedUser = {
        ...user,
        orders: user.orders ? [...user.orders, newOrder] : [newOrder], 
      };
  
    
      await axios.put(`http://localhost:4000/users/${user.id}`, updatedUser);
      toast.success('Order placed successfully!', {
        position: 'top-center',
        autoClose: 2000,
      });
      dispatch({type: 'Clear'});
      setTimeout(() => {
        navigate('/');
      }, 2500);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }

  };



  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center checkout">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="check-bgd shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 check-head">Shipping Information</h2>
          <form onSubmit={handleOrderSubmit}>
          <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className='flex gap-4 mb-6'>
              <div className='w-1/2'>
            
              <label className="block text-lg font-medium mb-2 text-gray-800">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-medium mb-2 text-gray-800">Pincode</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
                required
              />
            </div>
            </div>
            
            
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2 text-gray-800">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI payments">UPI payments</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Net Banking">Cash on delivery</option>
              </select>
            </div>
          </form>
        </div>


        <div className="check-bgd shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 check-head">Order Summary</h2>
          {cart.map((item, index) => (
            <div key={index} className="mb-4 flex items-center justify-between checkout-bgd">
              <div className="flex items-center">
                <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                <div>
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-medium check-head">Rs.{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t border-gray-500 pt-4 mt-4">
            <p className="text-lg text-right font-medium ">Total Items: <span className="font-semibold check-head">{totalItem(cart)}</span></p>
            <p className="text-lg text-right font-medium ">Total Price: <span className="font-semibold check-head">Rs.{totalPrice(cart).toFixed(2)}</span></p>
          </div>
          <button
            type="submit"
            onClick={handleOrderSubmit}
            className="w-full check-btn mt-6 font-semibold py-3 px-4  rounded-lg shadow-md"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage
