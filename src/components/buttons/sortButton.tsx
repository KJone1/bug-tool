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
        Sort
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuGroup title="Status">
          <NavLink to="/">
            <MenuItem value="Open Bugs">Open Bugs</MenuItem>
          </NavLink>
          <NavLink to="/bugs/closed">
            <MenuItem value="Closed Bugs">Closed Bugs</MenuItem>
          </NavLink>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Submitter" type="checkbox">
          <MenuItem value="Guy">Guy</MenuItem>
          <MenuItem value="Dana">Dana</MenuItem>
          <MenuItem value="Yuval">Yuval</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default SortButton;
