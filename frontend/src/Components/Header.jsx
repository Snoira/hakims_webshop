import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "./SearchBar";
import ShoppingCartModal from "./CartModal";
import { useCart } from "../Context/Cart.contex";

const Header = ({ handleResetHome }) => {
  const [showCartModal, setShowCartModal] = useState(false);
  const cartModalRef = useRef();
  const cart = useCart();

    let totalQuantity = 0;

    if (cart) {
      totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    }


  const toggleCartModal = () => {
    setShowCartModal((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartModalRef.current &&
        !cartModalRef.current.contains(event.target)
      ) {
        setShowCartModal(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
            <Link to="/" onClick={handleHomeClick}>
              <b>Hakim Livs</b>
            </Link>
          </div>

          <div className="d-lg-block">
            <SearchBar />
          </div>

          <div className="d-flex justify-content ml-auto">
            <div className="d-lg-none">
              <Link to="/SearchPage" className="nav-link">
                <FaSearch />
              </Link>
            </div>
            {/* <a className="nav-link" href="#">Logga in</a> */}
            <Link className="nav-link" to="/admin">
              Logga in
            </Link>
           <a className="nav-link" onClick={() => toggleCartModal()}>
              <svg
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <span className="position-absolute translate-middle badge rounded-pill bg-danger icon-num">
                {totalQuantity}
              </span>
            </a>

          </div>
        </div>
      </nav>
      {showCartModal && (
        <div ref={cartModalRef}>
          <ShoppingCartModal />
        </div>
      )}
    </>
  );
};

export default Header;
