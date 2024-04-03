import { Link } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';

const SearchPage = () => {
    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center flex-column vh-100">
                <h1>SearchPage</h1>
                <div className="search-bar-container">
                    <SearchBar />
                </div>
            </div>
        </>
    )
}

export default SearchPage;