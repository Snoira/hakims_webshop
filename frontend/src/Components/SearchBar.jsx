import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [searchRes, setSearchRes] = useState([]);
    const [searching, setSearching] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await axios.get('http://localhost:5173/categories');
                setCategories(res.data);
            } catch (error) {
                console.error("Error fetching Categories ", error);
            }
        }
        fetchCategories();
    }, []);

    const handleSearch = async () => {
        setSearching(true);
        try {
            const res = await axios.post('https://hakims-webshop-1.onrender.com/products/search', { query, category });
            console.log("search results", res.data);
            setSearchRes(res.data);
        } catch (error) {
            console.error("Error searching products", error);
            setSearchRes([]);
        } finally {
            setSearching(false);
        }
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
        if (query.trim() !== '' || category !== '') {
            handleSearch();
        } else {
            setSearchRes([]);
        }
    }, [query, category]);

    const filterResults = (results, searchTerm) => {
        return results.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!category || product.category === category) // Filtrera endast om en kategori har valts
        );
    };


    return (
        <div className="Search-container">
            <div className="search-wrapper" ref={searchRef}>
                <form className="search-form form-inline border rounded">
                    <input
                        className="form-control mr-sm-2 border-0"
                        type="search"
                        placeholder="Search product"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All categories</option>
                        <option value="Bread and Pastries">Bread and Pastries</option>
                        <option value="Fruit">Fruit</option>
                        <option value="Hygiene">Hygiene</option>
                    </select>
                </form>
                {searchRes.length > 0 && (
                    <div className="search-results">
                        <ul className="list-group">
                            {filterResults(searchRes, query).map((product, index) => (
                                <li key={index} className="list-group-item">
                                    {product.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {searching && <div className="searching-indicator">Searching...</div>}
                {!searching && searchRes.length === 0 && query !== '' && (
                    <div className="no-results">No products found for "{query}"</div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
