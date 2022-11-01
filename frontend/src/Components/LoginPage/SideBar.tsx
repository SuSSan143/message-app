import { Box, chakra, Stack, VStack } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import React from "react";

const ChakraNav = chakra(motion(VStack), {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const SideBar = () => {
  return (
    <ChakraNav
      h="600px"
      maxW={["full", "full", "24"]}
      w="md"
      py="10"
      bgColor="rgba(255,255,255,0.95)"
    >
      <Stack
        direction={["row", "row", "column"]}
        spacing={4}
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        <Box width="10px" height="10px" bgColor="black" borderRadius="full" />
        <Box width="10px" height="10px" bgColor="black" borderRadius="full" />
        <Box width="10px" height="10px" bgColor="black" borderRadius="full" />
      </Stack>
    </ChakraNav>
  );
};

export default SideBar;
