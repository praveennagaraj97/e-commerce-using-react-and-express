import React, { Fragment } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import HomePage from "./Pages/HomePage";
import CategoryPage from "./Pages/CategoryPage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: "grey",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar className={classes.navbar} position='static'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Lexa
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <BrowserRouter>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/category' component={CategoryPage} />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
