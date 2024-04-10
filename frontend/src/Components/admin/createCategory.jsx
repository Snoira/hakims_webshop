import axios from 'axios';
import { useState } from 'react';

const CreateCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [success, setSuccess] = useState(false);

    const createCategory = async (e) => {
        e.preventDefault();
        try {
            console.log("category name: ", categoryName);
            const res = await axios.post('https://hakims-webshop-1.onrender.com/categories/', { categoryName });
            console.log("new category:", res.data);
            if (res.status === 201) {
                setSuccess(true);
            }
            setCategoryName('');
        } catch (error) {
            console.error("Error creating category", error);
        }
    };

    return(
        <form onSubmit={createCategory}>
            <label>
                Name:
                <input type="text" value={categoryName} placeholder="category name" onChange={(e) => setCategoryName(e.target.value)} />
            </label>
            <button type="submit">Create Category</button>
            {success && <p>Category created successfully</p>}
        </form>
    )
 
}
export default CreateCategory;