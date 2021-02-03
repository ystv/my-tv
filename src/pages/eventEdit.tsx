// React Imports
import React, { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

// MUI components
import { Typography, Grid, Button, Box, TextField } from "@material-ui/core";
import { CancelRounded, Save } from "@material-ui/icons";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { eventInterface } from "../components/types/clapper";

// Other imports

// Begin Code

export default function EventEdit() {
  const [event, setEvent] = useState<eventInterface>();
  const [newEvent, setNewEvent] = useState<boolean>();
  const { register, handleSubmit } = useForm();
  let location = useLocation();

  useEffect(() => {
    const eventNumber = location.pathname.split("/")[3];

    if (eventNumber !== undefined) {
      apiAuthReq(`/v1/internal/clapper/event/${eventNumber}`).then((e) => {
        console.log("Current event:", e);
        setEvent(e);
        setNewEvent(!e);
      });
    }
  }, [location.pathname]);

  function onSubmit(data: any) {
    newEvent
      ? console.log(data)
      : console.log({ eventID: event?.eventID, ...data });
  }

  return (
    <>
      {newEvent === undefined ? (
        <div>Loading</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignContent="space-between">
            <Typography variant="h4" style={{ flex: 1 }}>
              Edit Event
            </Typography>
            <Box component="span">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<CancelRounded />}
                component={RouterLink}
                to={newEvent ? `/calendar` : `/event/${event?.eventID}`}
              >
                Cancel
              </Button>{" "}
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                type="submit"
              >
                Save Event
              </Button>
            </Box>
          </Grid>

          <Typography variant="body1">
            {newEvent ? "New Event" : `${event?.eventID} - ${event?.name}`}
          </Typography>

          <br />

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <TextField
                type="text"
                placeholder="Event Name"
                defaultValue={event?.name}
                name="name"
                inputRef={register({})}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <TextField
                type="text"
                placeholder="Event Description"
                defaultValue={event?.description}
                name="description"
                inputRef={register({})}
                variant="outlined"
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
