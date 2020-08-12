import React, { Component, Fragment } from "react";
import { Menu, Segment, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar";
import DropdownMenu from "../DropdownMenu";
import Cart from "../Product/Cart";
import UserMenu from "../User/UserMenu";

import "../../styles/secondaryHeader.scss";

export default class SecondaryHeader extends Component {
  renderMobileView() {
    return <DropdownMenu navItems={this.props.navItems} />;
  }

  render() {
    const { navItems, windowWidth } = this.props;

    if (windowWidth > 900)
      return (
        <Segment inverted className='secondary-header-menu'>
          <Menu inverted secondary className='secondary-header'>
            {navItems.map(({ name, icon, route }, index) => {
              return (
                <Link to={route} className='nav-links' key={index}>
                  <Button className='nav-links' animated>
                    <Button.Content hidden>{name}</Button.Content>
                    <Button.Content visible>
                      <Icon name={icon} />
                    </Button.Content>
                  </Button>
                </Link>
              );
            })}

            <SearchBar />
            <Cart />
            <UserMenu />
          </Menu>
        </Segment>
      );

    return (
      <Fragment>
        <Segment inverted className='secondary-header-mobile-menu'>
          <Menu inverted secondary className='secondary-header-mobile'>
            <SearchBar />
            {this.renderMobileView()}
            <Cart />
            <UserMenu />
          </Menu>
        </Segment>
      </Fragment>
    );
  }
}
