import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOut = () => {
  const [customerSaved, setCustomerSaved] = useState(false);
  const [savedValues, setSavedValues] = useState();
  const [custInfo, setCustInfo] = useState();



  const cartProducts = JSON.parse(localStorage.getItem('cart'));

  const getProductIdsFromLocalStorage = () => {
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    if (cartProducts) {
      // Returnera en array av produkt-ID:n
      return cartProducts.map(product => product.id);

    } else {
      return [];
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "Too Short")
      .max(35, "Too long")
      .required("Required")
      .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed")
      .matches(/^[\p{L}\p{N}\p{P}\p{Z}]*$/gu, "Emojis are not allowed"),
    lastName: Yup.string()
      .min(2, "Too Short")
      .max(40, "Too long")
      .required("Required")
      .matches(/^[a-öA-Ö\s]*$/, "Only Swedish characters are allowed")
      .matches(/^[\p{L}\p{N}\p{P}\p{Z}]*$/gu, "Emojis are not allowed"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required"),
    address: Yup.object().shape({
      street: Yup.string().required("Required"),
      streetNumber: Yup.number().required("Required"),
      postNumber: Yup.number().required("Required"),
      city: Yup.string().required("Required"),
    })
  })

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: {
        street: '',
        streetNumber: '',
        postNumber: '',
        city: '',
      }
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      await createCustomer(values)
      resetForm()
      console.log(values)
      setSubmitting(false)
      setSavedValues(values);
    }
  })


  // ta ut kunddata från res.data nedan
  const extractCustomerInfo = (data) => {
    if (!data) {
      return null;
    }

    const { _id, firstName, lastName, email, address } = data;

    return {
      customerId: _id,
      firstName,
      lastName,
      email,
      address,
    };
  };

    const createCustomer = async (values) => {
      try {
        const { firstName, lastName, email, address } = values
        console.log("Creating customer with values:", values);
          const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/customers", 
          { firstName, lastName, email, address });
          console.log("new customer: ", res.data);
          setCustomerSaved(true);
          const customerInfo = extractCustomerInfo(res.data);
          setCustInfo(customerInfo);
          console.log("cust info", custInfo);

    } catch (error) {
      console.error('Error creating customer:', error);
    }
  }

  const calculateTotal = (cartProducts) => {
    if (cartProducts.length === 0) {
      return 0;
    }

    const total = cartProducts.reduce((accumulator, currentItem) => {
      return accumulator + (currentItem.price * currentItem.quantity);
    }, 0);

    const formatTotal = total.toFixed(2);

    return formatTotal.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  const total = calculateTotal(cartProducts);

  // Moms
  const Vat = 0.12;
  const getTotalVat = parseFloat(total) * Vat;

  // total summa inkl frakt och moms, 59kr i fraktkostnad
  const getTotalCost = parseFloat(total) + getTotalVat + 59;
  const formatTotalCost = getTotalCost.toFixed(2);

  // skapa random ordernummer
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000);
  };


  // SKAPA ORDER inkl kundinfon som precis sparades
  const createOrder = async () => {
    // const productIds = getProductIdsFromLocalStorage();

    try {
      const customerInfo = {
        customerId: custInfo.customerId,
      };

      // Ny hämta produkter: 
      const orderItems = cartProducts.map(product => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
        price: product.price,
        totalProductPrice: product.price * product.quantity,
      }));

      const order = {
        orderNummer: generateOrderNumber(),
        date: new Date().toISOString(),
        totalPrice: getTotalCost,
        totalPriceWithTax: getTotalCost,
        orderItems: orderItems,
        customerInfo: customerInfo, // Använd en array eftersom det finns en array av customerInfo i Order-modellen
      };

    console.log(order);
    const res = await axios.post(import.meta.env.VITE_BACKEND_URL+"/orders", order)
    //const res = await axios.post("https://hakims-webshop-1.onrender.com/orders", order)
    console.log('Order created successfully:', res.data)
    if(res.status === 201) {
      successCreateOrder();
    }
    localStorage.removeItem("cart");
   } catch (error) {
    console.error('Error creating order:', error);
    if (error.response) {
      console.log('Server responded with:', error.response.data);
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error setting up request:', error.message);
    }
   }
}
    
