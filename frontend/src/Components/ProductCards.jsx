import { useCartUpdate } from "../Context/Cart.contex";
import ReactDOM from 'react-dom';
import { useEffect, useState, useRef } from "react";


const ProductCards = ({ product }) => {
    const addToCart = useCartUpdate(product);
    const [infoPopup, setInfoPopup] = useState(false);
    const productInfoRef = useRef();

    const openPopup = () => {
        setInfoPopup(true);
        console.log(product)
    };

    const closePopup = () => {
        setInfoPopup(false);
    };

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
                <img src={product.imageURL} alt="..." onClick={openPopup} />
                <div className="product-card-details">
                    <p className="font-bold">{product.name}</p>
                    <h2 className="font-bold">{product.price.toLocaleString('de-DE', { minimumFractionDigits: 2 })} kr</h2>

                    <div className="m-1 mt-0">
                        <a onClick={() => addToCart(product)} className="btn btn-primary button font-bold">KÖP</a>
                    </div>
                </div>
            </div>
            {infoPopup &&
                ReactDOM.createPortal(
                    <div className="popup-overlay">
                        <div className="popup-content" ref={productInfoRef}>
                            <img className="img-prod" src={product.imageURL} alt="..." />
                            <div className="text-content">
                                <b>{product.name}</b>
                                <p>{product.amount}</p>
                                <p><b>Kategori: </b>{product.categoryName}</p>
                                <p><b>Pris: </b> {product.price} kr</p>
                                <b>Beskrivning:</b>
                                <p>{product.description}</p>
                                <b>Jämförelsepris:</b>
                                <p> {product.comparisonPrice} </p>
                                <b>Märke: </b> <br /> <p>{product.brand}</p>
                            </div>
                            <div className="m-1 mt-0 d-flex justify-content-around">
                                <a onClick={() => addToCart(product)} className="btn btn-primary button font-bold">KÖP</a>
                                <button onClick={closePopup}>Stäng</button>
                            </div>
                        </div>
                    </div>,
                    document.getElementById('popup-root')
                )
            }

        </>

    )
}

export default ProductCards;