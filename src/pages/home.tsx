// React Imports
import React from "react";

// MUI components
import { Box, Heading, Link, Text } from "@chakra-ui/react";

// Custom Components

// Type imports

// Other imports

// Begin Code

export default function Home() {
  return (
    <Box w={["100%", "xl"]}>
      <Heading>Welcome Home!</Heading>
      <br />
      <Text fontSize="xl">
        This site is still being actively developed over the summer so some
        features may be still be missing temporarily! Please check out{" "}
        <Link
          href="https://forum.ystv.co.uk"
          style={{ textDecoration: "underline" }}
        >
          the forum
        </Link>{" "}
        if you have any questions or suggestions.
      </Text>
      <br />
      <Text fontSize="xl">
        If you find something wrong, please let the computing team know :)
      </Text>
    </Box>
  );
}
