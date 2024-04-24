import { useFormik } from 'formik'
import * as Yup from "yup";
import ConfirmDeleteModal from './ConfirmDeleteModal';
import {useState} from 'react'

const CategoryForm = ({ category, submitFunction, setEditMode, deleteFunction }) => {

    const [questionDelete, setQuestionDelete] = useState(false)

    const validationSchema = Yup.object({
        categoryName: Yup.string()
            .min(2, "Too short")
            .max(50, "Too long")
            .required("Required")
            .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed")
            .matches(/^[\p{L}\p{N}\p{P}\p{Z}]*$/gu, "Emojis are not allowed")
            .notOneOf([''], "Empty string is not allowed"),
    });

    const initialValues =
    {
        categoryName: category ? category.name : "",
    }

    const formik = useFormik({

        initialValues: initialValues,
        validationSchema: validationSchema,

        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true)
            await submitFunction(values)
            setSubmitting(false)
            if(!category) formik.resetForm()
        },
    })

    return (
        <div className="mx-auto border p-3 ">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="categoryName" className='visually-hidden' >Category</label>
                    <input
                        type="text"
                        className={`form-control form-control-md ${formik.touched.categoryName ? formik.errors.categoryName ? "is-invalid" : "is-valid" : ""}`}
                        id="categoryName"
                        name="categoryName"
                        placeholder={category ? `${category.name}` : 'Category'}
                        {...formik.getFieldProps('categoryName')}
                    />
                </div>
                <button type="submit" className="btn btn-primary button font-bold">{category ? "Uppdatera Kategori" : "Skapa Kategori"}</button>
                {category&& <>
                    <button type="reset" className="btn btn-secondary button font-bold" onClick={() => { setEditMode(false) }}>Avbryt</button>
                    <button type="button" className="btn btn-danger button font-bold" onClick={() => {setQuestionDelete(true)}}>Ta Bort</button>
                </>}
            </form>
            {category && <ConfirmDeleteModal deleteFunction={deleteFunction} object={category} setQuestionDelete={setQuestionDelete} questionDelete={questionDelete} />}
        </div>
    )
}

export default CategoryForm