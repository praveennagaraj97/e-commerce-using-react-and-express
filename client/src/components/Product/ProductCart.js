import React from "react";
import { connect } from "react-redux";

import "../../styles/productCart.scss";

const ProductCart = ({ productCart }) => {
  return <div className='product-cart'></div>;
};

const mapStateToProps = ({ productCart }) => ({ productCart });

export default connect(mapStateToProps)(ProductCart);
