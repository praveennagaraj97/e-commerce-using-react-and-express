import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import "../styles/notifier.scss";

const AlertWithImage = ({ showAlertWithImage }) => {
  if (showAlertWithImage)
    return (
      <div style={{ color: "white" }} className='show-success-notify-with__img'>
        <img
          className='show-success-notify__image'
          height='70px'
          src='https://storage.googleapis.com/lexa-product-covers/oneplus8glacialgreen.jpg'
          alt='tes'
        />
        <div className='show-success__message'>
          {"OnePlus 8 (Glacial Green 6GB RAM+128GB Storage Added To Cart"}
        </div>
      </div>
    );

  return <></>;
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notifer = ({ error, success }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [theme, setTheme] = useState("info");

  useEffect(() => {
    if (error !== null) {
      setTheme("error");
      setOpen(true);
    }
    if (success !== null) {
      setTheme("success");
      setOpen(true);
    }

    const clearTimeOutID = setTimeout(() => {
      setOpen(false);
    }, 3100);

    return () => clearTimeout(clearTimeOutID);
  }, [error, success]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3100}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        {error !== null || success !== null ? (
          <Alert onClose={handleClose} severity={theme}>
            {error || success}
          </Alert>
        ) : (
          <></>
        )}
      </Snackbar>
      <AlertWithImage showAlertWithImage={true} />
    </div>
  );
};

const mapStateToProps = ({
  userAuthorization: { authFailueMessage = null, authSuccessMessage = null },
}) => ({ error: authFailueMessage, success: authSuccessMessage });

export default connect(mapStateToProps, null)(Notifer);
