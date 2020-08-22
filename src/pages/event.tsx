import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiAuthReq from "../assets/apiAuthReq";

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
} from "@material-ui/core";

interface eventInterface {
  eventID: number;
  name: string;
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

function createData(nickname: string, name: string) {
  return { nickname, name };
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
          <h1>{event.name}</h1>
          <small>{event.eventID.toString()}</small>
          <Grid container justify="center" spacing={3}>
            {event.signups.map((x, n) => (
              <Grid key={n} item xs={4}>
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
                            {e.user.firstName + " " + e.user.lastName}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            ))}
          </Grid>
          <h5>{JSON.stringify(event)}</h5>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
