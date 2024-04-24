// Navbar.js
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Navbar = ({ handleSelectCategory, handleResetHome, handleSort, sortOption }) => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/categories");
        const res = await axios.get('https://hakims-webshop-1.onrender.com'+"/categories");
        setCategoryList(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="navbar-container d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
      <p href="/" className="d-flex text-dark align-items-center justify-content-center mb-3 mb-md-0 text-decoration-none">
        <span className="fs-4k">Kategorier</span>
      </p>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" style={{ backgroundColor: '#2b613b' }} aria-current="page" onClick={(e) => { e.preventDefault(); handleResetHome(); }}>
            Home
          </a>
        </li>
        <div className="dropdown-container">
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            <select onChange={handleSort} value={sortOption}>
              <option value="default">Sortera efter</option>
              <option value="lowToHigh">Pris: Lågt till högt</option>
              <option value="highToLow">Pris: Högt till lågt</option>
            </select>
          </div>
        </div>
        {categoryList && categoryList.map((category, i) => (
          <li key={i}>
            <a href='#' className='nav-link text-dark me-md-auto' onClick={(e) => { e.preventDefault(); handleSelectCategory(category.name); }}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
