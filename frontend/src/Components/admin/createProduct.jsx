import axios from "axios";
import { useState, useEffect } from "react";


const CreateProduct = () => {

    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productPicture, setProductPicture] = useState('');
    const [categories, setCategories] = useState([]);
    const [success, setSuccess] = useState(false);

    const createProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://hakims-webshop-1.onrender.com/products/', { productName, productCategory, productPrice, productPicture });
            console.log("new product:", res.data);
            if (res.status === 201) {
                setSuccess(true);
            }
            setProductName('');
            setProductCategory('');
            setProductPrice('');
            setProductPicture('');
        } catch (error) {
            console.error("Error creating product", error);
        }
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get('https://hakims-webshop-1.onrender.com/categories/');
                console.log("categories:", res.data);
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        }

        getCategories();
    }, []);

    return (
        <>
            <form onSubmit={createProduct}>
                <label>
                    Name:
                    <input type="text" value={productName} placeholder="product name" onChange={(e) => setProductName(e.target.value)} />
                </label>
                <label>
                    Category:
                    <select name="category" id="category" placeholder="product category" onChange={(e) => setProductCategory(e.target.value)} >
                        <option value="">product category</option>
                        {categories.map((category, i) => (
                            <option key={i} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Price:
                    <input type="number" value={productPrice} placeholder="product price" onChange={(e) => setProductPrice(e.target.value)} />
                </label>
                <label>
                    Picture:
                    <input type="text" value={productPicture} placeholder="product picture address" onChange={(e) => setProductPicture(e.target.value)} />
                </label>
                <button type="submit">Create Product</button>
            </form>
            {success && <p>Category created successfully</p>}
        </>
    )

}

export default CreateProduct;