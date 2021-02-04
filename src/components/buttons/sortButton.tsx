import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function SortButton() {
  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        m={4}
        rightIcon={<BiChevronDown style={{ transform: "scale(1.3)" }} />}
      >
        Filter
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuGroup title="Status">
          <NavLink exact to="/bugs/status/open">
            <MenuItem value="Open Bugs">Open Bugs</MenuItem>
          </NavLink>
          <NavLink exact to="/bugs/status/closed">
            <MenuItem value="Closed Bugs">Closed Bugs</MenuItem>
          </NavLink>
          <NavLink to="/">
            <MenuItem value="All Bugs">All Bugs</MenuItem>
          </NavLink>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Version">
          <NavLink to="/bugs/version/0.1">
            <MenuItem value={0.1}>0.1</MenuItem>
          </NavLink>
          <NavLink to="/bugs/version/0.2">
            <MenuItem value={0.2}>0.2</MenuItem>
          </NavLink>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default SortButton;
