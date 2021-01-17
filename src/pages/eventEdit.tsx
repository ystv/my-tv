// React Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import { Typography, Grid, Button, Box } from "@material-ui/core";
import { Save } from "@material-ui/icons";

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
    const eventNumber = location.pathname.split("/")[3];

    if (eventNumber !== undefined) {
      apiAuthReq(`/v1/internal/clapper/event/${eventNumber}`).then((e) =>
        setEvent(e)
      );
    }
  }, [location.pathname]);

  return (
    <>
      <Grid container alignContent="space-between">
        <Typography variant="h4" style={{ flex: 1 }}>
          Edit Event
        </Typography>
        <Box component="span">
          <Button variant="contained" color="primary" startIcon={<Save />}>
            Save Event
          </Button>
        </Box>
      </Grid>

      <Typography variant="body1">
        {event !== null && event !== undefined
          ? `${event.eventID} ${event.name}`
          : "New Event"}
      </Typography>
    </>
  );
}
