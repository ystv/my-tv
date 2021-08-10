import React from "react";
import { Route, Switch } from "react-router-dom";

import Webcams from "../../pages/webcams";
import AddQuote from "../../pages/addQuote";
import Quotes from "../../pages/quotes";
import Calendar from "../../pages/calendar";
import RouteWithPerms from "../RouteWithPerms";
import EventEdit from "../../pages/eventEdit";
import Event from "../../pages/event";
import Home from "../../pages/home";
import EventAdd from "../../pages/eventAdd";

export default function PageRouter() {
  return (
    <Switch>
      <Route path="/webcams">
        <Webcams />
      </Route>

      <Route path="/quotes/add">
        <AddQuote />
      </Route>

      <Route path="/quotes">
        <Quotes />
      </Route>

      <Route path="/calendar">
        <Calendar />
      </Route>

      <RouteWithPerms path="/event/edit/:eventID?">
        <EventEdit />
      </RouteWithPerms>

      <Route path="/event/add">
        <EventAdd />
      </Route>

      <Route path="/event">
        <Event />
      </Route>

      <Route path="/301">
        <ThreeOOne />
      </Route>

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/">
        <FourOFour />
      </Route>
    </Switch>
  );
}

function FourOFour() {
  return <h2>Sorry Bud, this doesn't exist!</h2>;
}

function ThreeOOne() {
  return <h2>Sorry Bud, you can't see that!</h2>;
}
