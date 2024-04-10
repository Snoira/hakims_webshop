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
            } catch (error) {
                console.error("Error fetching products", error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <>
            <button onClick={() => {setShowProducts(!showProducts)}} >show products</button>
            
            {showProducts && products.map((product, i) => (
                <div key={i}>
                    <h4>{product.name}</h4>
                    <p>Kategori: {product.category[0].name}</p>
                    <p>Pris: {product.price} kr</p>
                </div>
            ))}
        </>
    );

}

export default RenderProducts;