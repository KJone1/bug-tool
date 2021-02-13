import axios from "axios";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  HStack,
  Flex,
  Radio,
  RadioGroup,
  Select,
  Button,
  useToast,
} from "@chakra-ui/react";

const BugForm = () => {
  const [bugName, SetBugName] = useState("");
  const [bugDescription, SetBugDesc] = useState("");
  const [repeatable, SetRepeatable] = useState("false");
  const [submitter, SetSubmitter] = useState("");
  const [version, SetVersion] = useState("");
  const [site, SetSite] = useState("");
  const [priority, SetPriority] = useState("");
  const [soog, SetType] = useState("");
  const [isSubmitting, SetSubmit] = useState(false);
  const toast = useToast();

  function NewDBEntry(e: any) {
    e.preventDefault();
    const newBug = {
      Type: soog,
      BugName: bugName,
      BugDescription: bugDescription,
      Site: site,
      Priority: priority,
      Version: version,
      IsRepeatable: repeatable,
      Submitter: submitter,
    };
    SetSubmit(true);
    axios
      .post("https://kj-api.herokuapp.com/bugs/add", newBug)
      //! .post("http://localhost:8080/bugs/add", newBug)
      .then((_) => console.log(":posted"))
      .then((_) =>
        toast({
          title: "Bug Added.",
          description: "The bug was Successfully recorded.",
          status: "success",
          duration: 1500,
          isClosable: true,
        })
      )
      .then((_) => SetSubmit(false))
      .catch((e) =>
        toast({
          title: "An error occurred.",
          description: `${e}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        })
      )
      .then((_) => SetSubmit(false));
  }

  return (
    <Flex
      display="flex"
      flexDirection="column"
      alignItems="center"
      color="white"
      fontFamily="Arimo"
    >
      <FormControl id="type" mt={4} isRequired>
        <FormLabel>Type</FormLabel>
        <Select onChange={(event) => SetType(event.target.value)}>
          <option style={{ color: "black" }}>Select Type</option>
          <option style={{ color: "black" }} value="bug">
            Bug
          </option>
          <option style={{ color: "black" }} value="task">
            Task
          </option>
        </Select>
      </FormControl>

      <FormControl id="name" mt={4} isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          onChange={(event) => SetBugName(event.target.value)}
          type="name"
        />
      </FormControl>

      {/* ///////// */}

      <FormControl id="description" mt={4}>
        <FormLabel>Description</FormLabel>
        <Input
          onChange={(event) => SetBugDesc(event.target.value)}
          type="description"
        />
      </FormControl>

      {/* ///////// */}

      <FormControl id="version" mt={4} isRequired>
        <FormLabel>Version</FormLabel>
        <Select onChange={(event) => SetVersion(event.target.value)}>
          <option style={{ color: "black" }}>Select Version</option>
          <option style={{ color: "black" }} value={0.1}>
            0.1
          </option>
          <option style={{ color: "black" }} value={0.2}>
            0.2
          </option>
          <option style={{ color: "black" }} value={0.3}>
            0.3
          </option>
        </Select>
      </FormControl>

      {/* ///////// */}
      <FormControl id="Site" isRequired mt={4}>
        <FormLabel>Site</FormLabel>
        <Select onChange={(event) => SetSite(event.target.value)}>
          <option style={{ color: "black" }}>Select Name</option>
          <option style={{ color: "black" }} value="Production">
            Production
          </option>
          <option style={{ color: "black" }} value="Testing">
            Testing
          </option>
        </Select>
      </FormControl>

      <FormControl id="priority" mt={4}>
        <FormLabel>Priority</FormLabel>
        <Select onChange={(event) => SetPriority(event.target.value)}>
          <option style={{ color: "black" }} value={0}>
            Select Priority
          </option>
          <option style={{ color: "black" }} value={1}>
            !
          </option>
          <option style={{ color: "black" }} value={2}>
            !!
          </option>
          <option style={{ color: "black" }} value={3}>
            !!!
          </option>
        </Select>
      </FormControl>

      <FormControl id="Submitter" mt={4}>
        <FormLabel>Submitter</FormLabel>
        <Select onChange={(event) => SetSubmitter(event.target.value)}>
          <option style={{ color: "black" }} value="">
            Select Name
          </option>
          <option style={{ color: "black" }} value="Guy">
            Guy
          </option>
          <option style={{ color: "black" }} value="Dana">
            Dana
          </option>
          <option style={{ color: "black" }} value="Yuval">
            Yuval
          </option>
        </Select>
      </FormControl>

      {soog === "bug" && (
        <FormControl as="fieldset" mt={4} isRequired>
          <FormLabel as="legend">Is Repeatable?</FormLabel>
          <RadioGroup>
            <HStack spacing="24px">
              <Radio
                onChange={(event) => SetRepeatable(event.target.value)}
                value="true"
              >
                Yes
              </Radio>
              <Radio
                onChange={(event) => SetRepeatable(event.target.value)}
                value="false"
              >
                No
              </Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
      )}

      <Button
        isLoading={isSubmitting}
        mt={12}
        mb={4}
        colorScheme="green"
        type="submit"
        letterSpacing="1px"
        onClick={NewDBEntry}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default BugForm;
