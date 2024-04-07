import React, { useState } from "react";

const ProductCards = ({ product }) => {
    const [cart, setCart] = useState([]);


    const addToCart = (productToAdd) => {
        setCart([...cart, productToAdd]);
    };

    return (
        <>
            <div className="product-card gap-2">
                <img src={product.image} alt="..." />
                <div className="product-card-details">
                <h2 className="font-bold">{product.price} sek</h2>
                <p className="card-text">{product.description}</p>
                <p className="font-bold">{product.name}</p>
                <div className="m-1 mt-0"> 
                    <a onClick={() => addToCart(product)} href="#" className="btn btn-primary button font-bold">KÖP</a>
                    </div>
                </div>
                </div>
            
        </>
        
    )
}

export default ProductCards;