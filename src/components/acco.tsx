import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  HStack,
  useDisclosure,
  Text,
  Icon,
  Badge,
} from "@chakra-ui/react";
import CompleteButton from "./buttons/completeButton";
import DeleteButton from "./buttons/deleteButton";
import colors from "../styles/colors";
import day from "dayjs";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { AiFillBug } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import { FiRepeat } from "react-icons/fi";

const PriorityIconMap: any = {
  "1": FcLowPriority,
  "2": FcMediumPriority,
  "3": FcHighPriority,
};

const PriorityNameMap: any = {
  "1": "High",
  "2": "Urgent",
  "3": "Critical",
};

const TypeIconMap: any = [AiFillBug, BiTask];

export default function Expend(array: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="unstyled" p={2} bgColor={colors.yellow} onClick={onOpen}>
        <HStack>
          <Text>Expand</Text>{" "}
          <HiOutlineArrowsExpand style={{ transform: "scale(1.2)" }} />
        </HStack>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        autoFocus={false}
      >
        <DrawerOverlay>
          <DrawerContent fontFamily="Arimo">
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">{array.BugName}</DrawerHeader>

            <DrawerBody>
              {/* // desc : Description */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {` ${
                  array.BugDescription
                    ? `Description : ${array.BugDescription}`
                    : "Description : None"
                }`}
              </Text>

              {/* // desc : Submitter */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {` ${
                  array.Submitter
                    ? `Created By : ${array.Submitter}`
                    : "Created By : User"
                }`}
              </Text>

              {/* // desc : Date Created */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {`Created On :  ${day(array.createdAt).format("DD/MM/YYYY")}`}
              </Text>

              {/* // desc : Version */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {`Version : ${array.Version}`}
              </Text>

              {/* // desc : Status */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {` ${array.IsComplete ? `Status : Closed` : `Status : Open`}`}
              </Text>

              {/* // desc : Site */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {`Site : ${array.Site}`}
              </Text>

              {/* // desc : Type */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {`Type : ${array.Type} `}
                <Icon
                  as={array.Type === "bug" ? TypeIconMap[0] : TypeIconMap[1]}
                  color="black"
                  px={1}
                  transform="scale(1.5)"
                ></Icon>
              </Text>

              {/* // desc : Priority */}
              {array.Priority ? (
                <Text
                  color={colors.coralBlack}
                  fontSize="2.5vh"
                  fontWeight="500"
                >
                  {`Priority : ${PriorityNameMap[array.Priority]}`}
                  <Icon
                    as={PriorityIconMap[array.Priority]}
                    alignSelf="center"
                    px={1}
                    mx={2}
                    transform="scale(2.0)"
                  ></Icon>
                </Text>
              ) : (
                <Text
                  color={colors.coralBlack}
                  fontSize="2.5vh"
                  fontWeight="500"
                >
                  Priority : Normal
                </Text>
              )}
              {/* // desc : Is Repeatable */}
              <Text color={colors.coralBlack} fontSize="2.5vh" fontWeight="500">
                {`Repeating : 
                  ${array.IsRepeatable ? "Yes" : "No"}`}

                {array.IsRepeatable && (
                  <Badge
                    alignSelf="center"
                    p={1}
                    mx={2}
                    borderRadius="5px"
                    colorScheme="red"
                  >
                    <FiRepeat />
                  </Badge>
                )}
              </Text>

              {/* // desc : Delete and Complete Buttons */}
              <HStack
                spacing={"10px"}
                alignSelf="center"
                justifyContent="center"
              >
                <DeleteButton id={array._id} />
                {!array.IsComplete && <CompleteButton id={array._id} />}
              </HStack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
