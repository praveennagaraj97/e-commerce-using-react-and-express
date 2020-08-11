import React, { Component, Fragment } from "react";
import { Menu, Segment, Icon, Button } from "semantic-ui-react";

import SearchBar from "../SearchBar";
import DropdownMenu from "../DropdownMenu";
import "../../styles/secondaryHeader.scss";

export default class SecondaryHeader extends Component {
  state = { isSignedIn: false };

  renderMobileView() {
    return <DropdownMenu navItems={this.props.navItems} />;
  }

  render() {
    const { navItems, windowWidth } = this.props;

    if (windowWidth > 900)
      return (
        <Segment inverted className='secondary-header-menu'>
          <Menu inverted secondary className='secondary-header'>
            {navItems.map(({ name, icon }, index) => {
              if (this.state.isSignedIn === true) {
                if (name === "Login") {
                  name = "Logout";
                }
              }
              return (
                <Button className='nav-links' animated key={index}>
                  <Button.Content hidden>{name}</Button.Content>
                  <Button.Content visible>
                    <Icon name={icon} />
                  </Button.Content>
                </Button>
              );
            })}

            <SearchBar />
          </Menu>
        </Segment>
      );

    return (
      <Fragment>
        <Segment inverted className='secondary-header-mobile-menu'>
          <Menu inverted secondary className='secondary-header-mobile'>
            <SearchBar />
            {this.renderMobileView()}
          </Menu>
        </Segment>
      </Fragment>
    );
  }
}
