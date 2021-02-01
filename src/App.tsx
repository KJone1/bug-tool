import React from "react";
import { Flex, Heading, Stack } from "@chakra-ui/react";
import BugList from "./components/Bug List/openBugList";
import BugForm from "./components/bugform";
import ClosedBugs from "./components/Bug List/closedBugList";
import SortButton from "./components/buttons/sortButton";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoadingScreen from "./components/loadingScreen";
import NewBugButton from "./components/buttons/addBugButton";

// import BugForm from "./components/bugform";

function App() {
  return (
    <Flex
      backgroundColor="#282c34"
      h="100vh"
      alignItems="center"
      flexDirection="column"
    >
      <Heading color="white" my={10}>
        bug tool
      </Heading>
      <Router>
        <Stack direction="row">
          <NewBugButton />
          <SortButton />
        </Stack>

        <Switch>
          <Route exact path={`/`} component={BugList} />
          <Route path={`/bugs/closed`} component={ClosedBugs} />

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
