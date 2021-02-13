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
import axios from "axios";

function SortButton() {
  const [availableVersion, setAvailableVersion] = React.useState<any>([]);

  //desc: update Menu only first time website loads
  React.useEffect(() => {
    axios
      .get("https://kj-api.herokuapp.com/bugs/filterByVerParams")
      //! axios.get("http://localhost:8080/bugs/filterByVerParams")
      .then((response) => {
        setAvailableVersion(response.data);
        console.log("got params");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //desc: update Menu every time model is opened \ add onOpen={getVersionParams} as Menu param
  // function getVersionParams() {
  //   axios
  //     .get("http://localhost:8080/bugs/filterByVerParams")
  //     .then((response) => {
  //       setAvailableVersion(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

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
          {availableVersion.map((obj: number, index: number) => (
            <NavLink key={index} to={`/bugs/version/${obj}`}>
              <MenuItem value={`${obj}`}>{`${obj}`}</MenuItem>
            </NavLink>
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}

export default SortButton;
