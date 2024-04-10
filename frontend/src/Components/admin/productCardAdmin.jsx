//rafce
import { useState } from 'react'

const productCardAdmin = () => {
    const [editMode, setEditMode] = useState(false)

    return (
        <div className="product-card gap-2">
            <img src={product.imageURL} alt="..." />
            <div className="product-card-details">
                {!editMode ?
                    <>
                        <h2 className="font-bold">{product.price} sek</h2>
                        <p className="card-text">{product.description}</p>
                        <p className="font-bold">{product.name}</p>
                    </> :
                    <><label> Pris, kr:
                        <input type="text" value={product.price} />
                    </label>
                        <label> Beskrivning:
                            <input type="text" value={product.description} />
                        </label>
                        <label> namn:
                            <input type="text" value={product.name} />
                        </label>
                    </>
                }
                <div className="m-1 mt-0">
                    <a onClick={() => addToCart(product)} className="btn btn-primary button font-bold">KÖP</a>
                </div>

            </div>
        </div>
    )
}

export default productCardAdmin