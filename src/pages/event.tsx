// React Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import { Grid, Typography } from "@material-ui/core";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";
import { toTitleCase } from "../components/functions/otherUsefulFunctions";

// Type imports
import { eventInterface } from "../components/types/clapper";
import TextTable from "../components/textTable";

// Other imports

// Begin Code

export default function Event() {
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

  function getEventTypeContents(event: eventInterface) {
    switch (event.eventType) {
      case "show":
        try {
          return (
            <Grid container justify="center" spacing={3}>
              {event.signups!.map((x, n) => (
                <Grid key={n} item xs={12} sm={6} md={4} xl={3}>
                  <TextTable
                    tableTitle={x.title}
                    columnTitles={["Role", "Name"]}
                    dataKeys={["roleName", "nickname"]}
                    data={x.crew.map((e) => ({
                      roleName: e.name,
                      nickname: `${e.user.nickname} ${e.user.lastName}`,
                    }))}
                  />
                </Grid>
              ))}
            </Grid>
          );
        } catch {
          return (
            <Typography variant="h6">
              Looks like a crew list hasn't been added yet! Check back later for
              more information.
            </Typography>
          );
        }
      default:
        try {
          return (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <TextTable
                tableTitle={event.name}
                columnTitles={["Name", "Status"]}
                dataKeys={["name", "status"]}
                data={event.attendees!.map((e) => ({
                  status: e.attendStatus,
                  name: `${e.nickname} ${e.lastName}`,
                }))}
              />
            </Grid>
          );
        } catch {}
    }
  }

  return (
    <>
      {event !== undefined && event !== null ? (
        <>
          <Typography variant="subtitle2">
            {toTitleCase(event.eventType)}
          </Typography>
          <Typography variant="caption">{event.eventID.toString()}</Typography>
          <Typography variant="h4">{event.name}</Typography>
          <Typography variant="body1">{event.description}</Typography>
          <br />
          {getEventTypeContents(event)}
          <br />
          <Typography variant="body2">{JSON.stringify(event)}</Typography>
        </>
      ) : (
        <Typography variant="h6">No Event Found!</Typography>
      )}
    </>
  );
}
