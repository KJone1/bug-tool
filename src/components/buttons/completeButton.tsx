import React from "react";
import { useToast, Button } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

import axios from "axios";

function CompleteButton(props: any) {
  const [isCompleting, SetCompleteState] = React.useState(false);
  const toast = useToast();

  function IsCompeted(id: any) {
    SetCompleteState(true);

    axios
      .post(`https://kj-api.herokuapp.com/bugs/complete/${id}`)
      //! .post(`http://localhost:8080/bugs/setComplete/${id}`)
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
      .then(() => SetCompleteState(false))

      .catch((e) =>
        toast({
          title: "An error occurred.",
          description: `${e}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        })
      )
      .then(() => SetCompleteState(false));
  }

  return (
    <Button
      colorScheme="green"
      variant="ghost"
      aria-label="Complete Button"
      isLoading={isCompleting}
      onClick={() => {
        IsCompeted(props.id);
      }}
    >
      Complete <FiCheck />
    </Button>
  );
}

export default CompleteButton;
