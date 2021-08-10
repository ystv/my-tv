// React Imports
import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// MUI components
import {
  ChakraProvider,
  extendTheme,
  Spinner,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import { Backdrop } from "@material-ui/core";
import "@fontsource/roboto";

// Custom Components
import apiAuthReq from "./components/functions/apiAuthReq";
import NavbarWithDrawer from "./components/App/NavbarWithDrawer";
import PageRouter from "./components/App/PageRouter";

// Type imports
import { userInterface } from "./components/types/people";

// Begin Code

export const useUserContext = createContext<userInterface>(null as any);

export const chakraTheme = extendTheme(
  withDefaultColorScheme({ colorScheme: "blue" }),
  {
    components: { Steps },
    initialColorMode: "light",
    useSystemColorMode: false,
  }
);

export default function App() {
  const [user, setUser] = useState<userInterface>();

  useEffect(() => {
    apiAuthReq<userInterface>("/v1/internal/people/user/").then((e) => {
      console.log("user: ", e);
      setUser(e);
    });
  }, []);

  return (
    <ChakraProvider theme={chakraTheme}>
      {user ? (
        <useUserContext.Provider value={user}>
          <Router>
            <NavbarWithDrawer>
              <PageRouter />
            </NavbarWithDrawer>
          </Router>
        </useUserContext.Provider>
      ) : (
        <Backdrop open>
          <Spinner />
        </Backdrop>
      )}
    </ChakraProvider>
  );
}
