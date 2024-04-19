import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCardAdmin from './productCardAdmin';

const RenderProducts = () => {
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"/products");
                // console.log("products:", res.data);
                setProducts(res.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        }

        const fetchCategories = async () => {
            try {
                const res = await axios.get(process.env.REACT_APP_BACKEND_URL+"/categories");
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