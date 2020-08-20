import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./Menu";

import Home from "../pages/home";
import Calendar from "../pages/calendar";
import MiniDrawer from "./Menu";
import apiAuthReq from "../assets/apiAuthReq";

type userType = {
  avatar?: string;
  firstName: String;
  lastName: String;
  nickname: String;
  permissions: [];
  [key: string]: any;
};

export default function App() {
  const [user, setUser] = React.useState({
    nickname: "",
    firstName: "",
    lastName: "",
    permissions: [],
  } as userType);

  React.useEffect(() => {
    apiAuthReq("http://api.ystv.co.uk/v1/internal/people/user/").then((e) => {
      let login = e !== undefined;
      console.log("Logged in", login);
      if (login == false) {
        console.log("ahhhhhhhh");
        //Insert redirect here
      } else {
        console.log(e);
        setUser(e);
      }
    });
  }, []);

  return (
    <Router>
      <MiniDrawer
        initials={user.firstName.charAt(0).concat(user.lastName.charAt(0))}
        profilePhoto={user.avatar}
      >
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/">
            <FourOFour />
          </Route>
        </Switch>
      </MiniDrawer>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function FourOFour() {
  return <h2>Sorry Bud! This doesn't exist</h2>;
}
