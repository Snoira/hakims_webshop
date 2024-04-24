import styles from '../../Styles/ConfirmDeleteModal.module.css'
import { useState, useEffect } from 'react'


function ConfirmDeleteModal({ deleteFunction, object, setQuestionDelete, questionDelete }) {
    const [objectType, setObjectType] = useState('')
    const closeModal = () => {
        if(object){
            setQuestionDelete(false);
        } 
    };

    useEffect(() => {
        if(object){
            if(object.category){
                setObjectType('product')
            } else {
                setObjectType('category')
            }
        } else{
            console.log('No object')
        }
    }, [])

    return (
        questionDelete && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>Är du säker på att du vill radera {object.name}?</h2>
                    {objectType === 'product' ? <p>Produkten och all dess information kommer försvinna</p> : <p>Alla produkter i kategorin kommer också att raderas</p>}
                    <button onClick={closeModal}>Avbryt</button>
                    <button onClick={() => { deleteFunction(); closeModal(); }}>Bekräfta</button>
                </div>
            </div>
        )

    )
}

export default ConfirmDeleteModal