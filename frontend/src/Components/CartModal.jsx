const ShoppingCartmodal = () => {
    const cart = [];



    return (
        <>
        <div className="shopping-cart-modal">
            <div className="modal-header border-bottom-0">
                <h5 className="modal-title">Varukorg</h5>
            </div>

            {cart.length > 0 ? (
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index}>
                                <span>{item.name}</span>
                                <span>{item.price} kr</span>
                            </li>
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
