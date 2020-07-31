import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./Menu";

import Home from "../pages/home";
import MiniDrawer from "./Menu";

export default function App() {
  return (
    <Router>
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
