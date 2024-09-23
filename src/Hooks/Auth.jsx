import { useContext } from "react"
import { ProductContext } from "../Context/ProductContext"


export const useAuth =() => {
    const {isAuthenticated,user} = useContext(ProductContext);
    const isAdmin = user && user.admin == true;

    return {
        isAuthenticated,isAdmin,user
    };
};