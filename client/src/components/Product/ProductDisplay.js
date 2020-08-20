import React from "react";

import history from "../../history";

const ProductDisplay = () => {
  return <h1 style={{ color: "white" }}>{history.location.pathname}</h1>;
};

export default ProductDisplay;
