import { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useToaster } from "../../Context/Toaster.context";

const ProductCardAdmin = ({ product, categoryList }) => {
  const [editMode, setEditMode] = useState(false);
  const [productDeleted, setProductDeleted] = useState(false);

  const { successToaster } = useToaster();

  const updateProduct = async (values) => {
    const {
      name,
      category,
      brand,
      amount,
      price,
      comparisonPrice,
      imageURL,
      description,
    } = values;
    try {
      // const res = await axios.put('https://hakims-webshop-1.onrender.com'+`/products/edit/${product._id}`, { name, category, brand, amount, price, comparisonPrice, imageURL, description }); // (params)${product._id}
        const res = await axios.put(
          import.meta.env.VITE_BACKEND_URL + `/products/edit/${product._id}`,
          {
            name,
            category,
            brand,
            amount,
            price,
            comparisonPrice,
            imageURL,
            description,
          }
        ); // (params)${product._id}
      // const res = await axios.put(
      //   "http://localhost:8000" + `/products/edit/${product._id}`,
      //   {
      //     name,
      //     category,
      //     brand,
      //     amount,
      //     price,
      //     comparisonPrice,
      //     imageURL,
      //     description,
      //   }
      // ); // (params)${product._id}
      console.log(category);
      if (res.status === 200) {
        console.log("updated product:", res.data);
        setEditMode(false);
        successToaster(name, "updated");
      } else {
        console.error("Unexpected status code:", res.status);
      }
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  const deleteProduct = async () => {
    try {
      const res = await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/products/delete/${product._id}`
      );
      // const res = await axios.delete('https://hakims-webshop-1.onrender.com'+`/products/delete/${product._id}`);
      if (res.status === 200) {
        console.log("deleted product:", res.data);
        setEditMode(false);
        successToaster(product.name, "deleted");
        setProductDeleted(true);
      }
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-sm-4">
            <img
              src={product.imageURL}
              alt="..."
              style={{ maxWidth: "300px", objectFit: "contain" }}
            />
          </div>
          <div className="col-sm-8">
            {!editMode ? (
              <div className="card-body">
                <h4 className="card-title, font-bold">{product.name}</h4>
                <div className="row">
                  <div className="col">
                    <p className="font-bold">{product.brand}</p>
                    <p className="font-bold">{product.category.name}</p>
                  </div>
                  <div className="col">
                    <p className="font-bold">{product.amount}</p>
                    <p className="font-bold">{product.price} sek</p>
                    <p className="font-bold">{product.comparisonPrice}</p>
                  </div>
                </div>
                <p className="card-text">{product.description}</p>
                {!productDeleted && (
                  <button
                    className="btn btn-primary button font-bold"
                    onClick={() => {
                      setEditMode(!editMode);
                    }}
                  >
                    Redigera
                  </button>
                )}
              </div>
            ) : (
              <div className="card-body">
                <ProductForm
                  product={product}
                  categoryList={categoryList}
                  submitFunction={updateProduct}
                  setEditMode={setEditMode}
                  deleteFunction={deleteProduct}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardAdmin;
