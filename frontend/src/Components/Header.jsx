import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';
import ShoppingCartModal from './CartModal';

const Header = () => {
    const [showCartModal, setShowCartModal] = useState(false);  

    const toggleCartModal  = () => {
        setShowCartModal(prevState => !prevState);
        console.log(showCartModal)
        };


    return (
        <> 
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">

            <div className="header-container d-flex align-items-center justify-content-between ">
                <div className="logo">
                    <Link to="/" ><b>Hakim's</b></Link>
                </div>

                <div className="d-lg-block">
                    <SearchBar />
                </div>

                <div className="d-flex justify-content ml-auto">
                    <div className="d-lg-none">
                        <Link to="/SearchPage" className="nav-link"><FaSearch /></Link>
                    </div>
                    <a className="nav-link" href="#">Logga in</a>
                    <a className="nav-link" onClick={() => toggleCartModal()} >Varukorg</a>
                </div>
            </div>

        </nav>
        {showCartModal && <ShoppingCartModal />}

        
        
        </>
    )
};

export default Header;