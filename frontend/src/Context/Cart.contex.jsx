import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCartContext() {
    return useContext(CartContext);
}
 
export function DataProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart"));
        return storedCart || [];
    });

    const contextValue = {
        cart, 
        setCart
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
