
import axios from 'axios';
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';
import Navbar from  '../Components/Navbar';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import { useState, useEffect } from 'react';



const HomePage = () => {
    const [products, setProducts] = useState([
        {
        "_id": "6605bb372aa93949811cd7e2",
        "name": "spagetti",
        "category": "pasta",
        "price": 10,
        "__v": 0
        },
        {
        "_id": "6605bb852aa93949811cd7e5",
        "name": "yoghurt",
        "category": "dairy",
        "price": 5,
        "__v": 0
        },
        {
        "_id": "660bc190635ca0d2fca2e5a0",
        "name": "milk",
        "category": "dairy",
        "price": 5,
        "__v": 0
        },
        {
        "_id": "660bc282635ca0d2fca2e5a3",
        "name": "juice",
        "category": "dairy",
        "price": 5,
        "__v": 0
        },
        {
        "_id": "660c0e42745ab6b96dbbacf4",
        "name": "spagetti",
        "category": "pasta",
        "price": 10,
        "__v": 0
        },
        {
        "_id": "660c0e5f745ab6b96dbbacf6",
        "name": "rice",
        "category": "rice",
        "price": 15,
        "__v": 0
        }
        ])

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

    return (
        <div>
            <Header />
            <HeroSection />
              
            <div className="main-container"> 
                <Navbar  />
            {products && <RenderProductCards products={products} />}
            
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