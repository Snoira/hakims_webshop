import ProductCards from './ProductCards';


const RenderProductCards = ({ products }) => {

    return (
        <div>
            <p>Products</p>
            {products.map((product, i) => {
                return <ProductCards key={i} product={product} />
            })}
        </div>
    )
}

export default RenderProductCards;