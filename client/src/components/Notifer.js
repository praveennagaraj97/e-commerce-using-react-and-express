import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

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

const Notifer = ({ error, success, globalSuccessWithImg }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  console.error(error, success, globalSuccessWithImg);

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

  return (
    <div className={classes.root}>
      {globalSuccessWithImg === null || globalSuccessWithImg.image === null ? (
        <div></div>
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
