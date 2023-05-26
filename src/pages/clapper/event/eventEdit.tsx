import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  Heading,
  Textarea,
  useToast,
} from "@chakra-ui/react";
// import { FiSave, FiXCircle } from "react-icons/fi";
import { clapper } from "../../../services/services";
import { Event } from "../../../components/types/clapper";

const EventEdit: React.FC = (): JSX.Element => {
  const [event, setEvent] = useState<Event>();
  const [newEvent, setNewEvent] = useState<boolean>();
  const { register, handleSubmit } = useForm<Event>();
  const location = useLocation();

  const toast = useToast();

  useEffect(() => {
    const eventID = parseInt(location.pathname.split("/")[3], 10);

    if (eventID) {
      clapper.getEvent(eventID).then((e) => {
        setEvent(e);
        setNewEvent(!e);
      });
    }
  }, [location.pathname]);

  function onSubmit(data: Event) {
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
      <Grid alignContent="space-between">
        <Heading variant="h4" style={{ flex: 1 }}>
          Edit Event
        </Heading>
        {/* <Box component="span"> */}
        <Box>
          <Button
            variant="contained"
            color="secondary"
            // startIcon={<FiXCircle />}
            // component={RouterLink}
            // to={newEvent ? `/calendar` : `/event/${event?.eventID}`}
          >
            Cancel
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            // startIcon={<FiSave />}
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
        // container
        // direction="column"
        // justify="flex-start"
        alignItems="stretch"
        // spacing={2}
      >
        {/* <Grid item> */}
        <Grid>
          <Textarea
            // type="text"
            placeholder="Event Name"
            defaultValue={event?.name}
            {...register("name")}
            variant="outlined"
            // fullWidth
          />
        </Grid>
        {/* <Grid item> */}
        <Grid>
          <Textarea
            // type="text"
            placeholder="Event Description"
            defaultValue={event?.description}
            name="description"
            // inputRef={register({})}
            variant="outlined"
            // fullWidth
            // multiline
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EventEdit;
