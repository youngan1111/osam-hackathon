import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko"
import "react-big-calendar/lib/css/react-big-calendar.css";
moment.locale('ko');

const localizer = momentLocalizer(moment)

const BigCalendar = () => {
  const events = [
    {
      start: moment().toDate(),
      end: moment()
        .add(1, "days")
        .toDate(),
      title: "Some title"
    }
  ]

  return (
    <div>
      <Calendar
        popup
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  )
}

export default BigCalendar