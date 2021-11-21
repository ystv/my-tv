// React Imports
import React, { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

// MUI components

// Custom Components
import {
  Box,
  Button,
  Grid,
  Heading,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FiSave, FiXCircle } from "react-icons/fi";
import apiAuthReq from "../../components/functions/apiAuthReq";

// Type imports
import { EventInterface } from "../../components/types/clapper";

// Other imports

// Begin Code

const EventEdit: React.FC = (): JSX.Element => {
  const [event, setEvent] = useState<EventInterface>();
  const [newEvent, setNewEvent] = useState<boolean>();
  const { register, handleSubmit } = useForm<EventInterface>();
  const location = useLocation();

  const toast = useToast();

  useEffect(() => {
    const eventNumber = location.pathname.split("/")[3];

    if (eventNumber !== undefined) {
      apiAuthReq<EventInterface>(
        `/v1/internal/clapper/event/${eventNumber}`
      ).then((e) => {
        setEvent(e);
        setNewEvent(!e);
      });
    }
  }, [location.pathname]);

  function onSubmit(data: EventInterface) {
    if (newEvent) {
      toast({
        title: "Event created",
        description: JSON.stringify(data),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Event updated",
        description: JSON.stringify(data),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  return (
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
  );
};

export default EventEdit;
