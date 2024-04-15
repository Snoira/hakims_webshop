import axios from "axios";
import { useState, useEffect } from "react";


const CreateProduct = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [imageURL, setImageURL] = useState('');
    const [categorieList, setCategorieList] = useState([]);
    const [success, setSuccess] = useState(false);

    const createProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://hakims-webshop-1.onrender.com/products/', { name, category, price, imageURL });
            console.log("new product:", res.data);
            if (res.status === 201) {
                setSuccess(true);
            }
            setName('');
            setCategory('');
            setPrice('');
            setImageURL('');
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
            <form onSubmit={createProduct}>
                <label>
                    Name:
                    <input type="text" value={name} placeholder="product name" onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Category:
                    <select name="category" id="category" placeholder="product category" onChange={(e) => setCategory(e.target.value)} >
                        <option value="">product category</option>
                        {categorieList.map((category, i) => (
                            <option key={i} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Price:
                    <input type="number" value={price} placeholder="product price" onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>
                    Picture:
                    <input type="text" value={imageURL} placeholder="product picture address" onChange={(e) => setImageURL(e.target.value)} />
                </label>
                <button type="submit">Create Product</button>
            </form>
            {success && <p>Product created successfully</p>}
        </>
    )

}

export default CreateProduct;