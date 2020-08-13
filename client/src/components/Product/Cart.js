import React from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const StyledBadge = withStyles((theme) => ({
  badge: {},
}))(Badge);

const useStyles = makeStyles((theme) => ({
  cartIcon: {
    padding: "0",
  },
  cartBottonContainer: {
    backgroundColor: "#cacbcd",
    padding: "1vh",
    borderRadius: "3px",
    textAlign: "center",
  },
}));

const Cart = () => {
  const classes = useStyles();
  return (
    <Link className='nav-links' to='/cart'>
      <div className={classes.cartBottonContainer}>
        <IconButton className={classes.cartIcon} aria-label='cart'>
          <StyledBadge badgeContent={1} color='secondary'>
            <ShoppingCartIcon />
          </StyledBadge>
        </IconButton>
      </div>
    </Link>
  );
};

export default Cart;
