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
import SidebarWithHeader from "./components/App/SidebarWithHeader";
import PageRouter from "./components/App/PageRouter";

// Type imports
import { UserInterface } from "./components/types/people";
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
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    apiAuthReq<UserInterface>("/v1/internal/people/user/").then((e) => {
      setUser(e);
    });
  }, []);

  return (
    <ChakraProvider theme={chakraTheme}>
      {user ? (
        <UserProvider user={user}>
          <Router>
            <SidebarWithHeader>
              <PageRouter />
            </SidebarWithHeader>
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
