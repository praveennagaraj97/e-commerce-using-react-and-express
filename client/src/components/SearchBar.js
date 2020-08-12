import React, { Component } from "react";
import { Search, Grid } from "semantic-ui-react";

import "../styles/searchBar.scss";

export default class SearchBar extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <Search />
        </Grid.Column>
      </Grid>
    );
  }
}
