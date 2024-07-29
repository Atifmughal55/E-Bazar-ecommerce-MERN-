import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import API_URL from "../../../config";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProducts = () => {
  const { option } = Select;
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhote] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shippging, setShipping] = useState("");
  const [id, setId] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shippging);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  //Create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.put(
        `${API_URL}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product update successfully");
        navigate(`/dashboard/admin/products`);
      } else {
        toast.error(data?.messge);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  //Get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleDelete = async () => {
    try {
      let answer = window.prompt('Type "yes" you want to delete this product');
      if (!answer) return;
      const { data } = await axios.delete(
        `${API_URL}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product deleted successfully");
      navigate(`/dashboard/admin/products`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in deleting product");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                variant="borderless"
                placeholder="select a category"
                size="large"
                showSearch
                className="from-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="images/*"
                    onChange={(e) => setPhote(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${API_URL}/api/v1/product/product-photo/${id}`}
                      alt="Product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write a price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  variant="borderless"
                  placeholder="Select Shipping"
                  size="large"
                  className="form-control mb-3"
                  onChange={(value) => setShipping(value)}
                  value={shippging ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3 d-flex gap-2">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;
