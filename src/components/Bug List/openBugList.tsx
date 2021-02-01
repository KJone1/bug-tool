import React, { useState } from "react";
import {
  Badge,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Checkbox,
  Tag,
  TagLabel,
  Box,
} from "@chakra-ui/react";
import http from "../../axios";
import LoadingScreen from "../loadingScreen";
import CompleteButton from "../buttons/completeButton";
import day from "dayjs";
import axios from "axios";
import DeleteButton from "../buttons/deleteButton";

function BugList() {
  const httpCall = http(false);

  if (httpCall.length !== 0) {
    return (
      <>
        <SimpleGrid
          columns={1}
          spacingY="10px"
          overflowY="scroll"
          mb={"9vh"}
          mt={4}
        >
          {httpCall.map((array: any, index: number) => (
            <Flex
              key={index}
              w="50vw"
              h="12vh"
              color="black"
              backgroundColor="white"
              borderRadius="5px"
              pl={4}
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex flexDirection="column">
                <Stack direction="row" display="flex">
                  <Text fontSize="2.5vh" fontWeight="700">
                    {`${array.BugName}`}
                  </Text>
                  <Tag
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    borderRadius="30px"
                    px={4}
                    h={"1vh"}
                    alignSelf="center"
                  >
                    <TagLabel> {`v${array.Version}`}</TagLabel>
                  </Tag>
                </Stack>

                <Text color="gray.500" fontSize="2vh" fontWeight="500">
                  {`${array.BugDescription ? `${array.BugDescription}` : "—"}`}
                </Text>

                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Flex flexDirection="row">
                    <Text color="gray.400" fontSize="1.8vh" fontWeight="500">
                      {`Submitted by: ${array.Submitter} on ${day(
                        array.createdAt
                      ).format("DD/MM/YYYY")}`}
                    </Text>
                    <Badge
                      alignSelf="center"
                      ml="4px"
                      colorScheme={`${array.IsRepeatable ? "red" : "green"}`}
                    >
                      {`${
                        array.IsRepeatable ? "Repeatable" : "Not Repeatable"
                      }`}
                    </Badge>
                  </Flex>
                </Stack>
              </Flex>
              <Stack flexDir="column" mr={6} spacing={"0.5vh"}>
                <CompleteButton
                  id={array._id}
                  BugName={array.BugName}
                  BugDescription={array.BugDescription}
                  Version={array.Version}
                  IsRepeatable={array.IsRepeatable}
                  Submitter={array.Submitter}
                />
                <DeleteButton id={array._id} />
              </Stack>
            </Flex>
          ))}
        </SimpleGrid>
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default BugList;
