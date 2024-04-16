import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateProduct = () => {

    const [categorieList, setCategorieList] = useState([]);
    const [success, setSuccess] = useState(false);

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
            name: "",
            category: "",
            price: 0,
            imageURL: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            await createProduct(values)
            setSubmitting(false)
            console.log(values);
            resetForm()
        },
    })


    const createProduct = async (values) => {
        try {
            console.log("values:", values);
            const { name, category, price, imageURL } = values
            console.log("name:", name, "category:", category, "price:", price, "imageURL:", imageURL)
            const res = await axios.post('https://hakims-webshop-1.onrender.com/products/', { name, category, price, imageURL });
            console.log("new product:", res.data);
            if (res.status === 201) {
                setSuccess(true);
            } else {
                console.error("Unexpected status code:", res.status);
            }
        } catch (error) {
            console.error("Error creating product", error);
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get('https://hakims-webshop-1.onrender.com/categories/');
                console.log("categories:", res.data);
                setCategorieList(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        }

        getCategories();
    }, []);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label>
                    Name:
                    <input type="text" id="name" placeholder="product name" {...formik.getFieldProps('name')} /> {/* value={formik.values.name} onChange={formik.handleChange} /> */}
                    {formik.touched.name && formik.errors.name ? (
                        <div>{formik.errors.name}</div>
                    ) : null}
                </label>
                <label>
                    Category:
                    <select name="category" value={formik.values.category} placeholder="product category" onChange={formik.handleChange} >
                        <option value="">product category</option>
                        {categorieList.map((category, i) => (
                            <option key={i} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Price:
                    <input type="number" id="price" placeholder="product price" {...formik.getFieldProps('price')} /> {/* value={formik.values.price} onChange={formik.handleChange} /> */}
                    {formik.touched.price && formik.errors.price ? (
                        <div>{formik.errors.price}</div>
                    ) : null}
                </label>
                <label>
                    Picture:
                    <input type="text" id="imageURL" placeholder="product picture address" {...formik.getFieldProps('imageURL')} /> {/* value={formik.values.imageURL} onChange={formik.handleChange} /> */}
                    {formik.touched.imageURL && formik.errors.imageURL ? (
                        <div>{formik.errors.imageURL}</div>
                    ) : null}
                </label>
                <button type="submit">Create Product</button>
            </form>
            {success && <p>Product created successfully</p>}
        </>
    )

}

export default CreateProduct;