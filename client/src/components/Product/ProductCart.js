import React from "react";
import { connect } from "react-redux";

import "../../styles/productCart.scss";

const ProductCart = ({ state }) => {
  console.log(state);
  return <div className='producr-cart'></div>;
};

const mapStateToProps = (state) => ({ state });

export default connect(mapStateToProps)(ProductCart);
