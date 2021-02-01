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

function NewBugButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>New Bug</Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay filter="blur(8px)" />
        <ModalContent bgColor="#282c34" color="white">
          <ModalHeader color="white">Add New Bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <BugForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewBugButton;
