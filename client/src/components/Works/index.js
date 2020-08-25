import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { works } from "../data";
import "../../styles/works.scss";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },

  pos: {
    marginBottom: 12,
  },
});

const Works = ({ history }) => {
  const classes = useStyles();

  const workCardsOnClick = (route, event) => {
    history.push(route);
  };

  const workCards = () => {
    return (
      <Fragment>
        {works.map(
          ({
            id,
            workTitle,
            description,
            route,
            create,
            update,
            view,
            destroy,
          }) => {
            return (
              <Card key={id} className={classes.root} variant='outlined'>
                <CardContent>
                  <Typography variant='h5' component='h2'>
                    {workTitle}
                  </Typography>
                  <Typography className={classes.pos} color='textSecondary'>
                    {description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className='crudOperations'>
                    <Button
                      variant='contained'
                      onClick={(ev) => workCardsOnClick(route, ev)}>
                      {create}
                    </Button>
                    <Button
                      variant='contained'
                      onClick={(ev) => workCardsOnClick(route, ev)}>
                      {update}
                    </Button>
                    <Button
                      variant='contained'
                      onClick={(ev) => workCardsOnClick(route, ev)}>
                      {view}
                    </Button>
                    <Button
                      variant='contained'
                      onClick={(ev) => workCardsOnClick(route, ev)}>
                      {destroy}
                    </Button>
                  </div>
                </CardActions>
              </Card>
            );
          }
        )}
      </Fragment>
    );
  };

  return <div className='works-column'>{workCards()}</div>;
};

export default withRouter(Works);
