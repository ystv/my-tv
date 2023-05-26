// React Imports
import React, { useEffect, useState } from "react";

// Custom Components
import "../../components/calendar.css";

// Type imports
// import { Calendar } from "../../components/types/clapper";

// Other imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useNavigate, useLocation } from "react-router-dom";
import { Heading, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { clapper } from "../../services/services";
import { Calendar as CalendarType } from "../../components/types/clapper";

// Begin Code

export default function Calendar(): JSX.Element {
  const [data, setData] = useState<Array<Record<string, unknown>>>([]);
  const [date, setDate] = useState({ month: 11, year: 2020 });
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

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

  useEffect(() => {
    clapper.getEventsByMonth(date.month, date.year).then((e) => {
      const eventArray = e.map((event: CalendarType) => {
        // eslint-disable-next-line
        const eventObject: { [key: string]: any } = {
          id: event.eventID,
          start: event.startDate,
          end: event.endDate,
          title: event.name,
          url: `/event/${event.eventID}`,
        };
        if (event.isTentative) {
          eventObject.color = "#8b8b8b";
        }
        if (event.isCancelled) {
          eventObject.url = "";
          eventObject.color = "#B00020";
        }
        return eventObject;
      });
      navigate(`${date.year}/${date.month}`);
      setData(eventArray);
    });
  }, [date]);

  return isMobile !== undefined ? (
    <>
      <Heading>Calendar</Heading>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={isMobile ? "listMonth" : "dayGridMonth"}
        headerToolbar={{
          right: "today prev,next dayGridMonth,listMonth,timeGridDay",
        }}
        showNonCurrentDates={false}
        events={data}
        datesSet={(n) =>
          setDate({
            month: n.start.getMonth() + 1,
            year: n.start.getFullYear(),
          })
        }
        titleFormat={{ year: "numeric", month: isMobile ? "short" : "long" }}
        firstDay={1}
        height="75vh"
        initialDate={GetInitDate()}
        eventClick={(info) => {
          info.jsEvent.preventDefault(); // don't let the browser navigate

          if (info.event.url) {
            navigate(info.event.url);
          }
        }}
      />
    </>
  ) : (
    <Spinner />
  );
}
