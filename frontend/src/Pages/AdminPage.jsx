import axios from 'axios';
import { useState } from 'react';

const AdminPage = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [success, setSuccess] = useState(false);

    const createProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://hakims-webshop-1.onrender.com/products/', { name, category, price });
            console.log("new product:", res.data);
            if (res.status === 201) {
                setSuccess(true);
            }
            setName('');
            setCategory('');
            setPrice('');
        } catch (error) {
            console.error("Error creating product", error);
        }
    };

    return (
        <>
            <h1>Admin Page</h1>
            <div>
                <h2>Create new product:</h2>
                <form onSubmit={createProduct}>
                    <input type="text" placeholder="product name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="category" value={category} onChange={e => setCategory(e.target.value)} />
                    <input type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)} />
                    <button type="submit" >Add Product</button>
                </form>
                {success && <p>Product added successfully</p>}
            </div>
        </>
    );
}

export default AdminPage;   