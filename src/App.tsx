// React Imports
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// MUI components
import {
  Center,
  ChakraProvider,
  extendTheme,
  Spinner,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";

// Custom Components
import apiAuthReq from "./components/functions/apiAuthReq";
import NavbarWithDrawer from "./components/App/NavbarWithDrawer";
import PageRouter from "./components/App/PageRouter";

// Type imports
import { userInterface } from "./components/types/people";
import UserProvider from "./components/contexts/userProvider";

// Begin Code

export const chakraTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "blue" }),
  {
    components: { Steps },
    initialColorMode: "light",
    useSystemColorMode: false,
  }
);

export default function App(): JSX.Element {
  const [user, setUser] = useState<userInterface>();

  useEffect(() => {
    apiAuthReq<userInterface>("/v1/internal/people/user/").then((e) => {
      setUser(e);
    });
  }, []);

  return (
    <ChakraProvider theme={chakraTheme}>
      {user ? (
        <UserProvider user={user}>
          <Router>
            <NavbarWithDrawer>
              <PageRouter />
            </NavbarWithDrawer>
          </Router>
        </UserProvider>
      ) : (
        <Center height="100vh">
          <Spinner />
        </Center>
      )}
    </ChakraProvider>
  );
}
