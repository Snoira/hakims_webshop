import { useCart, useDeleteProduct, useChangeQuantity } from "../Context/Cart.contex";
import { useEffect } from "react";


const ShoppingCartmodal = () => {
    const cart = useCart();
    const deleteProductFromCart = useDeleteProduct();
    const changeQuantiy = useChangeQuantity();

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
      }, [cart]);

      const calculateTotal = (cart) => {
        if (cart.length === 0) {
          return 0;
        }
      
        const total = cart.reduce((accumulator, currentItem) => {
          return accumulator + (currentItem.price * currentItem.quantity);
        }, 0);

        const formatTotal = total.toFixed(2);
      
        return formatTotal.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      };

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
                                <button className="btn-secondary btn-sm" onClick={() => changeQuantiy(item, "decrease")}>-</button>
                                <p>{item.quantity}</p>
                                <button className="btn-success btn-sm" onClick={() => changeQuantiy(item, "increase")}>+</button>
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
