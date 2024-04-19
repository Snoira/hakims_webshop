import axios from 'axios';
// import { useState } from 'react';
import CategoryForm from './CategoryForm';
import { useToaster } from "../../Context/Toaster.context";

const CreateCategory = () => {
    // const [categoryName, setCategoryName] = useState('');
    // const [success, setSuccess] = useState(false);
    const { successToaster } = useToaster();

    const createCategory = async (values) => {
        const { category } = values
        try {
            console.log("category name: ", category);
            const res = await axios.post(process.env.REACT_APP_BACKEND_URL+'/categories/', { "name": category });
            console.log("new category:", res.data);
            if (res.status === 201) {
                successToaster(res.data.name, "created");
            } else {
                console.error("Unexpected status code:", res.status);
            }
        } catch (error) {
            console.error("Error creating category", error);
        }
    };

    return (
        <>
            <CategoryForm submitFunction={createCategory} />
        </>
        // <form onSubmit={createCategory}>
        //     <label>
        //         Name:
        //         <input type="text" value={categoryName} placeholder="category name" onChange={(e) => setCategoryName(e.target.value)} />
        //     </label>
        //     <button type="submit">Create Category</button>
        //     {success && <p>Category created successfully</p>}
        // </form>
    )

}
export default CreateCategory;