
import axios from 'axios';
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import { useState, useEffect } from 'react';
import { CartProvider } from "../Context/Cart.contex";


const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);




    const getProducts = async () => {
        try {
            const res = await axios.get('https://hakims-webshop-1.onrender.com/products');


            // const productsWithCategoryNames = res.data.map(product => ({
            //     ...product,
            //     categoryName: product.category
            // }));

            setProducts(res.data)
            console.log("products: ", products)
            setOriginalProducts(res.data);
            setFilteredProducts(res.data);


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

    const handleSelectCategory = async (category) => {
        try {
            // Filtrera produkter baserat på kategorinamn
            const filteredProductsByCategory = originalProducts.filter(product => {
                if (product.category && product.category.name) {
                    return product.category.name === category;
                }
                return false;
            });
            setFilteredProducts(filteredProductsByCategory);
        } catch (error) {
            console.error("Error filtering products by category:", error);
        }
    };

    const handleResetHome = () => {
        setFilteredProducts(originalProducts); // Återställ filter för produkter
    };

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
    }, [filteredProducts]);


    return (
        <div>
            <CartProvider>
                <Header handleResetHome={handleResetHome}
                />
                <HeroSection />

                <div className="main-container">
                    <Navbar
                        handleSelectCategory={handleSelectCategory}
                        handleResetHome={handleResetHome}
                    />
                    <RenderProductCards
                        products={filteredProducts}
                    />
                </div>
                {/* <button onClick={async () => {
                await getProducts()
                console.log("klick")
            }} >klicka</button> */}
                <Footer />
            </CartProvider>
        </div>
    );
}

export default HomePage;