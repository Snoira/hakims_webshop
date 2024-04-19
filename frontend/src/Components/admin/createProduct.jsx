import axios from "axios";
import { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { useToaster } from "../../Context/Toaster.context";
import ProductForm from "./ProductForm";

const CreateProduct = () => {

    const [categoryList, setCategoryList] = useState([]);
    const { successToaster } = useToaster();

    const createProduct = async (values) => {
        try {
            // console.log("values:", values);
            const { name, category, brand, price, amount, comparisonPrice, imageURL } = values
            // console.log("name:", name, "category:", category, "price:", price, "imageURL:", imageURL)
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/products", { name, category, brand, price, amount, comparisonPrice, imageURL });
            console.log("new product:", res.data);
            if (res.status === 201) {
                // successCreate(res.data.name);
                successToaster(res.data.name, "created");
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
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/categories");
                console.log("categories:", res.data);
                setCategoryList(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        }

        getCategories();
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center">
            {categoryList.length > 0 && <ProductForm categoryList={categoryList} submitFunction={createProduct} />}
        </div>
    )
}

export default CreateProduct;