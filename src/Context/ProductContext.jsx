import { createContext, useState, useEffect, useReducer } from "react"
import axios from "axios"
import CartReducer from "./Hooks/CartReducer";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState ([]);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("loggedin"));
    const [user,setUser] = useState(null);
    const [cart,dispatch] = useReducer(CartReducer,[], () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const savedCart = localStorage.getItem(`cart_${savedUser}`);
            return savedCart ? JSON.parse(savedCart) : [];
        }
        return [];
    })

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
            localStorage.setItem(`cart_${user}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    const getProductById = (id) => {
        return products.find(product => product.id === parseInt(id));
    };

    const login =(userInfo) => {
        localStorage.setItem("loggedin", true);
        localStorage.setItem("user",JSON.stringify(userInfo));
        setIsAuthenticated(true); 
        setUser(userInfo);
        const savedCart = localStorage.getItem(`cart_${userInfo.username}`);
        if(savedCart){
            dispatch({ type: 'Set_Cart', payload: JSON.parse(savedCart) });
        }
        else {
            dispatch({ type: 'Clear'});
        }

    };
    const logout = () => {
        localStorage.removeItem("loggedin");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
        dispatch({ type: 'Clear' });

};

// const isAdmin = user?.admin || false;

    

    return (
        <ProductContext.Provider value={{products , getProductById, cart,dispatch , login, logout , isAuthenticated,user}}>
            {children}
           

        </ProductContext.Provider>
    )
}


