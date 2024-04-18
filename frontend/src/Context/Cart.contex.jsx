import React, { useState, useContext } from "react";

// skapar context props (oklart vad det kallas/Elin)
const CartContext = React.createContext();
const CartUpdateContext = React.createContext();
const DeleteProductFromCart = React.createContext();
const CartUpdateQuantity = React.createContext();




// funktion för att kunna använda kundkorgsdatan, alltså själva arrayen som finns i CartContex
export function useCart() {
    return useContext(CartContext);
}

// funktion för att kunna använda funktionen "addTocart" 
export function useCartUpdate() {
    return useContext(CartUpdateContext);
}

export function useDeleteProduct() {
    return useContext(DeleteProductFromCart);
}

export function useChangeQuantity() {
    return useContext(CartUpdateQuantity);
}


 
// Huvud-context-komponent som innehåller data och funktioner, dvs kundvagnsarray + tillhörande funktioner
export function CartProvider( {children } ) {
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : []);
    const [showCartModal, setShowCartModal] = useState(false);


     const addToCart = (productToAdd) => {
       const existingProductIndex = cart.findIndex(
         (item) => item.name === productToAdd.name
       );
       if (existingProductIndex !== -1) {
         const updatedCart = [...cart];
         updatedCart[existingProductIndex].quantity += 1;
         setCart(updatedCart);
         localStorage.setItem("cart", JSON.stringify(updatedCart));
       } else {
         const updatedCart = [...cart, { ...productToAdd, quantity: 1 }];
         setCart(updatedCart);
         localStorage.setItem("cart", JSON.stringify(updatedCart));
       }
     };

        const deleteFromCart = (productToRemove) => {
            const updatedCart = cart.filter(item => item.name !== productToRemove.name);
            setCart(updatedCart);
        }
 

        const changeQuantityCart = (product, change) => {
            const updatedCart = [...cart];
            const index = updatedCart.findIndex(item => item.name === product.name);
            if (index !== -1) {
                if (change === "increase") {
                  updatedCart[index].quantity += 1;
                } else if (change === "decrease") {
                    if (updatedCart[index].quantity === 1) {
                        updatedCart.splice(index, 1);
                    } else {
                        updatedCart[index].quantity -= 1;
                    }
                }
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
                console.log(cart);
              }
          }

        



    return (
        // Skickar ovan data och funktioner till alla "barnkomponenter"
        <CartContext.Provider value={cart}>
        <CartUpdateContext.Provider value={addToCart}> 
        <DeleteProductFromCart.Provider value={deleteFromCart}> 
        <CartUpdateQuantity.Provider value={changeQuantityCart}>
            {children}
        </CartUpdateQuantity.Provider>
        </DeleteProductFromCart.Provider>
        </CartUpdateContext.Provider>
        </CartContext.Provider>

    );
}
