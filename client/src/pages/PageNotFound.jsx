import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title={"go back - Page not found"}>
      <div className="pnf">
        <div className="pnf-title">404</div>
        <div className="pnf-heading">Oops...! Page Not Found</div>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PageNotFound;
