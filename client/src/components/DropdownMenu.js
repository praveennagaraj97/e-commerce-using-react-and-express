import React from "react";
import { Dropdown } from "semantic-ui-react";

const DropdownMenu = (props) => {
  const { navItems } = props;
  const navItemsWithKey = [...navItems];

  navItemsWithKey.forEach((item, index) => {
    item.key = index;
    item.text = item.name;
    item.value = item.name;
  });

  return (
    <Dropdown
      style={{ borderRadius: "20px", width: "50vw" }}
      placeholder=''
      fluid
      selection
      options={navItemsWithKey}
    />
  );
};

export default DropdownMenu;
