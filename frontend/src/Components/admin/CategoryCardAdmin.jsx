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
            const res = await axios.put(`https://hakims-webshop-1.onrender.com/categories/edit/${category._id}`, { name });
            console.log("updated Category:", res.data);
            if (res.status === 200) {
                setEditMode(false);
                setSuccessUpdate(true);
            }
        } catch (error) {
            console.error("Error updating caregory", error);
        }
    }

    const deleteCategory = async (e) => {
        e.preventDefault();
        try {
            const productsWithCategory = await axios.get(`https://hakims-webshop-1.onrender.com/products/category/${category._id}`);

            const res = await axios.delete(`https://hakims-webshop-1.onrender.com/categories/delete/${category._id}`);
            console.log("deleted product:", res.data);

            if (res.status === 200) {
                setEditMode(false);
                setSuccessDelete(true);
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
                <button onClick={() => { setEditMode(!editMode) }}>Redigera</button>
            </div>
                :
                <div>
                    <input type="text" defaultValue={category.name} />
                    <div style={{display: "flex"}} >
                        <button onClick={() => { setName(category.name); setEditMode(!editMode) }} >Avbryt</button>
                        <button onClick={updateCategory} >Uppdatera</button>
                        <button onClick={() => { setIsModalOpen(true) }} >Ta bort</button>
                    </div>
                </div>}
            {successUpdate && <p>Category updated successfully</p>}
            {isModalOpen &&
                <div>
                    <p>Är du säker på att du vill radera kategorin? Alla produkter i kategorin kommer också att raderas.</p>
                    <button onClick={deleteCategory} >Ja, radera kategorin</button>
                    <button onClick={() => { setIsModalOpen(false) }}>Nej, radera inte kategorin</button>
                </div>
            }
        </>

    )


}

export default CategoryCardAdmin;