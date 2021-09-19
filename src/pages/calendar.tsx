// React Imports
import React, { useEffect, useRef, useState } from "react";

// MUI components

// Custom Components
import "../components/calendar.css";

// Type imports

// Other imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useLocation, useHistory } from "react-router-dom";
import { Heading, useBreakpointValue } from "@chakra-ui/react";
import { CalendarInterface } from "../components/types/clapper";
import apiAuthReq from "../components/functions/apiAuthReq";

// Begin Code

export default function Calendar(): JSX.Element {
  const location = useLocation();
  const rrHistory = useHistory();
  const calendarRef = useRef<FullCalendar>(null);
  const initialView = useBreakpointValue(
    {
      base: "listMonth",
      md: "dayGridMonth",
    },
    "base"
  );
  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    calendarApi?.changeView(initialView);
  }, [initialView]);

  function GetInitDate() {
    const year = parseInt(location.pathname.split("/")[2], 10);
    if (!Number.isNaN(year)) {
      const month = parseInt(location.pathname.split("/")[3], 10);
      if (!Number.isNaN(month)) {
        if (month < 10) {
          return `${year}-0${month}-01`;
        }
        return `${year}-${month}-01`;
      }
    }
    return Date.now();
  }

  function handleGetDate(urlDate: Date) {
    apiAuthReq<CalendarInterface[]>(
      `/v1/internal/clapper/calendar/monthly/${urlDate.getFullYear()}/${
        urlDate.getMonth() + 1
      }`
    ).then((e) => {
      const eventArray = e.map((event: CalendarInterface) => {
        const eventObject: { [key: string]: any } = {
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
        initialView={initialView}
        ref={calendarRef}
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
