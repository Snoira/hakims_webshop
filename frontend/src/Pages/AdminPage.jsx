// import axios from 'axios';
// import { useState } from 'react';
import RenderProducts from '../Components/admin/renderProducts';
import CreateProduct from '../Components/admin/createProduct';
import CreateCategory from '../Components/admin/createCategory';
import RenderCategories from '../Components/admin/RenderCategories';
import Header from '../Components/Header';

const AdminPage = () => {

    return (
        <>
            <Header />
            <div style={{ marginTop:'100px' }}>

                <div style={{display: 'grid', placeItems: 'center'}}>
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
            </div>
        </>
    );
}

export default AdminPage;   