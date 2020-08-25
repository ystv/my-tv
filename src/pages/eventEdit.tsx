// React Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import { Typography } from "@material-ui/core";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { eventInterface } from "../components/types/clapper";

// Other imports

// Begin Code

export default function EventEdit() {
  const [event, setEvent] = useState<eventInterface>();
  let location = useLocation();

  useEffect(() => {
    updateEventUI();
  }, []);

  function updateEventUI() {
    apiAuthReq(
      `/v1/internal/clapper/event/${location.pathname.split("/")[2]}`
    ).then((e) => setEvent(e));
  }
  return (
    <div>
      <Typography variant="h4">Edit Event</Typography>
    </div>
  );
}
