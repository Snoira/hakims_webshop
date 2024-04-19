
import axios from 'axios';
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import { useState, useEffect } from 'react';
import { CartProvider } from "../Context/Cart.contex";
import ProductPopup from '../Components/ProductPopup';


const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [infoPopup, setInfoPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortOption, setSortOption] = useState("default");




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

    const handleSort = (e) => {
        const option = e.target.value;
        setSortOption(option);
        sortProducts(option);
    };

    const sortProducts = (option) => {
        let sortedProducts = [...filteredProducts];
        switch (option) {
            case "lowToHigh":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case "highToLow":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                sortedProducts = [...originalProducts];
                break;
        }
        setFilteredProducts(sortedProducts);
    };

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

    const openPopup = (product) => {
        setSelectedProduct(product);
        setInfoPopup(true);
    };

    const closePopup = () => {
        setSelectedProduct(null);
        setInfoPopup(false);
    };

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
    }, [filteredProducts]);




    return (
        <div>
            <CartProvider>
                <Header
                    handleResetHome={handleResetHome}
                    openPopup={openPopup}
                />
                <HeroSection />

                <div className="main-container">
                    <Navbar
                        handleSelectCategory={handleSelectCategory}
                        handleResetHome={handleResetHome}
                        handleSort={handleSort}
                        sortOption={sortOption}
                    />
                    <RenderProductCards
                        products={filteredProducts}
                        openPopup={openPopup}
                    />
                </div>


                {/* <button onClick={async () => {
                await getProducts()
                console.log("klick")
            }} >klicka</button> */}
                <Footer />
            </CartProvider>

            {infoPopup && (
                <ProductPopup
                    product={selectedProduct}
                    closePopup={closePopup}

                />
            )}
        </div>
    );
}

export default HomePage;