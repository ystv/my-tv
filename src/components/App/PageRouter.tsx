import React from "react";
import { Route, Routes } from "react-router-dom";

import Webcams from "../../pages/webcams";
import AddQuote from "../../pages/quotes/addQuote";
import Quotes from "../../pages/quotes/quotes";
import EventEdit from "../../pages/clapper/eventEdit";
import Event from "../../pages/clapper/event";
import Home from "../../pages/home";
import EventAdd from "../../pages/clapper/eventAdd";
import Positions from "../../pages/clapper/positions";
import Authorized from "../Authorized";
import UserPermission from "../types/permissions";

const PageRouter = (): JSX.Element => (
  <Routes>
    {/* Core */}
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/" element={<Home />} />
    <Route path="/*" element={<NotFound />} />
    {/* Misc services */}
    <Route path="/webcams" element={<Webcams />} />
    <Route path="/quotes/add" element={<AddQuote />} />
    <Route path="/quotes" element={<Quotes />} />
    {/* Clapper */}
    <Route
      path="/event/edit/:eventID?"
      element={
        <Authorized requiredPermissions={[UserPermission.Director]}>
          <EventEdit />
        </Authorized>
      }
    />

    <Route path="/event/add" element={<EventAdd />} />
    <Route path="/event" element={<Event />} />
    <Route path="/clapper/roles" element={<Positions />} />
  </Routes>
);

const NotFound = () => <h2>Sorry Bud, this does not exist!</h2>;

const Unauthorized = () => <h2>Sorry Bud, you cannot see that!</h2>;

export default PageRouter;
