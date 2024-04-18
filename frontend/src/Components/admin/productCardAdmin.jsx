//rafce
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../../Styles/productCardAdmin.module.css?module'

const ProductCardAdmin = ({ product, categoryList, categoryId }) => {
    const [editMode, setEditMode] = useState(false)
    const [description, setDescription] = useState(product.description)
    const id = product._id
    const { _id } = product.category

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "Too short")
            .max(50, "Too long")
            .required("Required")
            .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed")
            .matches(/^[\p{L}\p{N}\p{P}\p{Z}]*$/gu, "Emojis are not allowed"),
        category: Yup.string()
            .required("Required"),
        brand: Yup.string()
            .required("Required"),
        amount: Yup.string()
            .required("Required"),
        price: Yup.number()
            .required("Required"),
        comparisonPrice: Yup.string()
            .required("Required"),
        imageURL: Yup.string()
            .required("Required")
            .url("Invalid URL"),
    });

    const formik = useFormik({
        initialValues: {
            name: `${product.name}`,
            category: _id,
            brand: `${product.brand}`,
            price: `${product.price}`,
            amount: `${product.amount}`,
            comparisonPrice: `${product.comparisonPrice}`,
            imageURL: `${product.imageURL}`,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            await updateProduct(values)
            setSubmitting(false)
            console.log(values);
        },

    })

    const updateProduct = async (values) => {
        const { name, category, brand, amount, price, comparisonPrice, imageURL, description } = values
        try {
            const res = await axios.put(`https://hakims-webshop-1.onrender.com/products/edit/${product._id}`, { name, category, brand, amount, price, comparisonPrice, imageURL, description }); // (params)${product._id}
            console.log("updated product:", res.data);
            if (res.status === 200) {
                setEditMode(false);
                successUpdate(name)
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
                successDelete(product.name)
            }
        } catch (error) {
            console.error("Error deleting product", error);
        }
    }

    const successUpdate = (product) => toast.success(`Product: ${product}, successfully updated!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const successDelete = (product) => toast.success(`Product: ${product}, successfully deleted!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const formikError = (err) => toast.error(`Oh, no! : ${err}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    })

    return (
        <>
            <div className='card mb-3' >
                <div className='row g-0'>
                    <div className='col-sm-4'>
                        <img src={product.imageURL} alt="..." style={{ maxWidth: '300px', objectFit: 'contain' }} />
                    </div>
                    <div className='col-sm-8'>
                        {!editMode ?
                            <div className='card-body'>
                                <h4 className="card-title, font-bold">{product.name}</h4>
                                <div className='row'>
                                    <div className='col'>
                                        <p className="font-bold">{product.brand}</p>
                                        <p className="font-bold">{product.category.name}</p>
                                    </div>
                                    <div className='col'>
                                        <p className="font-bold">{product.amount}</p>
                                        <p className="font-bold">{product.price} sek</p>
                                        <p className="font-bold">{product.comparisonPrice}</p>
                                    </div>

                                </div>
                                <p className="card-text">{product.description}</p>
                                <button className="btn btn-primary button font-bold" onClick={() => { setEditMode(!editMode) }} >Redigera</button>
                            </div>
                            :
                            <div className='card-body'>
                                <form onSubmit={formik.handleSubmit}>
                                    <label> namn:
                                        <input type="text" id='name' placeholder={formik.values.name}
                                            className="card-title, font-bold" {...formik.getFieldProps('name')} />
                                        {(formik.touched.name && formik.errors.name) && formikError(formik.errors.name)}
                                    </label>
                                    <div className='row'>
                                        <div className='col'>
                                            <label> Märke:
                                                <input type="text" id='brand' placeholder={formik.values.brand} {...formik.getFieldProps('brand')} />
                                                {(formik.touched.brand && formik.errors.brand) && formikError(formik.errors.brand)}
                                            </label>
                                            <label> Kategori:
                                                <select name="category" id="category" onChange={formik.handleChange} >
                                                    <option value={_id}>{product.category.name}</option>
                                                    {categoryList.map((category, i) => (
                                                        <option key={i} value={category._id}>{category.name}</option>
                                                    ))}
                                                </select>
                                            </label>
                                            <label> Bild URL:
                                                <input type="text" id='imageURL' {...formik.getFieldProps('imageURL')} />
                                                {(formik.touched.imageURL && formik.errors.imageURL) && formikError(formik.errors.imageURL)}
                                            </label>
                                        </div>
                                        <div className='col'>
                                        <label> Mängd:
                                                <input type="text" id='amount' placeholder={formik.values.amount} {...formik.getFieldProps('amount')} />
                                                {(formik.touched.amount && formik.errors.amount) && formikError(formik.errors.amount)}
                                            </label>
                                            <label> Pris, kr:
                                                <input type="text" id='price' placeholder={formik.values.category} {...formik.getFieldProps('price')} />
                                                {(formik.touched.price && formik.errors.price) && formikError(formik.errors.price)}
                                            </label>
                                            <label> Jämförspris:
                                                <input type="text" id='comparisonPrice' placeholder={formik.values.comparisonPrice} {...formik.getFieldProps('pricomparisonPricece')} />
                                                {(formik.touched.comparisonPrice && formik.errors.comparisonPrice) && formikError(formik.errors.comparisonPrice)}
                                            </label>
                                        </div>

                                        <label> Beskrivning:
                                            <textarea id='description' placeholder={product.description} {...formik.getFieldProps('description')} />
                                            {(formik.touched.description && formik.errors.description) && formikError(formik.errors.description)}
                                        </label>

                                    </div>



                                    <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                                        <button type='submit' className="btn btn-primary button font-bold" > update product </button>
                                        <button className="btn btn-primary button font-bold" onClick={() => { setEditMode(!editMode) }} > Avbryt </button>
                                        <button className="btn btn-primary button font-bold" onClick={deleteProduct} >Ta Bort</button>
                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
        // <>
        //     <div className="product-card gap-2">
        //         <img src={product.imageURL} alt="..." />
        //         <div className="product-card-details">
        //             {!editMode ?
        //                 <>
        //                     <p className="font-bold">{product.name}</p>
        //                     <p className="font-bold">{product.price} sek</p>
        //                     <p className="card-text">{product.description}</p>
        //                     <p className="font-bold">{product.category.name}</p>
        //                     <p className="font-bold">{product.brand}</p>
        //                     <p className="font-bold">{product.comparisonPrice}</p>
        //                     <p className="font-bold">{product.amount}</p>
        //                     <div className="m-1 mt-0">
        //                         <a onClick={() => { setEditMode(!editMode) }
        //                         } className="btn btn-primary button font-bold">Redigera</a>
        //                     </div>
        //                 </> :
        //                 <form onSubmit={formik.handleSubmit}>
        //                     <label> Bild URL:
        //                         <input type="text" id='imageURL' {...formik.getFieldProps('imageURL')} />
        //                         {formik.touched.imageURL && formik.errors.imageURL ? (
        //                             <div>{formik.errors.imageURL}</div>
        //                         ) : null}
        //                     </label>
        //                     <label> Pris, kr:
        //                         <input type="text" id='price' placeholder={formik.values.category} {...formik.getFieldProps('price')} />
        //                         {formik.touched.price && formik.errors.price ? (
        //                             <div>{formik.errors.price}</div>
        //                         ) : null}
        //                     </label>
        //                     <label> Beskrivning:
        //                     <input type="text" id='description' {...formik.getFieldProps('description')} />
        //                     {formik.touched.description && formik.errors.description ? (
        //                         <div>{formik.errors.description}</div>
        //                     ) : null}
        //                 </label>
        //                     <label> namn:
        //                         <input type="text" id='name' placeholder={formik.values.name} {...formik.getFieldProps('name')} />
        //                     </label>
        //                     <label> Kategori:
        //                         <select name="category" id="category" onChange={formik.handleChange} >
        //                             <option value={_id}>{product.category.name}</option>
        //                             {categoryList.map((category, i) => (
        //                                 <option key={i} value={category._id}>{category.name}</option>
        //                             ))}
        //                         </select>
        //                     </label>
        //                     <div style={{ display: 'flex', justifyContent: 'space-around' }} >
        //                         <button type='submit' className="btn btn-primary button font-bold" > update product </button>
        //                         <button className="btn btn-primary button font-bold" onClick={() => { setEditMode(!editMode) }} > Avbryt </button>
        //                         <button className="btn btn-primary button font-bold" onClick={deleteProduct} >Ta Bort</button>
        //                     </div>
        //                 </form>
        //             }
        //         </div>
        //     </div>
        // </>

    )
}

export default ProductCardAdmin