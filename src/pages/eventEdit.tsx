// React Imports
import React, { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

// MUI components

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { eventInterface } from "../components/types/clapper";
import { Box, Button, Grid, Heading, Textarea } from "@chakra-ui/react";
import { FiSave, FiXCircle } from "react-icons/fi";

// Other imports

// Begin Code

// const apiReq = async (url: string, method: string, body: any) => {
//   let endpoint = `${process.env.REACT_APP_API_BASEURL}${url}`;
//
//   let res = await axios.post<eventInterface>(endpoint, body, {
//     withCredentials: true,
//   });
//
//   return res
// };

const EventEdit: React.FC = (): JSX.Element => {
  const [event, setEvent] = useState<eventInterface>();
  const [newEvent, setNewEvent] = useState<boolean>();
  const { register, handleSubmit } = useForm<eventInterface>();
  let location = useLocation();

  useEffect(() => {
    const eventNumber = location.pathname.split("/")[3];

    if (eventNumber !== undefined) {
      apiAuthReq<eventInterface>(
        `/v1/internal/clapper/event/${eventNumber}`
      ).then((e) => {
        console.log("Current event:", e);
        setEvent(e);
        setNewEvent(!e);
      });
    }
  }, [location.pathname]);

  function onSubmit(data: eventInterface) {
    if (newEvent) {
      console.log("creating new event", data);
    } else {
      console.log("updating event", data);
    }
  }

  return (
    <>
      {true ? ( //newEvent === undefined ? (
        <div>Loading</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignContent="space-between">
            <Heading variant="h4" style={{ flex: 1 }}>
              Edit Event
            </Heading>
            <Box component="span">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<FiXCircle />}
                component={RouterLink}
                to={newEvent ? `/calendar` : `/event/${event?.eventID}`}
              >
                Cancel
              </Button>{" "}
              <Button
                variant="contained"
                color="primary"
                startIcon={<FiSave />}
                type="submit"
              >
                Save Event
              </Button>
            </Box>
          </Grid>

          <Heading variant="body1">
            {newEvent ? "New Event" : `${event?.eventID} - ${event?.name}`}
          </Heading>

          <br />

          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item>
              <Textarea
                type="text"
                placeholder="Event Name"
                defaultValue={event?.name}
                {...register("name")}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
              <Textarea
                type="text"
                placeholder="Event Description"
                defaultValue={event?.description}
                name="description"
                // inputRef={register({})}
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
};

export default EventEdit;
