import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

import axios from "axios";
import API_URL from "../../config.js";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.jsx";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  //Get All Products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  //Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/product-count`
      );

      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadmore();
  }, [page]);
  //load more
  const loadmore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by cat

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get fitered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Products - Best Offers"}>
      <div className="container-fluid row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id} className="">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products.map((prod) => (
                <div
                  className="card m-2"
                  key={prod._id}
                  style={{ width: "18rem" }}
                >
                  <img
                    src={`${API_URL}/api/v1/product/product-photo/${prod._id}`}
                    className="card-img-top"
                    alt={prod.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text">
                      {prod.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">$ {prod.price}</p>
                  </div>
                  <div className="d-flex">
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${prod.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, prod]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, prod])
                        );
                        toast.success("Item added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h2>Products not available</h2>
            )}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
