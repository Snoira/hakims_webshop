//rafce
import { useState, useEffect } from 'react'
import axios from 'axios'

const ProductCardAdmin = ({ product, categoryList }) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(product.name)
    const [category, setCategory] = useState(product.category.name)
    const [price, setPrice] = useState(product.price)
    const [imageURL, setImageURL] = useState(product.imageURL)
    // const [description, setDescription] = useState(product.description)
    const [description, setDescription] = useState('')
    // const id = product._id
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`https://hakims-webshop-1.onrender.com/products/edit/${product._id}`, { name, category, price, imageURL, description }); // (params)${product._id}
            console.log("updated product:", res.data);
            if (res.status === 200) {
                setEditMode(false);
                setSuccessUpdate(true);
            }
        } catch (error) {
            console.error("Error updating product", error);
        }
    }

    const deleteProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.delete(`https://hakims-webshop-1.onrender.com/products/delete/${product._id}`);
            console.log("deleted product:", res.data);
            if (res.status === 200) {
                setEditMode(false);
                setSuccessDelete(true);
            }
        } catch (error) {
            console.error("Error deleting product", error);
        }
    }

    const handleNameChange = (e) => {
        const name = e.target.value; //input value
        setName(name)
        // const nameRegex = /^[a-zA-ZåäöÅÄÖ\s]*$/;
        // setName(nameRegex.test(name));
        //en godkänd sträng/input måste läggas in i setName(godkända Inputen)
      };

      const handlePriceChange = (e) => {
        const price = e.target.value;//input value
        setPrice(price)
        // const priceRegex = /^[a-zA-ZåäöÅÄÖ\s]*$/;
        // setPrice(priceRegex.test(price))
      };

      const handleDescriptionChange = (e) => {
        const desc = e.target.value; //input value
        setDescription(desc)
        // const descRegex = /^[a-zA-ZåäöÅÄÖ\s]*$/;
        // setDescription(descRegex.test(desc))
      };

      const handleImageURLChange = (e) => {
        const imageURL = e.target.value; //input value
        setImageURL(imageURL)
        // const imageURLRegex = /^[a-zA-ZåäöÅÄÖ\s]*$/;
        // setImageURL(imageURLRegex.test(imageURL))
      };

    return (
        <div className="product-card gap-2">
            <img src={imageURL} alt="..." />
            {editMode && <label> Bild URL:
                <input type="text" value={imageURL} onChange={(e) => handleImageURLChange(e)} />
            </label>
            }
            <div className="product-card-details">
                {!editMode ?
                    <>
                        <h2 className="font-bold">{price} sek</h2>
                        <p className="card-text">{description}</p>
                        <p className="font-bold">{name}</p>
                        <div className="m-1 mt-0">
                            <a onClick={() => { setEditMode(!editMode) }
                            } className="btn btn-primary button font-bold">Redigera</a>
                        </div>
                    </> :
                    <><label> Pris, kr:
                        <input type="text" value={price} onChange={(e) => handlePriceChange(e)} />
                    </label>
                        <label> Beskrivning:
                            <input type="text" value={description} onChange={(e) => handleDescriptionChange(e)} />
                        </label>
                        <label> namn:
                            <input type="text" value={name} max={50}  onChange={(e) => handleNameChange(e)} />
                        </label>
                        <label> Kategori:
                            <select name="category" id="category" placeholder="product category" onChange={(e) => setCategory(e.target.value)} >
                                <option value="">product category</option>
                                {categoryList.map((category, i) => (
                                    <option key={i} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </label>
                    </>
                }
                <div className="m-1 mt-0" style={{display: 'flex', justifyContent: 'space-around'}} >
                    <a onClick={() => {
                        // if (editMode) {
                            setName(product.name)
                            setCategory(product.category.name)
                            setPrice(product.price)
                            setImageURL(product.imageURL)
                            setDescription(product.description)
                            setEditMode(!editMode)
                        // }
                    }
                    } className="btn btn-primary button font-bold">Avbryt</a>
                    {editMode && <a onClick={updateProduct} className="btn btn-primary button font-bold">Uppdatera</a>}
                    {editMode && <a onClick={deleteProduct} className="btn btn-primary button font-bold">Ta bort</a>}
                </div>

            </div>
        </div>
    )
}

export default ProductCardAdmin