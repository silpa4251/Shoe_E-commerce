import { createContext, useState, useEffect, useReducer } from "react"
import axios from "axios"
import CartReducer from "./CartReducer";

export const ProductContext = createContext();

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState ([]);
    const [cart,dispatch] = useReducer(CartReducer,[], () => {
        const saveCart = localStorage.getItem('cart');
        return saveCart ? JSON.parse(saveCart) : [];
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

    useEffect (() => {
        localStorage.setItem('cart',JSON.stringify(cart));
    })

    const getProductById = (id) => {
        return products.find(product => product.id === parseInt(id));
    };


    

    return (
        <ProductContext.Provider value={{products , getProductById, cart,dispatch}}>
            {children}
        </ProductContext.Provider>
    )
}
