import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://hakims-webshop-1.onrender.com/products/search', { query });
            console.log("search results", res.data);
            setQuery("")
        } catch (error) {
            console.error("Error searchin products", error);
            setQuery("")
        }
    };

    return (

        <div className="Search-container">
            <form className="search-form form-inline border rounded" onSubmit={handleSearch}>
                <input
                    className="form-control mr-sm-2 border-0"
                    type="search"
                    placeholder="search product"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </div>
    )
}

export default SearchBar;