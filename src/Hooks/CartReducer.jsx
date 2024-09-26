import { toast } from "react-toastify"

export const totalItem = (cart) => {
    return cart.length;
}

export const totalPrice = (cart) => {
    return cart.reduce((total, product) => total + product.quantity * product.price , 0)
}

export const totalWish = (wishlist) => {
    return wishlist.length;
}


const CartReducer = (state, action) => {
    switch(action.type) {
        case "Add":
            { const existingProductIndex = state.findIndex((p) => p.id === action.product.id && p.size === action.product.size);
            if (existingProductIndex >= 0) {
                const updatedState = state.map((product, index) =>
                    index === existingProductIndex
                        ? { ...product, quantity: Math.min(product.quantity + action.product.quantity,20 )}
                        : product
                );
                const existingProduct = state[existingProductIndex];
                toast.info(`${existingProduct.name}is already in the cart and quantity incremented!`,{toastId: "cartWarning", position: "top-center", autoClose: 2000});
                return updatedState;
            } else {
                toast.success(`${action.product.name}added to cart`,{toastId: "cartSucess",position: "top-center", autoClose: 2000});

                return [...state, action.product];
            } }

        case "Remove":
            return state.filter(p => p.id !== action.id);

        case "Increase":
            return state.map(p =>
                p.id === action.id && p.quantity < 20 ? { ...p, quantity: p.quantity + 1 } : p
            );

        case "Decrease":
            return state.map(p =>
                p.id === action.id ? { ...p, quantity: Math.max(p.quantity - 1, 1) } : p
            );
        case 'Set_Cart':
            return action.payload; 
        case 'Clear':
                return [];

        default: 
           return state;
    }
}

export default CartReducer