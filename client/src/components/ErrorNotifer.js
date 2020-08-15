import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";

const ErrorNotifer = (props) => {
  const [showError, setShowError] = useState(false);

  const { loginFailure } = props;

  useEffect(() => {
    if (loginFailure) setShowError(true);

    const timeOutId = setTimeout(() => {
      setShowError(false);
    }, 2000);

    return () => clearTimeout(timeOutId);
  }, [loginFailure]);

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={showError}
        onClose={handleClose}
        message={loginFailure}
      />
    </Fragment>
  );
};

const mapStateToProps = ({ loginFailure }) => ({
  loginFailure,
});

export default connect(mapStateToProps, null)(ErrorNotifer);
