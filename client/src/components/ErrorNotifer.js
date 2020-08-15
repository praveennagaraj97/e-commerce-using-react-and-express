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

const ErrorNotifer = ({ errors }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (errors !== null) setOpen(true);

    const clearTimeOutID = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => clearTimeout(clearTimeOutID);
  }, [errors]);

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
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={handleClose} severity='error'>
          {errors}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = ({ loginFailure }) => ({
  errors: loginFailure,
});

export default connect(mapStateToProps, null)(ErrorNotifer);
