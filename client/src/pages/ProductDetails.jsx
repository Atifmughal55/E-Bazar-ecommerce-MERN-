import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/related-product/${pid}/${cid}`
      );

      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h1>Product Details</h1>

      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`${API_URL}/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={300}
            width={350}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: ${product.price}</h6>
          <h6>Category: {product.category?.name}</h6>
          <button className="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6 className="text-center">Similar Products</h6>
        {relatedProduct.length < 1 && <p>No similar Products found</p>}
        {relatedProduct.map((prod) => (
          <div className="card m-2" key={prod._id} style={{ width: "18rem" }}>
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
              <button className="btn btn-secondary ms-1">ADD TO CART</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
