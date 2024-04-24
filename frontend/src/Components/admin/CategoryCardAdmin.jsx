import { useState } from 'react'
import axios from 'axios'
import { useToaster } from "../../Context/Toaster.context";
import CategoryForm from './CategoryForm';
// import ConfirmDeleteModal from './ConfirmDeleteModal'


const CategoryCardAdmin = ({ category }) => {
    const [editMode, setEditMode] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)

    const { successToaster } = useToaster()

    const updateCategory = async (values) => {
        const { categoryName } = values
        // const name = categoryName
        try {
            const res = await axios.put("https://hakims-webshop-1.onrender.com"+`/categories/edit/${category._id}`, { "name": categoryName });
            // const res = await axios.put(import.meta.env.VITE_BACKEND_URL+`/categories/edit/${category._id}`, { "name": categoryName });

            if (res.status === 200) {
                console.log("updated Category:", res.data);
                setEditMode(false);
                successToaster(categoryName, "updated")
            } else {
                console.error("Unexpected status code:", res.status);
            }
        } catch (error) {
            console.error("Error updating caregory", error);
        }
    }

    const deleteCategory = async () => {
        try {
            // const deletedProductsWithCategory = await axios.delete(import.meta.env.VITE_BACKEND_URL+`/products/delete/category/${category._id}`);
            const deletedProductsWithCategory = await axios.delete('https://hakims-webshop-1.onrender.com'+`/products/delete/category/${category._id}`);
            // const deletedProductsWithCategory = await axios.delete(`http://localhost:8000/products/delete/category/${category._id}`);
            if (deletedProductsWithCategory.status === 200) {
                console.log("deleted products with category", category.name);
                // const res = await axios.delete(import.meta.env.VITE_BACKEND_URL+`/categories/delete/${category._id}`);
                const res = await axios.delete('https://hakims-webshop-1.onrender.com'+`/categories/delete/${category._id}`);
                // const res = await axios.delete(`http://localhost:8000/categories/delete/${category._id}`);
                if (res.status === 200) {
                    console.log("deleted category:", res.data);
                    setEditMode(false);
                    successToaster(category.name, "deleted")
                    // setQuestionDelete(false)
                    setSuccessDelete(true)
                }
            }
        } catch (error) {
            console.error("Error deleting category", error);
        }
    }

    return (
        <>
            {!editMode ?
                <div className="mx-auto border p-3 ">
                    <h3>{category.name}</h3>
                    {!successDelete && <button onClick={() => { setEditMode(!editMode) }}>Redigera</button>}
                </div>
                :
                <div>
                    <CategoryForm category={category} submitFunction={updateCategory} setEditMode={setEditMode} deleteFunction={deleteCategory} />
                </div>
            }
           
        </>

    )


}

export default CategoryCardAdmin;