import axios from 'axios'
import { useState } from 'react'
import CategoryCardAdmin from './CategoryCardAdmin'

const RenderCategories = () => {
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    const fetchCategories = async () => {
        try{
            const res = await axios.get('https://hakims-webshop-1.onrender.com/categories/');
            // console.log("categories:", res.data);
            setCategories(res.data);
        } catch(error){
            console.error("Error fetching categories", error);
        }
    }

    return(
        <>
        <button onClick={() => {fetchCategories(); setShowCategories(!showCategories)}}>
            show categories</button>
            {showCategories && categories.map((category, i) => (
                <div key={i}>
                    <CategoryCardAdmin category={category} />
                </div>
            ))}
        </>
    )
}

export default RenderCategories;