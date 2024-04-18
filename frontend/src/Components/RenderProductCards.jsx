import ProductCards from './ProductCards';


const RenderProductCards = ({ products, openPopup }) => {

    return (
        <article>
            <div className="products">
                {products.map((product, i) => {
                    return <ProductCards key={i} product={product} openPopup={openPopup} />;
                })}
            </div>
        </article>
    )
}

export default RenderProductCards;