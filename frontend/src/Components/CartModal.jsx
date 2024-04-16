import { useCart, useDeleteProduct, useChangeQuantity } from "../Context/Cart.contex";
import { useEffect } from "react";
import { Link }  from "react-router-dom";


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
                            <li className="cart-item" key={index}> 
                            <div className="cart-item-details">
                                <p className="item-name">{item.name}</p>
                                <div className="quantity-buttons">
                                    <button className="button-change btn-secondary btn-sm" onClick={() => changeQuantiy(item, "decrease")}>-</button>
                                    <strong className="item-quantity">{item.quantity}</strong>
                                <button className="button-change btn-secondary btn-sm" onClick={() => changeQuantiy(item, "increase")}>+</button>
                                 </div>
                                <p className="item-price"> {item.price}kr/st</p>
                                <button className="button-delete btn-danger btn-sm" onClick={() => deleteProductFromCart(item)}>Ta bort</button> 
                            </div>                            
                            </li>
                        ))}
                        <div className="checkout"> 
                        <strong>Total: {total} kr</strong>
                        <Link to="/checkout"  > 
                        <button className="btn btn-primary btn-sm" >Till Kassan</button>
                        </Link>
                        </div>
                    </ul>
                    
                ) : (
                    <p>Du har inte lagt till några varor!</p>
                )}
        
        </div>
        </>
    )
}

export default ShoppingCartmodal;
