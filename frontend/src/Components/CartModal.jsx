import { useCartContext } from "../Context/Cart.contex";

const ShoppingCartmodal = () => {
    const { cart, setCart } = useCartContext();

     // spara produkt i localstorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);


    

      
    
const total = calculateTotal(cart);


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
                                <button className="btn-secondary btn-sm" onClick={() => changeQuantityCart(item, "decrease")}>-</button>
                                <p>{item.quantity}</p>
                                <button className="btn-success btn-sm" onClick={() => changeQuantityCart(item, "increase")}>+</button>
                                <p> {item.price}kr/st</p>
                                <button className="btn-danger btn-sm" onClick={() => deleteProductFromCart(item)}>Ta bort</button>
                            </div>                            
                            </div>
                        ))}
                        <p>Total: {total} kr</p>
                    </ul>
                    
                ) : (
                    <p>Du har inte lagt till några varor!</p>
                )}
        
        </div>
        </>
    )
}

export default ShoppingCartmodal;
