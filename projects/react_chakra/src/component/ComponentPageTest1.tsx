
// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

import * as React from "react";
import {
  ChakraProvider,
  Box,
  Stack,
} from "@chakra-ui/react"

const Component: React.FunctionComponent<{}> = (): JSX.Element => {
  return <ChakraProvider>
    <Stack m={2}>
      <Box bg="red.50" p={2}>a</Box>
      <Box bg="red.50" p={2}>b</Box>
      <Box bg="red.50" p={2}>c</Box>
    </Stack>
  </ChakraProvider>;
};

export default Component;

// ----------------------------------------------------------------
// ----------------------------------------------------------------
// ----------------------------------------------------------------

