import { useState } from 'react'
import axios from 'axios'

const CategoryCardAdmin = ({ category }) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(category.name)
    const [successUpdate, setSuccessUpdate] = useState(false)
    const [successDelete, setSuccessDelete] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`https://hakims-webshop-1.onrender.com/CATEGORIES/edit/${category._id}`, { name });
            console.log("updated Category:", res.data);
            if (res.status === 200) {
                setEditMode(false);
                setSuccessUpdate(true);
            }
        } catch (error) {
            console.error("Error updating caregory", error);
        }
    }

    const deleteCategory = async () => {
        try {
            const deletedProductsWithCategory = await axios.delete(`https://hakims-webshop-1.onrender.com/products/delete/category/${category._id}`);
            // const deletedProductsWithCategory = await axios.delete(`http://localhost:8000/products/delete/category/${category._id}`);

            if (deletedProductsWithCategory.status === 200) {
                console.log("deleted products with category", category.name);
                const res = await axios.delete(`https://hakims-webshop-1.onrender.com/categories/delete/${category._id}`);
                // const res = await axios.delete(`http://localhost:8000/categories/delete/${category._id}`);
                console.log("deleted category:", res.data);
                if (res.status === 200) {
                    setEditMode(false);
                    setSuccessDelete(true);
                }
            }
        } catch (error) {
            console.error("Error deleting category", error);
        }
    }

    // const confirmDelete = () => {
    //     setIsModalOpen(true)
    // }

    return (
        <>
            {!editMode ? <div>
                <h3>{category.name}</h3>
                {!successDelete && <button onClick={() => { setEditMode(!editMode) }}>Redigera</button>}
            </div>
                :
                <div>
                    <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <div style={{ display: "flex" }} >
                        <button onClick={() => { setName(category.name); setEditMode(!editMode) }} >Avbryt</button>
                        <button onClick={updateCategory} >Uppdatera</button>
                        <button onClick={() => { setIsModalOpen(true) }} >Ta bort</button>
                    </div>
                </div>}
            {isModalOpen &&
                <div>
                    <p>Är du säker på att du vill radera kategorin? Alla produkter i kategorin kommer också att raderas.</p>
                    <button onClick={() => { deleteCategory(); setIsModalOpen(false) }} >Ja, radera kategorin</button>
                    <button onClick={() => { setIsModalOpen(false) }}>Nej, radera inte kategorin</button>
                </div>
            }
            {(successUpdate||successDelete) && <p>Category successfully { successDelete?  "deleted": "updated"} </p>}
        </>

    )


}

export default CategoryCardAdmin;