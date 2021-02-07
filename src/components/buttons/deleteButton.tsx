import React from "react";
import { IconButton, useToast } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

import axios from "axios";

function DeleteButton(props: any) {
  const [isDeleting, SetDelete] = React.useState(false);
  const toast = useToast();

  function DeleteDBEntry(id: any) {
    SetDelete(true);
    axios
      .delete(`https://kj-api.herokuapp.com/bugs/${id}`)
      .then(() => console.log(":deleted"))
      .then(() =>
        toast({
          title: "Bug Deleted.",
          description: "The bug was Successfully Deleted.",
          status: "success",
          duration: 1500,
          isClosable: true,
        })
      )
      .then(() => SetDelete(false))
      .catch((e) =>
        toast({
          title: "An error occurred.",
          description: `${e}`,
          status: "error",
          duration: 1500,
          isClosable: true,
        })
      )
      .then(() => SetDelete(false));
  }

  return (
    <IconButton
      h={"4vh"}
      w={"3vw"}
      variant="ghost"
      colorScheme="red"
      aria-label="delete Button"
      isLoading={isDeleting}
      fontSize="130%"
      icon={<FiTrash2 />}
      onClick={() => DeleteDBEntry(props.id)}
    />
  );
}

export default DeleteButton;
