
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


    const getProducts = async () => {
        try {
            const res = await axios.get('https://hakims-webshop-1.onrender.com/products')
            setProducts(res.data)
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

    useEffect(() => {
        getProducts()
    }, [])

    const handleSelectCategory = (category) => {
        const filtered = products.filter(product => product.category === category);
        setFilteredProducts(filtered);
    };

    // Nedan useState kollar efter produkter i localstorage, finns inget lagrat, blir cart en tom array
    const [cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : []);

    // spara produkt i localstorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (productToAdd) => {
        const existingProductIndex = cart.findIndex((item) => item.name === productToAdd.name);
        if (existingProductIndex !== -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart, () => {
                localStorage.setItem('cart', JSON.stringify(cart));
            });
        } else {
            const updatedCart = [...cart, { ...productToAdd, quantity: 1 }];
            setCart(updatedCart, () => {
                localStorage.setItem('cart', JSON.stringify(cart))
            });
        }
    };

    const deleteProductFromCart = (productToRemove) => {
        const updatedCart = cart.filter(item => item.name !== productToRemove.name);
        setCart(updatedCart);
    }

    const changeQuantityCart = (product, change) => {
        const updatedCart = [...cart];
        const index = updatedCart.findIndex(item => item.name === product.name);
        if (index !== -1) {
            if (change === "increase") {
                updatedCart[index].quantity += 1;
            } else if (change === "decrease") {
                if (updatedCart[index].quantity === 1) {
                    updatedCart.splice(index, 1);
                } else {
                    updatedCart[index].quantity -= 1;
                }
            }
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    }

    const calculateTotal = (cart) => {
        if (cart.length === 0) {
            return 0;
        }

        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + (currentItem.price * currentItem.quantity);
        }, 0);

        return total;
    };

    return (
        <div>
            <CartProvider>
                <Header
                // cart={cart}
                // deleteProductFromCart={deleteProductFromCart}
                // changeQuantityCart={changeQuantityCart}
                // calculateTotal={calculateTotal}
                />
                <HeroSection />

                <div className="main-container">
                    <Navbar onSelectCategory={handleSelectCategory} />
                    <RenderProductCards
                        products={filteredProducts}
                        addToCart={addToCart}
                        cart={cart}
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