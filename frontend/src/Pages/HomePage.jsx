
import axios from 'axios';
import RenderProductCards from '../Components/RenderProductCards';
import Header from '../Components/Header';
import { useState, useEffect } from 'react';
import SidebarMenu from '../Components/SidebarMenu';

const HomePage = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
    // const getProducts = async () => {
        axios.get('https://hakims-webshop-1.onrender.com/products/')
            .then(res => {
                console.log(res.data)
                setProducts(res.data)
            }).catch(err => {
                console.log(err)
            })
    // }
    }, [])

    const getProducts = async () => {
        axios.get('https://hakims-webshop-1.onrender.com/products/')
            .then(res => {
                console.log(res.data + "klicka")
                setProducts(res.data)
            }).catch(err => {
                console.log(err)
            })
    }
    
    return (
        <div>
            <Header />

            <h1>Home Page</h1>
            
            { products && <RenderProductCards products={products} /> }
            <button onClick={getProducts} >klicka</button>
            
            <SidebarMenu />
        </div>
    );
}

export default HomePage;