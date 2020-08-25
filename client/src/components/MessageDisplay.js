import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const MessageDisplay = ({ message, show, type }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {show ? <Alert severity={type}>{message}</Alert> : ""}
      {/* <Alert severity='warning'>This is a warning alert — check it out!</Alert>
      <Alert severity='info'>This is an info alert — check it out!</Alert>
      <Alert severity='success'>This is a success alert — check it out!</Alert> */}
    </div>
  );
};

export default MessageDisplay;
