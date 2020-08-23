// React Imports
import React, { useState } from "react";

// MUI components

// Custom Components
import "../components/calendar.css";
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { calendarInterface } from "../components/types/clapper";

// Other imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

// Begin Code

export default function Calendar() {
  const [data, setData] = useState<Array<object>>([]);

  function handleGetDate(urlDate: Date) {
    apiAuthReq(
      `/v1/internal/clapper/calendar/${urlDate.getFullYear()}/${
        urlDate.getMonth() + 1
      }`
    ).then((e: calendarInterface[]) => {
      let eventArray = e.map((event: calendarInterface) => ({
        id: event.eventID,
        start: event.startDate,
        end: event.endDate,
        title: event.name,
        url: `/event/${event.eventID}`,
      }));
      setData(eventArray);
    });
  }

  return (
    <>
      <h1>Calendar</h1>
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
        height="75vh"
      />
    </>
  );
}
