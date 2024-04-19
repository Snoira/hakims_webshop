import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SearchBar = ({ openPopup }) => {
    const [query, setQuery] = useState('');
    const [searchRes, setSearchRes] = useState([]);
    const [searching, setSearching] = useState(false);
    const searchRef = useRef(null);

    const handleSearch = async () => {
        setSearching(true);
        try {
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL+'/products/search', { query });
            setSearchRes(res.data);
        } catch (error) {
            console.error("Error searching products", error);
            setSearchRes([]);
        } finally {
            setSearching(false);
        }
    };

    const handleProductClick = (product) => {
        openPopup(product);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setQuery('');
                setSearchRes([]);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (query.trim() !== '') {
            handleSearch();
        } else {
            setSearchRes([]);
        }
    }, [query]);

    return (
        <div className="Search-container">
            <div className="search-wrapper" ref={searchRef} style={{ position: "relative" }}>
                <form className="search-form form-inline border rounded">
                    <input
                        className="form-control mr-sm-2 border-0"
                        type="search"
                        placeholder="Search product"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </form>
                {(searching || searchRes.length > 0) && (
                    <div className="search-results" style={{ position: "absolute", top: "calc(100% + 10px)", left: "0", backgroundColor: "#fff", zIndex: "100", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "4px", minWidth: "500px" }}>
                        <ul className="list-group">
                            {searchRes.map((product, index) => (
                                <li key={index} className="list-group-item" onClick={() => handleProductClick(product)}>
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                        {searching && <div className="searching-indicator">Searching...</div>}
                        {!searching && searchRes.length === 0 && query !== '' && (
                            <div className="no-results">No products found for "{query}"</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}

export default SearchBar;
