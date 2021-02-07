import {
  Badge,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  Tag,
  TagLabel,
  Icon,
} from "@chakra-ui/react";
import http from "../../axios";
import LoadingScreen from "../loadingScreen";
import CompleteButton from "../buttons/completeButton";
import day from "dayjs";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import DeleteButton from "../buttons/deleteButton";
import colors from "../../styles/colors";
import { FiRepeat } from "react-icons/fi";

interface PropType {
  type: string;
  IsCompleted?: Boolean;
  VerNum?: Number;
}
const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});
// 3. Extend the theme
const theme = extendTheme({ breakpoints });

function BugList(props: PropType) {
  const httpCall = http(props.type, props.IsCompleted, props.VerNum);

  if (httpCall.length !== 0) {
    return (
      <>
        <SimpleGrid
          columns={1}
          spacingY="10px"
          overflowY="scroll"
          mb={"9vh"}
          mt={4}
          w={{ base: "95%", md: "70%", lg: "50%" }}
          justifyContent="center"
        >
          {httpCall.map((array: any, index: number) => (
            <Flex
              key={index}
              maxW="99%"
              h="100%"
              color="black"
              backgroundColor={colors.white}
              borderRadius="5px"
              px={4}
              py={2}
              justifyContent="space-between"
              alignItems="flex-end"
            >
              <Flex flexDirection="column">
                <Stack direction="row">
                  {array.IsComplete ? (
                    <Text
                      fontSize={{ base: "2.4vh", md: "2.5vh", lg: "3vh" }}
                      fontWeight="700"
                      as="del"
                    >
                      {`${array.BugName}`}
                    </Text>
                  ) : (
                    <Text
                      fontSize={{ base: "2.4vh", md: "2.5vh", lg: "3vh" }}
                      fontWeight="700"
                    >
                      {`${array.BugName}`}
                    </Text>
                  )}

                  <Tag
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    borderRadius="30px"
                    px={4}
                    h="100%"
                    alignSelf="center"
                  >
                    <TagLabel> {`v${array.Version}`}</TagLabel>
                  </Tag>
                </Stack>

                <Text
                  color={colors.coralBlack}
                  fontSize="2.0vh"
                  fontWeight="500"
                >
                  {`${
                    array.BugDescription ? `${array.BugDescription}` : "None"
                  }`}
                </Text>

                <Flex flexDirection="row" alignSelf="flex-start">
                  <Text
                    color="gray.400"
                    fontSize="2.0vh"
                    fontWeight="500"
                    alignSelf="center"
                  >
                    {`Submitted by: ${array.Submitter} on ${day(
                      array.createdAt
                    ).format("DD/MM/YYYY")}`}
                  </Text>
                  <Badge
                    alignSelf="center"
                    h="100%"
                    p={1}
                    ml="4px"
                    borderRadius="5px"
                    colorScheme={`${array.IsRepeatable ? "red" : null}`}
                  >
                    {array.IsRepeatable ? <FiRepeat /> : null}
                  </Badge>
                </Flex>
              </Flex>

              {array.IsComplete ? (
                <Flex flexDir="column" alignSelf="center">
                  <DeleteButton id={array._id} />
                </Flex>
              ) : (
                <Stack flexDir="row" spacing={"0.8vh"} alignSelf="center">
                  <DeleteButton id={array._id} />
                  <CompleteButton
                    id={array._id}
                    BugName={array.BugName}
                    BugDescription={array.BugDescription}
                    Version={array.Version}
                    IsRepeatable={array.IsRepeatable}
                    Submitter={array.Submitter}
                  />
                </Stack>
              )}
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
