import React, { useEffect, useState } from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
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
import { isAuthorized } from "../../../components/contexts/userContext";
import toTitleCase from "../../../components/functions/toTitleCase";
import TextTable from "../../../components/textTable";
import { clapper } from "../../../services/services";
import { Event } from "../../../components/types/clapper";

function getEventTypeContents(event: Event): JSX.Element {
  switch (event.eventType) {
    case "show":
      if (event.signups) {
        return (
          <Grid container justify="center" spacing={3}>
            {event.signups.map((signup) => (
              <Grid key={signup.signupID} item xs={12} sm={6} md={4} xl={3}>
                <TextTable
                  title={signup.title}
                  description={signup.description}
                  subheading={
                    signup.arrivalTime
                      ? `Arrive at ${new Date(
                          signup.arrivalTime
                        ).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`
                      : undefined
                  }
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
      }
      return (
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight="110%"
        >
          Looks like a crew list has not been added yet! Check back later for
          more information.
        </Heading>
      );

    default:
      if (event.attendees) {
        return (
          <Grid item xs={12} sm={6} md={4} xl={3}>
            <TextTable
              title={event.name}
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
      }
      return (
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          lineHeight="110%"
        >
          Looks like you are the first one here, nice!
        </Heading>
      );
  }
}

export default function EventPage(): JSX.Element {
  const [event, setEvent] = useState<Event>();
  const location = useLocation();

  useEffect(() => {
    clapper
      .getEvent(parseInt(location.pathname.split("/")[2], 10))
      .then((e) => {
        setEvent(e);
      });
  }, [location.pathname]);

  return event ? (
    <>
      <Link
        variant="body2"
        component={RouterLink}
        to={() => {
          const startDate = new Date(event.startDate);
          return `/calendar/${startDate.getFullYear()}/${
            startDate.getMonth() + 1
          }`;
        }}
      >
        &#8592; Back
      </Link>

      <Grid container alignContent="space-between">
        <Heading variant="caption" style={{ flex: 1, alignSelf: "flex-end" }}>
          {toTitleCase(event.eventType)}
        </Heading>

        {isAuthorized([]) && (
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
      <Heading variant="h4">{event.isCancelled ? "(Cancelled)" : ""}</Heading>
      <Heading variant="h4">{event.isTentative ? "(Tentative)" : ""}</Heading>
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
        {event.description.split("\n").map((textLine) => (
          <Text>
            {textLine}
            <br />
          </Text>
        ))}
      </Stack>

      <br />
      {getEventTypeContents(event)}
    </>
  ) : (
    <Heading variant="h6">No Event Found!</Heading>
  );
}
