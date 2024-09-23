import { createContext, useState, useEffect, useReducer } from "react"
import axios from "axios"
import CartReducer from "../Hooks/CartReducer"

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState ([]);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("loggedin"));
    const [user,setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;});
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
        } catch (error) {
            console.error('Error in fetching cart from server',error);
            dispatch({ type: 'Clear'});
        }
    };
    const logout = () => {
        localStorage.removeItem("loggedin");
        localStorage.removeItem("user");
        localStorage.removeItem(`cart_${user?.id}`);
        setIsAuthenticated(false);
        setUser(null);
        dispatch({ type: 'Clear' });

};


    

    return (
        <ProductContext.Provider value={{products , getProductById, cart,dispatch , login, logout , isAuthenticated,user, setUser}}>
            {children}
           

        </ProductContext.Provider>
    )
}


