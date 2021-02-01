import React from "react";
import { IconButton, useToast } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import axios from "axios";

function DeleteButton(props: any) {
  const [isDeleting, SetDelete] = React.useState(false);
  const toast = useToast();

  function DeleteDBEntry(id: any) {
    SetDelete(true);
    axios
      .delete(`http://localhost:8080/bugs/${id}`)
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
      w={"4vh"}
      colorScheme="red"
      aria-label="delete Button"
      isLoading={isDeleting}
      fontSize="2.5vh"
      icon={<BiTrash />}
      onClick={() => DeleteDBEntry(props.id)}
    />
  );
}

export default DeleteButton;
