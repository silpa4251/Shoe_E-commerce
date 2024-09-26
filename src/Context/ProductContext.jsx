import { createContext, useState, useEffect, useReducer } from "react"
import axios from "axios"
import CartReducer from "../Hooks/CartReducer"
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState ([]);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("loggedin"));
    const [user,setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;});
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem(`wishlist_${user?.id}`);
        return savedWishlist ? JSON.parse(savedWishlist) : [];
      });
   
    const [cart,dispatch] = useReducer(CartReducer,[],() =>{
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parseduser =JSON.parse(savedUser)
            const savedCart = localStorage.getItem(`cart_${parseduser.id}`);
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    });
        
        

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response= await axios.get('http://localhost:4000/products');
                setProducts(response.data);
            }
            catch(error) {
                console.error('Error fetching products :',error);
            }};
      fetchProducts();
    },[]);

    
    useEffect(() => {
        if (user) {
            
            const usercart = async () => {
                try {
                    await axios.patch(`http://localhost:4000/users/${user.id}` ,{cart});
                    localStorage.setItem(`cart_${user.id}`,JSON.stringify(cart));
                } catch (error) {
                    console.error('Error in updating cart on server',error);
                }
            };
            usercart();
        }
    }, [cart, user]);

    useEffect(() => {
        if (user) {
            localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
        }
    }, [wishlist, user]);

    const addToWishlist = async (product) => {
        if (!wishlist.find((item) => item.id === product.id)) {
            const updatedWishlist = [...wishlist,product];
          setWishlist(updatedWishlist);
          if (user) {
            try {
                await axios.patch(`http://localhost:4000/users/${user.id}`, { wishlist: updatedWishlist });
                toast.success("Added to wishlist");
            } catch (error) {
                console.error('Error updating wishlist on server:', error);
            }
        }
        }
      };

      const removeFromWishlist = async (productId) => {
        const updatedWishlist= wishlist.filter((item) => item.id !== productId);
        setWishlist(updatedWishlist);
        if (user) {
            try {
                await axios.patch(`http://localhost:4000/users/${user.id}`, { wishlist: updatedWishlist });
                toast.success("Removed from wishlist");
            } catch (error) {
                console.error('Error updating wishlist on server:', error);
            }
        }
      };

    const getProductById = (id) => {
        return products.find(product => product.id === parseInt(id));
    };

    const login = async (userInfo) => {
        localStorage.setItem("loggedin", true);
        localStorage.setItem("user",JSON.stringify(userInfo));
        setIsAuthenticated(true); 
        setUser(userInfo);

        try{
            const response = await axios.get(`http://localhost:4000/users/${userInfo.id}`);
            const usercart = response.data.cart || [];
            dispatch({ type: 'Set_Cart', payload: usercart });

            const userWishList = response.data.wishlist || [];
            setWishlist(userWishList);
        } catch (error) {
            console.error('Error in fetching cart from server',error);
            dispatch({ type: 'Clear'});
        }
    };
    const logout = () => {
        localStorage.removeItem("loggedin");
        localStorage.removeItem("user");
        localStorage.removeItem(`cart_${user?.id}`);
        localStorage.removeItem(`wishlist_${user?.id}`);
        setIsAuthenticated(false);
        setUser(null);
        dispatch({ type: 'Clear' });
        setWishlist([]);

};


    

    return (
        <ProductContext.Provider value={{products , getProductById, cart,dispatch , login, logout , isAuthenticated,user, setUser, wishlist, addToWishlist , removeFromWishlist}}>
            {children}
           

        </ProductContext.Provider>
    )
}


