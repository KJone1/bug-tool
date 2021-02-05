import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import BugList from "./components/Bug List/openBugList";

import SortButton from "./components/buttons/sortButton";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoadingScreen from "./components/loadingScreen";
import NewBugButton from "./components/buttons/addBugButton";
import colors from "./styles/colors";
import "./styles/fonts.css";

function App() {
  return (
    <Flex
      backgroundColor={colors.jet}
      h="100vh"
      alignItems="center"
      flexDirection="column"
      fontFamily="Arimo"
    >
      <Heading
        color={colors.yellow}
        my={10}
        fontFamily="Arimo"
        letterSpacing="1px"
      >
        bug tool
      </Heading>

      <Router>
        <Stack direction="row">
          <NewBugButton />
          <SortButton />
        </Stack>

        <Switch>
          <Route exact path={`/`}>
            <BugList type="all" />
          </Route>
          <Route exact path={`/bugs/status/open`}>
            <BugList type="status" IsCompleted={false} />
          </Route>
          <Route exact path={`/bugs/status/closed`}>
            <BugList type="status" IsCompleted />
          </Route>
          <Route exact path={`/bugs/version/0.1`}>
            <BugList type="version" VerNum={0.1} />
          </Route>

          <Route exact path={`/bugs/version/0.2`}>
            <BugList type="version" VerNum={0.2} />
          </Route>

          <Route exact path="/error" component={LoadingScreen} />
          <Route>
            <Redirect to="/error" />
          </Route>
        </Switch>
      </Router>
    </Flex>
  );
}

export default App;

// background-color: ;
// min-height: 100vh;
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;
// font-size: calc(10px + 2vmin);
// color: white;
