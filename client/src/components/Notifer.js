import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

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
    </div>
  );
};

const mapStateToProps = ({
  userAuthorization: { authFailueMessage = null, authSuccessMessage = null },
}) => ({ error: authFailueMessage, success: authSuccessMessage });

export default connect(mapStateToProps, null)(Notifer);
