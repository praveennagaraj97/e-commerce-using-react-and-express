import React from "react";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../../history";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToAuth = () => {
    handleClose();
    history.push("/user_auth");
  };

  return (
    <div>
      <Button
        style={{ width: "12vw" }}
        aria-controls='simple-menu'
        aria-haspopup='true'
        className='nav-links'
        onClick={handleClick}
        animated>
        <Button.Content hidden>Account</Button.Content>
        <Button.Content visible>
          <Icon name='user' />
        </Button.Content>
      </Button>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>Saved Address</MenuItem>
        <MenuItem onClick={handleClose}>Whishlist</MenuItem>

        <MenuItem onClick={redirectToAuth}>Login/Create New Account</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
