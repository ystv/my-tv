import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// MUI components
import { Button } from "@material-ui/core";

// Custom Components
import "../components/calendar.css";

// Other imports
import apiAuthReq from "../assets/apiAuthReq";
import FullCalendar, {
  eventTupleToStore,
  AllowFunc,
  EventApi,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

interface apiEvent {
  eventID: number;
  eventType: string;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  location: string;
  isPrivate: boolean;
  isCancelled: boolean;
  isTentative: boolean;
}

export default function Calendar() {
  const [data, setData] = useState([]);
  let history = useHistory();

  function handleGetDate(urlDate: Date) {
    apiAuthReq(
      `http://api.ystv.co.uk/v1/internal/clapper/calendar/${urlDate.getFullYear()}/${
        urlDate.getMonth() + 1
      }`
    ).then((e) => {
      let eventArray = e.map((event: apiEvent) => {
        return {
          id: event.eventID,
          start: event.startDate,
          end: event.endDate,
          title: event.name,
        };
      });
      setData(eventArray);
    });
  }

  function handleEventClick(event: EventApi) {
    history.push(`/event/${event.id}`);
  }

  return (
    <>
      <h1>Calendar</h1>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        events={data}
        headerToolbar={{
          right: "today prev,next dayGridMonth,timeGridDay",
        }}
        showNonCurrentDates={false}
        datesSet={(n) => handleGetDate(n.start)}
        firstDay={1}
        eventClick={(e) => handleEventClick(e.event)}
      />
    </>
  );
}
