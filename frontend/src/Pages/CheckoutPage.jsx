import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CheckOut from '../Components/Checkout';

const CheckoutPage = () => {
    


    return (
        <>
            <Header />
            <div>
                <CheckOut />
            </div>

            <Footer />
        </>
    )
}

export default CheckoutPage;