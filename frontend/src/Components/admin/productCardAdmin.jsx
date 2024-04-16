//rafce
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup";

const ProductCardAdmin = ({ product, categoryList }) => {
    const [editMode, setEditMode] = useState(false)
    const id = product._id
    // const [successUpdate, setSuccessUpdate] = useState(false)
    // const [successDelete, setSuccessDelete] = useState(false)

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "Too short")
            .max(50, "Too long")
            .required("Required")
            .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed")
            .matches(/^[\p{L}\p{N}\p{P}\p{Z}]*$/gu, "Emojis are not allowed"),
        category: Yup.string()
            .required("Required"),
        price: Yup.number()
            .required("Required"),
        imageURL: Yup.string()
            .required("Required")
            .url("Invalid URL"),
    });

    const formik = useFormik({
        initialValues: {
            name: `${product.name}`,
            // category: `${product.category.name}`,
            category: "",
            price: `${product.price}`,
            imageURL: `${product.imageURL}`,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            await createProduct(values)
            setSubmitting(false)
            console.log(values);
        },
    })


    const updateProduct = async (values) => {
        // e.preventDefault();
        const { name, category, price, imageURL, description } = values
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

    return (
        <div className="product-card gap-2">
            <img src={product.imageURL} alt="..." />
            <div className="product-card-details">
                {!editMode ?
                    <>
                        <h2 className="font-bold">{product.price} sek</h2>
                        {/* <p className="card-text">{description}</p> */}
                        <p className="font-bold">{product.name}</p>
                        <div className="m-1 mt-0">
                            <a onClick={() => { setEditMode(!editMode) }
                            } className="btn btn-primary button font-bold">Redigera</a>
                        </div>
                    </> :
                    <form onSubmit={formik.handleSubmit}>
                        <label> Bild URL:
                            <input type="text" id='imageURL' {...formik.getFieldProps('imageURL')} />
                            {formik.touched.imageURL && formik.errors.imageURL ? (
                                <div>{formik.errors.imageURL}</div>
                            ) : null}
                        </label>
                        <label> Pris, kr:
                            <input type="text" id='price' placeholder={formik.values.category} {...formik.getFieldProps('price')} />
                            {formik.touched.price && formik.errors.price ? (
                                <div>{formik.errors.price}</div>
                            ) : null}
                        </label>
                        {/* <label> Beskrivning:
                            <input type="text" id='description' {...formik.getFieldProps('description')} />
                            {formik.touched.description && formik.errors.description ? (
                                <div>{formik.errors.description}</div>
                            ) : null}
                        </label> */}
                        <label> namn:
                            <input type="text" id='name' placeholder={formik.values.name} {...formik.getFieldProps('name')} />
                        </label>
                        <label> Kategori:
                            <select name="category" id="category" onChange={formik.handleChange} >
                                <option value="">product category</option>
                                {categoryList.map((category, i) => (
                                    <option key={i} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                            <button type='submit' className="btn btn-primary button font-bold" > update product </button>
                            <button className="btn btn-primary button font-bold" onClick={() => { setEditMode(!editMode) }} > Avbryt </button>
                            <button className="btn btn-primary button font-bold" onClick={deleteProduct} >Ta Bort</button>
                        </div>
                    </form>
                }

            </div>
        </div>
    )
}

export default ProductCardAdmin