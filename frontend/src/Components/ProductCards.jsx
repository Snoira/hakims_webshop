import React, { useState } from "react";
import { useCartContext } from "../Context/Cart.contex";

const ProductCards = ({ product }) => {
    
    // const { cart, setCart } = useCartContext();
    

    // const addToCart = (product) => {
    //     const existingProductIndex = cart.findIndex((item) => item.name === product.name);
    //     if (existingProductIndex !== -1) {
    //         const updatedCart = [...cart];
    //         updatedCart[existingProductIndex].quantity += 1;
    //         setCart(updatedCart, () => {
    //             localStorage.setItem('cart', JSON.stringify(cart));
    //         });
    //       } else {
    //         const updatedCart = [...cart, { ...product, quantity: 1 }];
    //         setCart(updatedCart, () => {
    //             localStorage.setItem('cart', JSON.stringify(cart))
    //         });
    //       }
    //     };
   

    return (
        <>
            <div className="product-card gap-2">
                <img src={product.image} alt="..." />
                <div className="product-card-details">
                <h2 className="font-bold">{product.price} sek</h2>
                <p className="card-text">{product.description}</p>
                <p className="font-bold">{product.name}</p>
                <div className="m-1 mt-0"> 
                    <a onClick={() => addToCart(product)} className="btn btn-primary button font-bold">KÖP</a>
                    </div>
                </div>
                </div>
            
        </>
        
    )
}

export default ProductCards;