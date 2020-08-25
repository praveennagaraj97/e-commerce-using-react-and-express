import React, { useEffect } from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LoadingSpinner from "./LoadingSpinner";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "auto",
    outline: "none",
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalLoader = ({ crudStatus }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (crudStatus.crudOperation) {
      setOpen(true);
    }
    if (!crudStatus.crudOperation) {
      setOpen(false);
    }
  }, [crudStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <LoadingSpinner />
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'>
        {body}
      </Modal>
    </div>
  );
};

const mapStatetoProps = ({ crudStatus }) => ({
  crudStatus,
});

export default connect(mapStatetoProps)(ModalLoader);
