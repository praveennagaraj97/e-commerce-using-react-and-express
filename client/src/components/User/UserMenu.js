import React, { Fragment, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";

import history from "../../history";
// import { loadLogout } from "../../actions";

const UserMenu = ({ userAuthorized, loadLogout, logoutSuccess }) => {
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

  const onClickLogout = () => {
    handleClose();
    loadLogout();
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
        {!userAuthorized && !logoutSuccess ? (
          <MenuItem onClick={redirectToAuth}>Login/Create New Account</MenuItem>
        ) : (
          <div>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Saved Address</MenuItem>
            <MenuItem onClick={handleClose}>Whishlist</MenuItem>
          </div>
        )}
        <MenuItem onClick={handleClose}>Settings</MenuItem>

        {userAuthorized && !logoutSuccess ? (
          <MenuItem onClick={onClickLogout}>LogOut</MenuItem>
        ) : (
          ""
        )}
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = ({ userAuthorized, logoutSuccess }) => ({
  userAuthorized,
  logoutSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  // loadLogout: () => dispatch(loadLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
