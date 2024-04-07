import ProductCards from './ProductCards';


const RenderProductCards = ({ products, addToCart, cart }) => {

    return (
        <article> 
        <div className="products">
            {products.map((product, i) => {
                return <ProductCards key={i} product={product} addToCart={addToCart} cart={cart} />;
            })}
        </div>
        </article>
    )
}

export default RenderProductCards;