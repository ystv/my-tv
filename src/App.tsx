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

// Custom Components
import SidebarWithHeader from "./components/sidebar/sidebar-with-header";
import PageRouter from "./components/App/PageRouter";
import { people } from "./services/services";

// Type imports
import { UserInterface } from "./components/types/people";
import UserProvider from "./components/contexts/userProvider";

// Begin Code

export const chakraTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "blue" }),
  {
    initialColorMode: "light",
    useSystemColorMode: false,
  }
);

const App = (): JSX.Element => {
  const [user, setUser] = useState<UserInterface>();

  useEffect(() => {
    people.getUserByToken().then((u) => {
      setUser(u);
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
};

export default App;
