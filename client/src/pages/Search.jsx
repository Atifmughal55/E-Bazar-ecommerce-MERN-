import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/layout/Layout";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((prod) => (
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
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
