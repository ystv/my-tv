import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "./Menu";

import Home from "../pages/home";
import MiniDrawer from "./Menu";

let loggedIn = false;

export default function App() {
  return (
    <Router>
      {loggedIn ? (
        <Redirect to="http://comp.ystv.co.uk/" />
      ) : (
        <MiniDrawer>
          <div>
            <Switch>
              <Route path="/about">
                <About />
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
          </div>
        </MiniDrawer>
      )}
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
