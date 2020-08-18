import React, { Fragment, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../../history";
import { connect } from "react-redux";

const UserMenu = ({ userAuthorized }) => {
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

  useEffect(() => {
    if (userAuthorized) {
      if (history.location.pathname === "/user_auth") history.goBack();
    }
  }, [userAuthorized]);

  return (
    <Fragment>
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
        {!userAuthorized ? (
          <MenuItem onClick={redirectToAuth}>Login/Create New Account</MenuItem>
        ) : (
          <div>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Saved Address</MenuItem>
            <MenuItem onClick={handleClose}>Whishlist</MenuItem>
          </div>
        )}
        <MenuItem onClick={handleClose}>Settings</MenuItem>
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = ({ userAuthorized }) => ({ userAuthorized });

export default connect(mapStateToProps)(UserMenu);
