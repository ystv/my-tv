// React Imports
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import { Grid, Typography } from "@material-ui/core";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";
import { toTitleCase } from "../components/functions/otherUsefulFunctions";

// Type imports
import {
  eventInterface,
  crewInterface,
  attendeeInterface,
} from "../components/types/clapper";
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

  return (
    <>
      {event !== undefined && event !== null ? (
        <>
          <h4>{toTitleCase(event.eventType)}</h4>
          <h1>{event.name}</h1>
          <small>{event.eventID.toString()}</small>
          <Typography variant="body1">{event.description}</Typography>
          {event.eventType == "show" ? (
            <Grid container justify="center" spacing={3}>
              {event.signups!.map((x, n) => (
                <Grid key={n} item xs={12} md={4}>
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
          ) : (
            <Grid item xs={12} md={4}>
              <TextTable
                tableTitle={event.name}
                columnTitles={["Name", "Status"]}
                dataKeys={["status", "name"]}
                data={event.attendees!.map((e) => ({
                  status: e.attendStatus,
                  name: `${e.nickname} ${e.lastName}`,
                }))}
              />
            </Grid>
          )}
          <h5>{JSON.stringify(event)}</h5>
        </>
      ) : (
        <h1>No Event Found!</h1>
      )}
    </>
  );
}
