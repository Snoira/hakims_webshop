import { useFormik } from 'formik'
import * as Yup from "yup";

const CategoryForm = ({ category, submitFunction, setEditMode, setQuestionDelete }) => {

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
            console.log("submitted");
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
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur}
                    // value={formik.values.category}
                    />
                    {/* {formik.touched.category && formik.errors.category ? (
                        <div className="alert alert-danger">{formik.errors.category}</div>
                    ) : null} */}
                </div>
                <button type="submit" className="btn btn-primary button font-bold">{category ? "Uppdatera Kategori" : "Skapa Kategori"}</button>
                {category&& <>
                    <button type="reset" className="btn btn-secondary button font-bold" onClick={() => { setEditMode(false) }}>Cancel</button>
                    <button type="button" className="btn btn-danger button font-bold" onClick={() => {setQuestionDelete(true)}}>Delete</button>
                </>}
            </form>
        </div>
    )
}

export default CategoryForm