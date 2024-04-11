import { useState } from 'react'
import axios from 'axios'

const CategoryCardAdmin = ({ category }) => {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(category.name)

    return (
        <>
            {!editMode ? <div>
                <h3>{category.name}</h3>
                <button>Redigera</button>
            </div>
                :
                <div>
                    <input type="text" value={category.name} />
                    <button>Avbryt</button>
                    <button>Uppdatera</button>
                    <button>Ta bort</button>
                </div>}
        </>

    )


}