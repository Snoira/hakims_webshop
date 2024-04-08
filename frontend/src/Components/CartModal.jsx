const ShoppingCartmodal = ({ cart }) => {
    



    return (
        <>
        <div className="shopping-cart-modal">
            <div className="modal-header border-bottom-0">
                <h5 className="modal-title">Varukorg</h5>
            </div>

            {cart.length > 0 ? (
                    <ul className="cart-list">
                        {cart.map((item, index) => (
                            <div> 
                            <div className="cart-item-details" key={index}>
                                <p>{item.name}</p>
                                <button className="btn-secondary btn-sm">-</button>

                               
                                
                                <p>{item.quantity}</p>
                                <button className="btn-success btn-sm">+</button>
                                <p> {item.price} kr</p>
                                <button className="btn-danger btn-sm">Ta bort</button>
                            </div>
                            </div>
                        ))}
                    </ul>
                ) : (
                    <p>Du har inte lagt till några varor!</p>
                )}
        
        </div>
        </>
    )
}

export default ShoppingCartmodal;
