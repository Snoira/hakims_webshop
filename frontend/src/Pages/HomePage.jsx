
import axios from 'axios';
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';
import { useState, useEffect } from 'react';

const HomePage = () => {
    const [products, setProducts] = useState([])

    // useEffect(() => {
    //     // const getProducts = async () => {
    //     //     axios.get('https://hakims-webshop-1.onrender.com/products')
    //     //         .then(res => {
    //     //             console.log(res.data)
    //     //             setProducts(res.data)
    //     //         }).catch(err => {
    //     //             console.log(err)
    //     //         })
    //     // // }
    //     const getProducts = async () => {
    //         try {
    //             const res = await axios.get('https://hakims-webshop-1.onrender.com/products')
    //             setProducts(res.data)
    //         } catch (error) {
    //              if (error.response) {
    //                 // The request was made and the server responded with a status code
    //                 // that falls out of the range of 2xx
    //                 console.log(error.response.data);
    //                 console.log(error.response.status);
    //                 console.log(error.response.headers);
    //               } else if (error.request) {
    //                 // The request was made but no response was received
    //                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //                 // http.ClientRequest in node.js
    //                 console.log(error.request);
    //               } else {
    //                 // Something happened in setting up the request that triggered an Error
    //                 console.log('Error', error.message);
    //               }
    //               console.log(error.config);
    //         }
    //     }
    //     getProducts()
    // }, [])

    // const getProducts = async () => {
    //     try {
    //         const res = await axios.get('https://hakims-webshop-1.onrender.com/products')
    //         setProducts(res.data)
    //     } catch (error) {
    //          if (error.response) {
    //             // The request was made and the server responded with a status code
    //             // that falls out of the range of 2xx
    //             console.log(error.response.data);
    //             console.log(error.response.status);
    //             console.log(error.response.headers);
    //           } else if (error.request) {
    //             // The request was made but no response was received
    //             // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //             // http.ClientRequest in node.js
    //             console.log(error.request);
    //           } else {
    //             // Something happened in setting up the request that triggered an Error
    //             console.log('Error', error.message);
    //           }
    //           console.log(error.config);
    //     }
    // }
    // const getProducts = async () => {
    //     axios.get('https://hakims-webshop-1.onrender.com/products/')
    //         .then(res => {
    //             console.log("klick", res.data)
    //             setProducts(res.data)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }

    return (
        <div>
            <Header />

            <h1>Home Page</h1>
            {products && <RenderProductCards products={products} />}
            <button onClick={async()=>{
                await getProducts()
                console.log("klick")
                }} >klicka</button>
        </div>
    );
}

export default HomePage;