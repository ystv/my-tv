import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiAuthReq from "../assets/apiAuthReq";
import { toTitleCase } from "../assets/otherUsefulFunctions";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Tooltip,
  Button,
  Typography,
} from "@material-ui/core";

interface eventInterface {
  eventID: number;
  eventType: string;
  name: string;
  description?: string;
  signups: [{ crew: [crewInterface]; [key: string]: any }];
  [key: string]: any;
}

interface crewInterface {
  crewID: number;
  user: {
    userID: number;
    nickname: string;
    firstName: string;
    lastName: string;
  };
  locked: boolean;
  credited: boolean;
  positionID: number;
  name: string;
  description: string;
  admin: boolean;
  permissionID: any;
}

interface attendeeInterface {
  userID: number;
  nickname: string;
  firstName: string;
  lastName: string;
  attendStatus: string;
}

export default function Event() {
  const [event, setEvent] = useState<eventInterface>();
  let location = useLocation();

  useEffect(() => {
    updateEventUI();
  }, []);

  function updateEventUI() {
    apiAuthReq(
      `http://api.ystv.co.uk/v1/internal/clapper/event/${
        location.pathname.split("/")[2]
      }`
    ).then((e) => setEvent(e));
  }

  return (
    <>
      {event !== undefined ? (
        <>
          <h4>{toTitleCase(event.eventType)}</h4>
          <h1>{event.name}</h1>
          <small>{event.eventID.toString()}</small>
          {event.eventType == "show" ? (
            <>
              <Typography variant="body1">{event.description}</Typography>
              <Grid container justify="center" spacing={3}>
                {event.signups.map((x, n) => (
                  <Grid key={n} item xs={12} md={4}>
                    <TableContainer component={Paper}>
                      <h2 style={{ marginLeft: "1rem" }}>{x.title}</h2>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Role</TableCell>
                            <TableCell>Name</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {x.crew.map((e: crewInterface) => (
                            <TableRow key={e.crewID}>
                              <TableCell component="th" scope="row">
                                {e.description !== null ? (
                                  <Tooltip title={e.description}>
                                    <Button>{e.name}</Button>
                                  </Tooltip>
                                ) : (
                                  <Button>{e.name}</Button>
                                )}
                              </TableCell>
                              <TableCell>
                                {e.user.nickname + " " + e.user.lastName}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <>
              {" "}
              {event.eventType == "social" ? (
                <>
                  <Typography variant="body1">{event.description}</Typography>
                  <TableContainer component={Paper}>
                    <h2 style={{ marginLeft: "1rem" }}>Status</h2>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {event.attendees.map((e: attendeeInterface) => (
                          <TableRow key={e.userID}>
                            <TableCell component="th" scope="row">
                              {e.nickname + " " + e.lastName}
                            </TableCell>
                            <TableCell>{e.attendStatus}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <> </>
              )}
            </>
          )}
          <h5>{JSON.stringify(event)}</h5>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
