// React Imports
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";

// MUI components

// Custom Components
import apiAuthReq from "../components/functions/apiAuthReq";
import { toTitleCase } from "../components/functions/otherUsefulFunctions";
import userContextPermissions from "../components/functions/userContextPermissions";
import TextTable from "../components/textTable";

// Type imports
import { eventInterface } from "../components/types/clapper";
import { useUserContext } from "../App";
import {
  Box,
  Button,
  Grid,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiTool } from "react-icons/fi";

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
              {event.signups.map((signup, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} xl={3}>
                  <TextTable
                    tableDescription={signup.description}
                    tableSubheading={
                      signup.arrivalTime
                        ? `Arrive at ${new Date(
                            signup.arrivalTime
                          ).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`
                        : undefined
                    }
                    tableTitle={signup.title}
                    columnTitles={["Role", "Name"]}
                    dataKeys={["roleName", "nickname"]}
                    data={signup.crew?.map((crewMember) => ({
                      roleName: crewMember.name,
                      nickname: `${crewMember.user.nickname} ${crewMember.user.lastName}`,
                    }))}
                  />
                </Grid>
              ))}
            </Grid>
          );
        } else {
          return (
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Looks like a crew list hasn't been added yet! Check back later for
              more information.
            </Heading>
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
            <Heading
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
              lineHeight={"110%"}
            >
              Looks like you're the first one here, nice!
            </Heading>
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
            <Heading
              variant="caption"
              style={{ flex: 1, alignSelf: "flex-end" }}
            >
              {toTitleCase(event.eventType)}
            </Heading>

            {userContextPermissions(userContext) && (
              <Box component="span">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FiTool />}
                  component={RouterLink}
                  to={`/event/edit/${event.eventID}`}
                >
                  Edit Event
                </Button>
              </Box>
            )}
          </Grid>
          <Heading variant="subtitle2">
            {new Date(event.startDate).toLocaleDateString()}
            {new Date(event.startDate).toLocaleDateString() ===
            new Date(event.endDate).toLocaleDateString()
              ? null
              : ` - ${new Date(event.endDate).toLocaleDateString()}`}
          </Heading>
          <Heading variant="h4">
            {event.isCancelled
              ? `${event.name} (Cancelled)`
              : event.isTentative
              ? `${event.name} (Tentative)`
              : event.name}
          </Heading>
          <Heading variant="h6">
            {`${new Date(event.startDate).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${new Date(event.endDate).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
          </Heading>
          <br />
          <Stack>
            {event.description.split("\n").map((e) => (
              <Text>
                {e}
                <br />
              </Text>
            ))}
          </Stack>

          <br />
          {getEventTypeContents(event)}
        </>
      ) : (
        <Heading variant="h6">No Event Found!</Heading>
      )}
    </>
  );
}
