import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import API_URL from "../../../config";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/get-products`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products.map((prod) => (
                <Link
                  key={prod._id}
                  to={`/dashboard/admin/product/${prod.slug}`}
                  className="product-link"
                >
                  <div className="card m-2 " style={{ width: "18rem" }}>
                    <img
                      src={`${API_URL}/api/v1/product/product-photo/${prod._id}`}
                      className="card-img-top"
                      alt={prod.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{prod.name}</h5>
                      <p className="card-text">{prod.description}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h2>Products not available</h2>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
