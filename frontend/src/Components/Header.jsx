
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <div className="header-container d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <p>Hakim's</p>
                    </div>
                    <form className="search-form form-inline border rounded">
                        <input className="form-control mr-sm-2 border-0" type="search" placeholder="Sök" aria-label="Sök" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sök</button>
                    </form>
                    <div className="ml-auto">
                        <a className="nav-link" href="#">Logga in</a>
                        <a className="nav-link" href="#">Varukorg</a>
                    </div>
                </div>
            </div>
        </nav>
    )
};

export default Header;