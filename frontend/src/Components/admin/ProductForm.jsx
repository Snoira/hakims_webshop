import { useFormik } from 'formik'
import * as Yup from "yup";

const ProductForm = ({ product, categoryList, submitFunction, setEditMode }) => {

    const _id = (product ? product.category._id : '')

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "Too short")
            .max(50, "Too long")
            .required("Required")
            .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed")
            .matches(/^[\p{L}\p{N}\p{P}\p{Z}]*$/gu, "Emojis are not allowed"),
        category: Yup.string()
            .required("Required")
            .notOneOf([''], "Empty string is not allowed"),
        brand: Yup.string()
            .min(1, "Too short")
            .max(20, "Too long")
            .required("Required")
            .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed"),
        amount: Yup.string()
            .max(20, "Too long")
            .min(1, "Too short")
            .required("Required"),
        price: Yup.number()
            .required("Required")
            .min(0.01, "Price must be at least 0.01")
            .test('two-decimals', 'Only two decimal places are allowed', value => {
                return /^\d+(\.\d{1,2})?$/.test(value.toString());
            }),
        comparisonPrice: Yup.string()
            .required("Required"),
        imageURL: Yup.string()
            .required("Required")
            .url("Invalid URL"),
        description: Yup.string()
            .required("Required")
            .min(10, "Too short")
            .max(500, "Too long")
            .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed")
    });

    const initialValues = product
        ? {
            name: `${product.name}` || "",
            category: product._id || "",
            brand: `${product.brand}` || "",
            price: product.price || 0,
            amount: `${product.amount}` || "",
            comparisonPrice: `${product.comparisonPrice}` || "",
            imageURL: `${product.imageURL}` || "",
            description: `${product.description}` || "",
        }
        : {
            name: "",
            category: "",
            brand: "",
            price: 0,
            amount: "",
            comparisonPrice: "",
            imageURL: "",
            description: "",
        }

    const formik = useFormik({

        initialValues: initialValues,
        validationSchema: validationSchema,

        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            await submitFunction(values)
            setSubmitting(false)
            console.log("submitted");
        },
    })

    const cancelEdit = () => {
        setEditMode(false)
        formik.resetForm()
    }

    return (
        <div className="mx-auto border p-3 ">
               {product ? <h3 className="text-center mb-4">Update Product</h3> : <h2 className="text-center mb-4 mt-1">Create Product</h2>}
            <form className="form-floating row gy-2 gx-3" onSubmit={formik.handleSubmit}>
                <div className="row justify-content-center align-items-center mb-2 mt-3">
                    <div className="col-5">
                        <label htmlFor="name" className="visually-hidden" >Namn</label>
                        <input type="text" name="name" id='name'
                            className={`form-control form-control-sm ${formik.touched.name ? formik.errors.name ? "is-invalid" : "is-valid" : ""}`}
                            placeholder={product ? `${product.name}` : "Namn på produkt"} {...formik.getFieldProps('name')}
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="brand" className="visually-hidden">Märke</label>
                        <input type="text" name="brand" id='brand'
                            className={`form-control form-control-sm ${formik.touched.brand ? formik.errors.brand ? "is-invalid" : "is-valid" : ""}`}
                            placeholder={product ? `${product.brand}` : "Märke på produkt"} defaultValue="-" {...formik.getFieldProps('brand')} />
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-5">
                        <label htmlFor="imageURL" className="visually-hidden"> Bild URL </label>
                        <input type="text" name="imageURL" id='imageURL'
                            className={`form-control form-control-sm ${formik.touched.imageURL ? formik.errors.imageURL ? "is-invalid" : "is-valid" : ""}`}
                            placeholder={product ? `${product.imageURL}` : "Produktbild URL"} {...formik.getFieldProps('imageURL')} />
                    </div>
                    <div className="col-5">
                        <label htmlFor="category" className="visually-hidden">Kategori</label>
                        <select name="category" id="category"
                            className={`form-select form-select-sm ${formik.touched.category ? formik.errors.category ? "is-invalid" : "is-valid" : ""}`}
                            // className="form-select form-select-sm"
                            onChange={formik.handleChange}> {/*defaultValue={product ? `${product.category.name}`: "Kategori på produkt"}*/}
                            {product ?
                                <option hidden value={_id}>{product.category.name}</option>
                                :
                                <option hidden value="">Kategori</option>
                            }
                            {categoryList.map((category, i) => (
                                <option key={i} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center mb-2">
                    <div className="col-3">
                        <label htmlFor="price" className="visually-hidden"> Pris </label>
                        <input type="text" name="price" id='price'
                            className={`form-control form-control-sm ${formik.touched.price ? formik.errors.price ? "is-invalid" : "is-valid" : ""}`}
                            placeholder={product ? `${product.price}` : "Pris"} {...formik.getFieldProps('price')} />
                        {/* placeholder={formik.values.category} */}
                    </div>
                    <div className="col-3">
                        <label htmlFor="amount" className="visually-hidden"> Mängd</label>
                        <input type="text" name="amount" id='amount'
                            className={`form-control form-control-sm ${formik.touched.amount ? formik.errors.amount ? "is-invalid" : "is-valid" : ""}`}
                            placeholder={product ? `${formik.values.amount}` : "Mängd"} {...formik.getFieldProps('amount')} />
                    </div>
                    <div className="col-3">
                        <label htmlFor="comparisonPrice" className="visually-hidden"> Jämförspris </label>
                        <input type="text" name="comparisonPrice" id='comparisonPrice'
                            className={`form-control form-control-sm ${formik.touched.comparisonPrice ? formik.errors.comparisonPrice ? "is-invalid" : "is-valid" : ""}`}
                            placeholder={product ? `${product.comparisonPrice}` : "Jämförspris"} {...formik.getFieldProps('pricomparisonPricece')} />
                    </div>
                </div>
                <div className='row justify-content-center align-items-center mb-2'>
                    <div className="col-10 ">
                    <label htmlFor="description" className="visually-hidden"> Beskrivning </label>
                    <textarea name="description" id='description'
                        className={`form-control ${formik.touched.description ? formik.errors.description ? "is-invalid" : "is-valid" : ""}`}
                        placeholder={product ? `${product.description}` : "Produkt Beskrivning"}  {...formik.getFieldProps('description')} />
                </div>
                </div>
                

                <div style={{ display: 'flex', justifyContent: 'space-around' }} >
                    <button type='submit' className="btn btn-outline-primary font-bold"> {product ? "Uppdatera" : "Skapa Produkt"} </button>
                    {product && <>
                        <button type='reset' className="btn btn-outline-secondary font-bold" onClick={cancelEdit} > Avbryt </button>
                        <button type='button' className="btn btn-outline-danger font-bold" onClick={() => { setQuestionDelete(true) }} >Ta Bort</button>
                    </>
                    }
                </div>
            </form>
        </div>
    )
}

export default ProductForm