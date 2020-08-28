// React Imports
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI components
import { CircularProgress, Backdrop } from "@material-ui/core";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";
import NavbarWithDrawer from "./Menu";
import RouteWithPerms from "../components/RouteWithPerms";

import Home from "../pages/home";
import Calendar from "../pages/calendar";
import Event from "../pages/event";
import EventEdit from "../pages/eventEdit";

// Type imports
import { userInterface } from "../components/types/people";
import { userRoles } from "../components/types/permissions";

// Other imports

// Begin Code

export default function App() {
  const [user, setUser] = React.useState<userInterface>();

  React.useEffect(() => {
    apiAuthReq("/v1/internal/people/user/").then((e) => {
      console.log(e);
      setUser(e);
    });
  }, []);

  return (
    <Router>
      {user !== undefined ? (
        <NavbarWithDrawer
          initials={user.firstName.charAt(0).concat(user.lastName.charAt(0))}
          profilePhoto={user.avatar}
        >
          <Switch>
            <Route path="/calendar">
              <Calendar />
            </Route>

            <RouteWithPerms path="/event/edit" user={user}>
              <EventEdit user={user} />
            </RouteWithPerms>

            <Route path="/event">
              <Event user={user} />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/">
              <FourOFour />
            </Route>
          </Switch>
        </NavbarWithDrawer>
      ) : (
        <Backdrop open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
    </Router>
  );
}

function FourOFour() {
  return <h2>Sorry Bud! This doesn't exist</h2>;
}
