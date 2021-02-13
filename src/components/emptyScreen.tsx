import { Box, Center, Text } from "@chakra-ui/react";
import colors from "../styles/colors";
export default function EmptyScreen() {
  return (
    <Box bgColor={colors.jet} h="100vh">
      <Center>
        <Text color="white"> nothing to see here</Text>
      </Center>
    </Box>
  );
}
