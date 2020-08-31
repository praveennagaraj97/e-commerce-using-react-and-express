import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

import "../styles/notifier.scss";

const AlertWithImage = ({ showAlert, globalSuccessWithImg }) => {
  if (showAlert && globalSuccessWithImg !== null)
    return (
      <div style={{ color: "white" }} className='show-success-notify-with__img'>
        <img
          className='show-success-notify__image'
          height='70px'
          src={globalSuccessWithImg.image}
          alt='tes'
        />
        <div className='show-success__message'>
          {globalSuccessWithImg.success}
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
  snackBarAnime: {
    animation: "fadeInLeft",
    animationDuration: "0.7s",
  },
}));

const Notifer = ({ error, success, globalSuccessWithImg }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [theme, setTheme] = useState("info");

  useEffect(() => {
    if (globalSuccessWithImg) {
      if (
        globalSuccessWithImg.hasOwnProperty("success") &&
        globalSuccessWithImg.success !== null
      ) {
        setTheme("success");
        setOpen(true);
      }
    }

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
  }, [error, success, globalSuccessWithImg]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {globalSuccessWithImg === null ? (
        <Snackbar
          className={classes.snackBarAnime}
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
      ) : (
        <AlertWithImage
          showAlert={open}
          globalSuccessWithImg={globalSuccessWithImg}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  userAuthorization: { authFailueMessage = null, authSuccessMessage = null },
  globalErrorOrSuccessMessage: {
    globalError = null,
    globalSuccess = null,
    globalSuccessWithImg = null,
  },
}) => ({
  error: authFailueMessage || globalError,
  success: authSuccessMessage || globalSuccess,
  globalSuccessWithImg,
});

export default connect(mapStateToProps, null)(Notifer);
