import axios from 'axios';
import { useEffect, useState } from 'react';

const RenderProducts = () => {
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://hakims-webshop-1.onrender.com/products/');
                console.log("products:", res.data);
                setProducts(res.data);
                setShowProducts(true);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div>
            {showProducts && products.map((product, i) => (
                <div key={i}>
                    <h4>{product.name}</h4>
                    <p>Kategori: {product.category[0].name}</p>
                    <p>Pris: {product.price} kr</p>
                </div>
            ))}
        </div>
    );

}

export default RenderProducts;