import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCardAdmin from './ProductCardAdmin';

const RenderProducts = () => {
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/products");
                const res = await axios.get('https://hakims-webshop-1.onrender.com'+"/products");
                // console.log("products:", res.data);
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        }

        const fetchCategories = async () => {
            try {
                // const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/categories");
                const res = await axios.get('https://hakims-webshop-1.onrender.com'+"/categories");
                // console.log("categories:", res.data);
                setCategoryList(res.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        }

        fetchProducts();
        fetchCategories();
    }, []);

    return (
        <>
            <button onClick={() => { setShowProducts(!showProducts) }} >show products</button>
                {(showProducts && products.length > 0) && products.map((product, i) => (
                    < ProductCardAdmin key={i} product={product} categoryList={categoryList} />

                ))}
        </>
    );

}

export default RenderProducts;