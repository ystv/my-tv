// React Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import { Typography } from "@material-ui/core";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { eventInterface } from "../components/types/clapper";
import { userInterface } from "../components/types/people";

// Other imports

// Begin Code

interface EventEditProps {
  user: userInterface;
}

export default function EventEdit(props: EventEditProps) {
  const [event, setEvent] = useState<eventInterface>();
  let location = useLocation();

  useEffect(() => {
    updateEventUI();
  }, []);

  function updateEventUI() {
    const eventNumber = location.pathname.split("/")[3];
    if (eventNumber !== undefined) {
      apiAuthReq(`/v1/internal/clapper/event/${eventNumber}`).then((e) =>
        setEvent(e)
      );
    }
  }
  return (
    <div>
      <Typography variant="h4">Edit Event</Typography>
    </div>
  );
}
