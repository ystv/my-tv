// React Imports
import React, { useState, useEffect } from "react";

// MUI components
import { Typography } from "@material-ui/core";

// Custom Components
import "../components/calendar.css";
import apiAuthReq from "../components/functions/apiAuthReq";

// Type imports
import { calendarInterface } from "../components/types/clapper";

// Other imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useLocation } from "react-router-dom";

// Begin Code

export default function Calendar() {
  const [data, setData] = useState<Array<object>>([]);
  const [initDate, setInitDate] = useState<string>();
  const location = useLocation();

  function GetInitDate() {
    let year = parseInt(location.pathname.split("/")[2]);
    if (!isNaN(year)) {
      let month = parseInt(location.pathname.split("/")[3]);
      if (!isNaN(month)) {
        if (month < 10) {
          return `${year}-0${month}-01`;
        } else {
          return `${year}-${month}-01`;
        }
      }
    }
    return Date.now();
  }

  function handleGetDate(urlDate: Date) {
    console.log("date: ", urlDate);
    apiAuthReq(
      `/v1/internal/clapper/calendar/monthly/${urlDate.getFullYear()}/${
        urlDate.getMonth() + 1
      }`
    ).then((e: calendarInterface[]) => {
      let eventArray = e.map((event: calendarInterface) => {
        let eventObject: { [key: string]: any } = {
          id: event.eventID,
          start: event.startDate,
          end: event.endDate,
          title: event.name,
          url: `/event/${event.eventID}`,
        };
        if (event.isCancelled === true) {
          eventObject.url = "";
          eventObject.color = "#B00020";
        }
        return eventObject;
      });
      setData(eventArray);
      window.history.pushState(
        {},
        "",
        `/calendar/${urlDate.getFullYear()}/${urlDate.getMonth() + 1}`
      );
    });
  }

  return (
    <>
      <Typography variant="h4">Calendar</Typography>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={data}
        headerToolbar={{
          right: "today prev,next dayGridMonth,listMonth,timeGridDay",
        }}
        showNonCurrentDates={false}
        datesSet={(n) => handleGetDate(n.start)}
        firstDay={1}
        height="75vh"
        initialDate={GetInitDate()}
      />
    </>
  );
}
