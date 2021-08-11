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
import listPlugin from "@fullcalendar/list";
import { useLocation, useHistory } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

// Begin Code

export default function Calendar() {
  const [data, setData] = useState<Array<object>>([]);
  const location = useLocation();
  const rrHistory = useHistory();

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
    apiAuthReq<calendarInterface[]>(
      `/v1/internal/clapper/calendar/monthly/${urlDate.getFullYear()}/${
        urlDate.getMonth() + 1
      }`
    ).then((e) => {
      let eventArray = e.map((event: calendarInterface) => {
        let eventObject: { [key: string]: any } = {
          id: event.eventID,
          start: event.startDate,
          end: event.endDate,
          title: event.name,
          url: `/event/${event.eventID}`,
          color: "#00b4ff",
        };
        if (event.isTentative === true) {
          eventObject.color = "#555555";
          eventObject.title = `${event.name} (Tentative)`;
        }
        if (event.isCancelled === true) {
          eventObject.color = "#e21717";
          eventObject.title = `${event.name} (Cancelled)`;
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
      <Heading>Calendar</Heading>
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
        eventClick={(info) => {
          info.jsEvent.preventDefault(); // don't let the browser navigate

          if (info.event.url) {
            rrHistory.push(info.event.url);
          }
        }}
      />
    </>
  );
}
