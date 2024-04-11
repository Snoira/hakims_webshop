import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Navbar = ({ handleSelectCategory, handleResetHome }) => {
  const [categoryList, setCategoryList] = useState([]);

  const handleCategory = (category) => {
    handleSelectCategory(category);
  };

  const handleHomeClick = () => {
    handleResetHome();
  };

  useEffect(() => {
    
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://hakims-webshop-1.onrender.com/categories/');
        console.log("categories:", res.data);
        setCategoryList(res.data);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    }
    if(categoryList.length === 0){fetchCategories();}
  })

  return (
    <div className="navbar-container d-flex flex-column flex-shrink-0 p-3 text-bg-dark" >
      <p href="/" className="d-flex text-dark align-items-center justify-content-center mb-3 mb-md-0 text-decoration-none">
        <span className="fs-4k">Kategorier</span>
      </p>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a href="#" className="nav-link active" aria-current="page" onClick={(e) => { e.preventDefault(); handleHomeClick(); }}>
            {/* Lägg till svg logga här om vi vill */}
            {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>  */}
            Home
          </a>
        </li>
    {categoryList && categoryList.map((category, i) => {
        return (
          <li key={i}>
            <a href='#' className='nav-link text-dark me-md-auto' onClick={(e) => { e.preventDefault(); handleCategory(category.name) }}>
              {category.name}
            </a>
          </li>
        )
    })}
      </ul>
    </div>

  )
}

export default Navbar;