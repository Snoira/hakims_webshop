
import axios from 'axios';
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';
import { useState } from 'react';

const HomePage = () => {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        axios.get('https://hakims-webshop-1.onrender.com/products/')
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <Header />

            <h1>Home Page</h1>
            <RenderProductCards products={products} />
            <button onClick={getProducts} >klicka</button>
        </div>
    );
}

export default HomePage;