const successCreateOrder = () => toast.success(`Ordern är skapad!!`, {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});



  return (
    <>
      <div className="py-5 text-center checkout-container">
        <h2>Kassa</h2>
        <p className="lead"> Fyll i och spara dina kunduppgifter. Därefter kan du lägga din beställning!</p>
      </div>
      <div className="row g-5 form-container">

        {/* varukorg */}
        <div className="col-md-5 col-lg-4 order-md-last">
          {customerSaved && (

            <div className="col-md-12 customer-info">
              <h4>Dina uppgifter:</h4>
              <p>Förnamn: {savedValues.firstName}</p>
              <p>Efternamn: {savedValues.lastName}</p>
              <p>Email: {savedValues.email}</p>
              <p>
                Adress: {savedValues.address.street}{" "}
                {savedValues.address.streetNumber},{" "}
                {savedValues.address.postNumber} {savedValues.address.city}
              </p>
            </div>
          )}
          <h4 className="d-flex justify-content-between align-items-center md-3">
            <span className="text-primary">Varukorg</span>
          </h4>
          <ul className="list-group mb-3">
            {cartProducts.map(product => (
              <li className="list-group-item d-flex justify-content-between lh-sm"
                key={product.id}>
                <span className="my-0">{product.name}</span> <small>{product.quantity}st</small>
                <small className="text-body-secondary">{product.price} kr</small>
              </li>
            ))}
            <div>
            </div>
            <li className="list-group-item d-flex justify-content-between">
              <strong>Summa produkter</strong>
              <strong>{total} kr</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <strong>Leveranskostnad</strong>
              <strong>59kr</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <strong>TOTALSUMMA</strong>
              <strong>{formatTotalCost} kr</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between" >
              <small>Moms (12%)</small>
              <small>{getTotalVat} kr</small>
            </li>

          </ul>
          {customerSaved && (
            <div>
              <button
                className="w-100 btn btn-primary btn-lg"
                type="submit"
                onClick={createOrder}
              >Lägg order</button>
            </div>
          )}

        </div>

        {/* formulär för kundinfo */}
        <div className="col-md-7 col-lg-8">
          <h4 className="md-3">Din adress</h4>
          <form
            className="needs-validation"
            onSubmit={formik.handleSubmit}
            noValidate>
            <div className="row g-3" >
              <div className="col-sm-6">
                <label
                  htmlFor="firstName"
                  className="form-label">Förnamn</label>
                <input
                  // className="form-control" 
                  className={`form-control form-control-sm ${formik.touched.firstName ? formik.errors.firstName ? "is-invalid" : "is-valid" : ""}`}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}></input>
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="invalid-feedback">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">Efternamn</label>
                <input
                  type="text"
                  // className="form-control"
                  className={`form-control form-control-sm ${formik.touched.lastName ? formik.errors.lastName ? "is-invalid" : "is-valid" : ""}`}
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="invalid-feedback">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
              <div className="col-12">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="text"
                  // className="form-control" 
                  className={`form-control form-control-sm ${formik.touched.email ? formik.errors.email ? "is-invalid" : "is-valid" : ""}`}
                  name="email"
                  placeholder="you@example.com"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
              <div class="col-sm-9">
                <label htmlFor="address.street" className="form-label">Gatunamn (bokstäver)</label>
                <input
                  type="text"
                  // className="form-control"
                  className={`form-control form-control-sm ${formik.touched.address?.street ? formik.errors.address?.street ? "is-invalid" : "is-valid" : ""}`}
                  id="address.street"
                  name="address.street"
                  value={formik.values.address.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.street && formik.errors?.address?.street ? (
                  <div className="invalid-feedback">
                    {formik.errors?.address?.street}
                  </div>
                ) : null}
              </div>
              <div className="col-md-3">
                <label htmlFor="address.streetNumber" className="form-label">Husnummer</label>
                <input
                  type="text"
                  // className="form-control"
                  className={`form-control form-control-sm ${formik.touched.address?.streetNumber ? formik.errors.address?.streetNumber ? "is-invalid" : "is-valid" : ""}`}
                  id="address.streetNumber"
                  name="address.streetNumber"
                  value={formik.values.address.streetNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.streetNumber && formik.errors?.address?.streetNumber ? (
                  <div className="invalid-feedback">
                    {formik.errors?.address?.streetNumber}
                  </div>
                ) : null}
              </div>
              <div className="col-md-3">
                <label htmlFor="address.postNumber" className="form-label">Postnummer</label>
                <input
                  type="text"
                  // className="form-control"
                  className={`form-control form-control-sm ${formik.touched.address?.postNumber ? formik.errors.address?.postNumber ? "is-invalid" : "is-valid" : ""}`}
                  id="address.postNumber"
                  name="address.postNumber"
                  value={formik.values.address.postNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.postNumber && formik.errors?.address?.postNumber ? (
                  <div className="invalid-feedback">
                    {formik.errors?.address?.postNumber}
                  </div>
                ) : null}
              </div>
              <div className="col-sm-9">
                <label htmlFor="address.city" className="form-label">Postort</label>
                <input
                  type="text"
                  // className="form-control"
                  className={`form-control form-control-sm ${formik.touched.address?.city ? formik.errors.address?.city ? "is-invalid" : "is-valid" : ""}`}
                  id="address.city"
                  name="address.city"
                  value={formik.values.address.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.address?.city && formik.errors?.address?.city ? (
                  <div className="invalid-feedback">
                    {formik.errors?.address?.city}
                  </div>
                ) : null}
              </div>
              <div className="button-box">
                <button
                  className="w-50 btn btn-primary btn-lg"
                  type="submit"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting}
                >
                  Spara kundinfo
                </button>

              </div>
            </div>

          </form>

        </div>



      </div>
    </>
  )
}

export default CheckOut;