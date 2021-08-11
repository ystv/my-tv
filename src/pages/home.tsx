// React Imports
import React from "react";

// MUI components
import { Box, Heading, Text } from "@chakra-ui/react";

// Custom Components

// Type imports

// Other imports

// Begin Code

export default function Home() {
  return (
    <Box w={["sm", "xl"]}>
      <Heading>Welcome Home!</Heading>
      <br />
      <Text fontSize={"xl"}>
        This site is still being actively developed over the summer so some
        features may be still be missing temporarily! Please check out{" "}
        <a href="https://forum.ystv.co.uk">the forum</a> if you have any
        questions or suggestions.
      </Text>
      <br />
      <Text fontSize="xl">
        If you find something wrong, please let the computing team know :)
      </Text>
    </Box>
  );
}
