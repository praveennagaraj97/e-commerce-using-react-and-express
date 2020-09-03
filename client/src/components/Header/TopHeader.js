import React, { Component, Fragment } from "react";
import { Menu, Segment, Icon, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import SearchBar from "../SearchBar";
import DropdownMenu from "../DropdownMenu";
import CartIcon from "../Product/CartIcon";
import UserMenu from "../User/UserMenu";

import "../../styles/topHeader.scss";
import history from "../../history";

export default class TopHeader extends Component {
  renderMobileView() {
    return <DropdownMenu navItems={this.props.navItems} />;
  }

  render() {
    const { navItems } = this.props;

    if (window.innerWidth > 702)
      return (
        <Segment inverted className='top-header-menu'>
          <Menu inverted secondary className='top-header'>
            <div
              onClick={() => history.push("/")}
              className='top-header-brand__name'>
              Lexa
            </div>
            {navItems.map(({ name, icon, route }) => {
              return (
                <Link to={route} className='nav-links' key={name}>
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
            <CartIcon />
            <UserMenu />
          </Menu>
        </Segment>
      );

    return (
      <Fragment>
        <div className='top-header-brand__name'>Lexa</div>
        <Segment inverted className='top-header-mobile-menu'>
          <Menu inverted secondary className='top-header-mobile'>
            {this.renderMobileView()}
            <SearchBar />
            <CartIcon />
            <UserMenu />
          </Menu>
        </Segment>
      </Fragment>
    );
  }
}
