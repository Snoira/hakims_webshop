

const ProductCards = ({ product }) => {
    return (
        // <>
        // <p>test</p>
        //     <div className="card" style="width: 18rem;">
        //         <img src={product.image} className="card-img-top" alt="..." />
        //         <div className="card-body">
        //             <h5 className="card-title">{product.title}</h5>
        //             <p className="card-text">{product.description}</p>
        //             <a href="#" className="btn btn-primary">Go somewhere</a>
        //         </div>
        //     </div>
        // </>
        <div>

            <p>{product.name}</p>
        </div>
    )
}

export default ProductCards;