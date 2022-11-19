import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Shopyzon",
  keywords: "electronic, products, fashion, shopping, clothes",
  description:
    "We sell the top rated products with best price and many varieties.",
};

export default Meta;
