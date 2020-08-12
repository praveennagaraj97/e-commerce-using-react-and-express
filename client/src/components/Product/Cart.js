import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const Cart = () => {
  return (
    <Link className='nav-links' to='/cart'>
      <Button className='nav-links' animated>
        <Button.Content hidden>Cart</Button.Content>
        <Button.Content visible>
          <Icon name='cart' />
        </Button.Content>
      </Button>
    </Link>
  );
};

export default Cart;
