import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import BugForm from "../bugform";
import colors from "../../styles/colors";

function NewBugButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>New</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        autoFocus={false}
      >
        <ModalOverlay filter="blur(8px)" />
        <ModalContent
          h={"80%"}
          bgColor={colors.jet}
          color="white"
          borderRadius="5px"
        >
          <ModalHeader color="white">Add New Bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="scroll">
            <BugForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewBugButton;
