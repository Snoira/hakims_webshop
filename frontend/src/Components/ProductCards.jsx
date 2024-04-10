import {useCartUpdate} from "../Context/Cart.contex";


const ProductCards = ({ product }) => {
const addToCart = useCartUpdate(product);


 
    return (
        <>
            <div className="product-card gap-2">
                <img src={product.imageURL} alt="..." />
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