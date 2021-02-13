import React from "react";
import { Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import BugList from "./components/Bug List/openBugList";
import SortButton from "./components/buttons/sortButton";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingScreen from "./components/loadingScreen";
import NewBugButton from "./components/buttons/addBugButton";
import colors from "./styles/colors";
import "./styles/fonts.css";
import axios from "axios";
import EmptyScreen from "./components/emptyScreen";

export default function App() {
  const [versionPath, setVersionPath] = React.useState<any>([]);
  React.useEffect(() => {
    axios
      .get("https://kj-api.herokuapp.com/bugs/filterByVerParams")
      //! axios.get("http://localhost:8080/bugs/filterByVerParams")
      .then((response) => {
        setVersionPath(response.data);
        console.log("got params");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Flex
      backgroundColor={colors.jet}
      h="100vh"
      alignItems="center"
      flexDirection="column"
      fontFamily="Arimo"
    >
      <Router>
        <HStack mb={5} mt={10} spacing="50px">
          <Heading
            color={colors.yellow}
            fontFamily="Arimo"
            letterSpacing="1px"
            alignSelf="baseline"
          >
            Lite BT
          </Heading>
          <Stack direction="row">
            <NewBugButton />
            <SortButton />
          </Stack>
        </HStack>

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
          {/* <Route path={`/bugs/version/0.1`}>
            <BugList type="version" versionNum={0.1} />
          </Route>

         */}
          {versionPath.map((pathID: number) => (
            <Route key={`${pathID}`} path={`/bugs/version/${pathID}`}>
              <BugList type="version" versionNum={pathID} />
            </Route>
          ))}
          <Route exact path="/error" component={LoadingScreen} />
          <Route>
            <EmptyScreen />
          </Route>
        </Switch>
      </Router>
    </Flex>
  );
}
