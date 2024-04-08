
import axios from 'axios';
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';
import Navbar from  '../Components/Navbar';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import { useState, useEffect } from 'react';



const HomePage = () => {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const res = await axios.get('https://hakims-webshop-1.onrender.com/products')
            setProducts(res.data)
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const [cart, setCart] = useState([]);

    const addToCart = (productToAdd) => {
        setCart([...cart, productToAdd]);
    }

    return (
        <div>
            <Header cart={cart}/>
            <HeroSection />
              
            <div className="main-container"> 
                <Navbar  />
            {products && <RenderProductCards products={products} addToCart={addToCart} cart= {cart}/>}
            
            </div>
            {/* <button onClick={async () => {
                await getProducts()
                console.log("klick")
            }} >klicka</button> */}
            <Footer />
        </div>
    );
}

export default HomePage;