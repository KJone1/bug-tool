import React from "react";
import { IconButton, useToast } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

import axios from "axios";

function CompleteButton(props: any) {
  const [isCompleting, SetComplete] = React.useState(false);
  const toast = useToast();

  function IsCompeted(
    id: any,
    name: any,
    desc: any,
    ver: any,
    rep: any,
    submitter: any
  ) {
    SetComplete(true);
    const newBug = {
      BugName: name,
      BugDescription: desc,
      BugVersion: ver,
      IsRepeatable: rep,
      Submitter: submitter,
      IsCompeted: true,
    };

    axios
      .post(`https://kj-api.herokuapp.com/bugs/complete/${id}`, newBug)
      .then((_) => console.log(":completed"))
      .then(() =>
        toast({
          title: "Bug Completed.",
          description: "The bug was Completed.",
          status: "success",
          duration: 1500,
          isClosable: true,
        })
      )
      .then(() => SetComplete(false))

      .catch((e) =>
        toast({
          title: "An error occurred.",
          description: `${e}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        })
      )
      .then(() => SetComplete(false));
  }

  return (
    <IconButton
      colorScheme="green"
      variant="ghost"
      aria-label="Complete Button"
      isLoading={isCompleting}
      fontSize="200%"
      icon={<FiCheck />}
      onClick={() => {
        IsCompeted(
          props.id,
          props.BugName,
          props.BugDescription,
          props.Version,
          props.IsRepeatable,
          props.Submitter
        );
      }}
    />
  );
}

export default CompleteButton;
