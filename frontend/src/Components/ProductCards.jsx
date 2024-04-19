import { useCartUpdate } from "../Context/Cart.contex";
import ReactDOM from 'react-dom';
import { useEffect, useState, useRef } from "react";


const ProductCards = ({ product, openPopup }) => {
    const addToCart = useCartUpdate();
    const [infoPopup, setInfoPopup] = useState(false);
    const productInfoRef = useRef();



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (productInfoRef.current &&
                !productInfoRef.current.contains(event.target)
            ) {
                setInfoPopup(false)
            }
        };

        const handleEscape = (event) => {
            if (event.keyCode === 27) {
                // Escape key code
                setInfoPopup(false);
            }
        };


        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <>
            <div className="product-card gap-2">
                <img style={{ maxWidth: '200px', maxHeight: '200px' }} src={product.imageURL} alt="..." onClick={() => openPopup(product)} />
                <div className="product-card-details">
                    <p className="font-bold">{product.name}</p>
                    <h2 className="font-bold">{product.price.toLocaleString('de-DE', { minimumFractionDigits: 2 })} kr</h2>

                    <div className="m-1 mt-0">
                        <a onClick={() => addToCart(product)} className="btn btn-primary button font-bold">KÖP</a>
                    </div>
                </div>
            </div>





        </>

    )
}

export default ProductCards;