import React from 'react';
import ReactDOM from 'react-dom';

const ProductPopup = ({ product, closePopup }) => {
    return (
        <>
            {
                product && ReactDOM.createPortal(
                    <div className="popup-overlay">
                        <div className="popup-content card">
                            <div className="popup-header">
                                {product.imageURL && <img className="img-prod" src={product.imageURL} alt="..." />}
                                <div className="product-details">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p> {product.amount}</p>
                                    <p><b>Pris:</b> {product.price} kr</p>
                                    <p><b>Jämförelsepris:</b> {product.comparisonPrice}</p>
                                    <p><b>Kategori:</b> {product.category.name}</p>
                                </div>
                            </div>
                            <hr className="popup-divider" />
                            <div className="popup-body">
                                <p><b>Beskrivning:</b> {product.description}</p>
                                <p><b>Märke:</b> {product.brand}</p>
                            </div>
                            <div className="popup-footer">
                                {/* Lägg till den nödvändiga funktionen för att lägga till produkten i varukorgen här */}
                                <button onClick={() => addToCart(product)} className="btn btn-primary">KÖP</button>
                                <button onClick={closePopup} className="btn btn-secondary">Stäng</button>
                            </div>
                        </div>
                    </div>,
                    document.getElementById('popup-root')
                )
            }
        </>
    );
}

export default ProductPopup;
