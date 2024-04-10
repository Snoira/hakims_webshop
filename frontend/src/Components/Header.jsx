import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';
import ShoppingCartModal from './CartModal';



const Header = ({ handleResetHome }) => {
    const [showCartModal, setShowCartModal] = useState(false);
    const cartModalRef = useRef();

    const toggleCartModal = () => {
        setShowCartModal(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartModalRef.current && !cartModalRef.current.contains(event.target)) {
                setShowCartModal(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Återställ filter för produkter när "Home" klickas på
    const handleHomeClick = () => {
        handleResetHome();
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">

                <div className="header-container d-flex align-items-center justify-content-between ">
                    <div className="logo">
                        <Link to="/" onClick={handleHomeClick}><b>Hakim Livs</b></Link>
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
            {showCartModal &&
                <div ref={cartModalRef}>
                    <ShoppingCartModal
                    />
                </div>}



        </>
    )
};

export default Header;