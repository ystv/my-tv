// React Imports
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

// MUI components
import { Grid, Typography, Button, Box, Link } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";
import { toTitleCase } from "../components/functions/otherUsefulFunctions";
import userContextPermissions from "../components/functions/userContextPermissions";
import TextTable from "../components/textTable";

// Type imports
import { eventInterface } from "../components/types/clapper";
import { useUserContext } from "../App";

// Other imports

// Begin Code

export default function Event(): JSX.Element {
  const userContext = useContext(useUserContext);
  const [event, setEvent] = useState<eventInterface>();
  let location = useLocation();

  useEffect(() => {
    apiAuthReq<eventInterface>(
      `/v1/internal/clapper/event/${location.pathname.split("/")[2]}`
    ).then((e) => {
      setEvent(e);
      console.log(e);
    });
  }, [location.pathname]);

  function getEventTypeContents(event: eventInterface): JSX.Element {
    switch (event.eventType) {
      case "show":
        if (event.signups) {
          return (
            <Grid container justify="center" spacing={3}>
              {event.signups.map((x, n) => (
                <Grid key={n} item xs={12} sm={6} md={4} xl={3}>
                  <TextTable
                    tableTitle={x.title}
                    columnTitles={["Role", "Name"]}
                    dataKeys={["roleName", "nickname"]}
                    data={x.crew?.map((e) => ({
                      roleName: e.name,
                      nickname: `${e.user.nickname} ${e.user.lastName}`,
                    }))}
                  />
                </Grid>
              ))}
            </Grid>
          );
        } else {
          return (
            <Typography variant="h6">
              Looks like a crew list hasn't been added yet! Check back later for
              more information.
            </Typography>
          );
        }
      default:
        if (event.attendees) {
          return (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <TextTable
                tableTitle={event.name}
                columnTitles={["Name", "Status"]}
                dataKeys={["name", "status"]}
                data={event.attendees.map((e) => ({
                  status: e.attendStatus,
                  name: `${e.nickname} ${e.lastName}`,
                }))}
              />
            </Grid>
          );
          // No one is currently attending the non-show
        } else {
          return (
            <Typography variant="h6">
              Looks like you're the first one here, nice!
            </Typography>
          );
        }
    }
  }

  return (
    <>
      {event ? (
        <>
          <Link
            variant="body2"
            component={RouterLink}
            to={() => {
              let startDate = new Date(event.startDate);
              console.log(startDate);
              return `/calendar/${startDate.getFullYear()}/${
                startDate.getMonth() + 1
              }`;
            }}
          >
            &#8592; Back
          </Link>

          <Grid container alignContent="space-between">
            <Typography
              variant="caption"
              style={{ flex: 1, alignSelf: "flex-end" }}
            >
              {toTitleCase(event.eventType)}
            </Typography>

            {userContextPermissions(userContext) && (
              <Box component="span">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  component={RouterLink}
                  to={`/event/edit/${event.eventID}`}
                >
                  Edit Event
                </Button>
              </Box>
            )}
          </Grid>
          <Typography variant="subtitle2">
            {new Date(event.startDate).toLocaleDateString()}
            {new Date(event.startDate).toLocaleDateString() ===
            new Date(event.endDate).toLocaleDateString()
              ? null
              : ` - ${new Date(event.endDate).toLocaleDateString()}`}
          </Typography>
          <Typography variant="h4">
            {event.isCancelled
              ? `${event.name} (Cancelled)`
              : event.isTentative
              ? `${event.name} (Tentative)`
              : event.name}
          </Typography>
          <Typography variant="h6">
            {`${new Date(event.startDate).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${new Date(event.endDate).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </Typography>
          <br />
          {event.description.split("\n").map((e) => (
            <Typography variant="body1">
              {e}
              <br />
            </Typography>
          ))}
          <br />
          {getEventTypeContents(event)}
        </>
      ) : (
        <Typography variant="h6">No Event Found!</Typography>
      )}
    </>
  );
}
