const SearchBar = () => {
    return (

        <div className="Search-container">
            <form className="search-form form-inline border rounded">
                <input className="form-control mr-sm-2 border-0" type="search" placeholder="search product" aria-label="Sök" />
            </form>
        </div>
    )
}

export default SearchBar;