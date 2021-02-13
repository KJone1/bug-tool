import {
  Badge,
  Flex,
  SimpleGrid,
  Text,
  Tag,
  TagLabel,
  HStack,
  VStack,
  Icon,
} from "@chakra-ui/react";
import http from "../../axios";
import LoadingScreen from "../loadingScreen";
import day from "dayjs";
import colors from "../../styles/colors";
import { FiRepeat } from "react-icons/fi";
import { AiFillBug } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import {
  FcLowPriority,
  FcMediumPriority,
  FcHighPriority,
} from "react-icons/fc";
import Expend from "../acco";

interface PropType {
  type: string;
  IsCompleted?: boolean;
  versionNum?: number;
}

const PriorityIconMap: any = {
  "1": FcLowPriority,
  "2": FcMediumPriority,
  "3": FcHighPriority,
};

const TypeIconMap: any = [AiFillBug, BiTask];

function BugList(data: PropType) {
  const httpCall = http(data.type, data.IsCompleted, data.versionNum);

  if (httpCall.length !== 0) {
    return (
      <>
        <Text color={colors.white}>{` count : ${httpCall.length}`}</Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingY="10px"
          spacingX="5px"
          overflowY="scroll"
          pb={4}
          pt={2}
          w={{ base: "95%", md: "90%" }}
          justifyContent="center"
        >
          {httpCall.map((array: any, index: number) => (
            <Flex
              key={index}
              maxW="100%"
              maxH="100%"
              color="black"
              backgroundColor={colors.white}
              borderRadius="5px"
              px="12px"
              py="4px"
              mr="2px"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex flexDirection="column">
                <Text
                  fontSize={"20px"}
                  fontWeight="700"
                  as={array.IsComplete && "del"}
                >
                  {`${array.BugName}`}
                </Text>

                <Text
                  color="gray.400"
                  fontSize="15px"
                  fontWeight="500"
                  alignSelf="flex-start"
                >
                  {`Submitted by: ${
                    array.Submitter ? array.Submitter : "User"
                  } on ${day(array.createdAt).format("DD/MM/YYYY")}`}
                </Text>

                <HStack spacing="8px" mt={1}>
                  <Icon
                    as={array.Type === "bug" ? TypeIconMap[0] : TypeIconMap[1]}
                    alignSelf="center"
                    px={1}
                    transform="scale(2.4)"
                  ></Icon>

                  <Tag
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    borderRadius="30px"
                    px={3}
                    alignSelf="center"
                  >
                    <TagLabel> {`v${array.Version}`}</TagLabel>
                  </Tag>
                  {array.IsRepeatable && (
                    <Badge
                      alignSelf="center"
                      p={1}
                      borderRadius="5px"
                      colorScheme="red"
                    >
                      <FiRepeat />
                    </Badge>
                  )}

                  {array.Priority && (
                    <Icon
                      as={PriorityIconMap[array.Priority]}
                      alignSelf="center"
                      px={1}
                      transform="scale(2.4)"
                    ></Icon>
                  )}
                </HStack>
              </Flex>
              <VStack display="flex" justifyContent="space-between">
                <Expend {...array} />
              </VStack>
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
