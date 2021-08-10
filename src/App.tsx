// React Imports
import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// MUI components
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { blueGrey, lightBlue } from "@material-ui/core/colors";
import "@fontsource/roboto";

// Custom Components
import apiAuthReq from "./components/functions/apiAuthReq";
import NavbarWithDrawer from "./components/App/NavbarWithDrawer";
import PageRouter from "./components/App/PageRouter";

// Type imports
import { userInterface } from "./components/types/people";

// Begin Code

export const useUserContext = createContext<userInterface>(null as any);

export default function App() {
  const [user, setUser] = useState<userInterface>();

  useEffect(() => {
    apiAuthReq<userInterface>("/v1/internal/people/user/").then((e) => {
      console.log("user: ", e);
      setUser(e);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
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
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[600],
    },
    secondary: lightBlue,
  },
});
