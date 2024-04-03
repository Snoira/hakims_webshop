import ProductCards from './ProductCards';


const RenderProductCards = ({ products }) => {

    return (
        <article> 
        <div className="products">
            {products.map((product, i) => {
                return <ProductCards key={i} product={product} />
            })}
        </div>
        </article>
    )
}

export default RenderProductCards;