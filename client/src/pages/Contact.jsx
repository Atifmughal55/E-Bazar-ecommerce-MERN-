import React from "react";
import Layout from "../components/layout/Layout";
import { GiEnvelope, GiLifeSupport, GiPhone } from "react-icons/gi";

const Contact = () => {
  const imageURL =
    "data:image/jpeg;base64,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";
  return (
    <Layout title={"Contact us - E-bazar"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img src={imageURL} alt="contact-us" style={{ width: "100%" }} />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
          <p className="text-justify mt-2">
            ant query and info about products feel free to call anytime we 24X7
            available.
          </p>
          <p className="mt-3">
            <GiEnvelope /> : help@ebazae.com
          </p>

          <p className="mt-3">
            <GiPhone /> : +123456789
          </p>
          <p className="mt-3">
            <GiLifeSupport /> : +1800-0000-000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
