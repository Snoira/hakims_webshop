const Navbar = () => {

    return (
        <div className="navbar-container d-flex flex-column flex-shrink-0 p-3 text-bg-dark" >
    <p href="/" className="d-flex text-dark align-items-center justify-content-center mb-3 mb-md-0 text-decoration-none"> 
      <span className="fs-4k">Kategorier</span> 
    </p> 
    <hr />
    <ul className="nav nav-pills flex-column mb-auto"> 

      <li className="nav-item"> 
        <a href="#" className="nav-link active" aria-current="page"> 
        {/* Lägg till svg logga här om vi vill */}
          {/* <svg className="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>  */}
          Home 
        </a> 
      </li> 
      <li> 

<a href="#" className="nav-link text-dark me-md-auto"> 
  Skafferi 
</a> 
</li> 
<li> 
<a href="#" className="nav-link text-dark me-md-auto"> 
  Storpack 
</a> 
</li> 
<li> 
<a href="#" className="nav-link text-dark me-md-auto"> 
  Drycker 
</a> 
</li> 
<li> 
<a href="#" className="nav-link text-dark me-md-auto"> 
  Snacks & Godis 
</a> 
</li> 
      </ul>

      
      


</div>  

    )
}

export default Navbar;