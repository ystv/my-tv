import React from "react";
import { Route, Routes } from "react-router-dom";

import Webcams from "../../pages/webcams";
import AddQuote from "../../pages/quotes/addQuote";
import Quotes from "../../pages/quotes/quotes";
import Home from "../../pages/home";
import Positions from "../../pages/clapper/position/positions";
import Authorized from "../Authorized";
import UserPermission from "../types/permissions";
import EventEdit from "../../pages/clapper/event/eventEdit";
import EventPage from "../../pages/clapper/event/event";
import NewEvent from "../../pages/clapper/event/eventAdd";
import Calendar from "../../pages/clapper/Calendar";
import Profile from "../../pages/profile/profile";

const PageRouter = (): JSX.Element => (
  <Routes>
    {/* Core */}
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/" element={<Home />} />
    <Route path="/*" element={<NotFound />} />
    {/* Misc services */}
    <Route path="/webcams" element={<Webcams />} />
    <Route path="/quotes/*" element={<Quotes />}>
      <Route path="add" element={<AddQuote />} />
    </Route>
    <Route path="/profile/*" element={<Profile />} />
    {/* Clapper */}
    <Route path="/calendar*" element={<Calendar />} />
    <Route path="/calendar/roles" element={<Positions />} />
    <Route path="/event">
      <Route path="add" element={<NewEvent />} />
      <Route path=":eventID" element={<EventPage />}>
        <Route
          path="edit"
          element={
            <Authorized requiredPermissions={[UserPermission.Director]}>
              <EventEdit />
            </Authorized>
          }
        />
      </Route>
    </Route>
  </Routes>
);

const NotFound = () => <h2>Sorry Bud, this does not exist!</h2>;

const Unauthorized = () => <h2>Sorry Bud, you cannot see that!</h2>;

export default PageRouter;
