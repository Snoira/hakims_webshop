import React from 'react';


const Navbar = ({ handleSelectCategory, handleResetHome }) => {
  const handleCategory = (category) => {
    handleSelectCategory(category);
  };

  const handleHomeClick = () => {
    handleResetHome();
  };

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
        <li>

          <a href='#' className='nav-link text-dark me-md-auto' onClick={(e) => { e.preventDefault(); handleCategory('Skafferi') }}>
            Skafferi
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Storpack') }}>
            Storpack
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Frukt') }}>
            Frukt
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Grönsaker') }}>
            Grönsaker
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Bröd') }}>
            Bröd
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Kött') }}>
            Kött
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Vegetariskt') }}>
            Vegetariskt
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Mejeri') }}>
            Mejeri
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Bakverk') }}>
            Bakverk
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Snacks') }}>
            Snacks
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Godis') }}>
            Godis
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Glass') }}>
            Glass
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Drycker') }}>
            Drycker
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Hygien') }}>
            Hygien
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={(e) => { e.preventDefault(); handleCategory('Hem och Städning') }}>
            Hem och städning
          </a>
        </li>
      </ul>





    </div>

  )
}

export default Navbar;