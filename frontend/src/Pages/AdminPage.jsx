import axios from 'axios';
import { useState } from 'react';
import RenderProducts from '../Components/admin/renderProducts';
import CreateProduct from '../Components/admin/createProduct';
import CreateCategory from '../Components/admin/createCategory';
import RenderCategories from '../Components/admin/RenderCategories';
import Header from '../Components/Header';

const AdminPage = () => {

    return (
        <>
            <Header />
            <h1>Admin Page</h1>

            <div>
                <h2>Create Product:</h2>
                <CreateProduct />
            </div>

            <div>
                <h2>Products:</h2>
                <RenderProducts />
            </div>

            <div>
                <h2>Create Category:</h2>
                <CreateCategory />
            </div>
            <div>
                <h2>Categories:</h2>
                <RenderCategories />
            </div>
        </>
    );
}

export default AdminPage;   