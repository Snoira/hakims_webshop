import axios from 'axios';
import { useState } from 'react';
import RenderProducts from '../Components/admin/renderProducts';
import CreateProduct from '../Components/admin/createProduct';
import CreateCategory from '../Components/admin/createCategory';

const AdminPage = () => {

    return (
        <>
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
        </>
    );
}

export default AdminPage;   