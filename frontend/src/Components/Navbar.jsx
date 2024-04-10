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
          <a href="#" className="nav-link active" aria-current="page" onClick={handleHomeClick}>
            {/* Lägg till svg logga här om vi vill */}
            {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>  */}
            Home
          </a>
        </li>
        <li>

          <a href='#' className='nav-link text-dark me-md-auto' onClick={() => handleCategory('Skafferi')}>
            Skafferi
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Storpack')}>
            Storpack
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Frukt')}>
            Frukt
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Grönsaker')}>
            Grönsaker
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Bröd')}>
            Bröd
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Kött')}>
            Kött
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Vegetariskt')}>
            Vegetariskt
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Mejeri')}>
            Mejeri
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Bakverk')}>
            Bakverk
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Snacks')}>
            Snacks
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Godis')}>
            Godis
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Glass')}>
            Glass
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Drycker')}>
            Drycker
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Hygien')}>
            Hygien
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-dark me-md-auto" onClick={() => handleCategory('Hem och Städning')}>
            Hem och städning
          </a>
        </li>
      </ul>





    </div>

  )
}

export default Navbar;