import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import app from "../firebase";
import "moment/locale/ko"
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('ko');
const localizer = momentLocalizer(moment)

const SelectDate = ({ camp, facility, save }) => {
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        const fetchData = () => {
            const db = app.firestore();
            db.collection("camp").doc(camp).collection('facility').doc(facility).collection('date').get().then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id)
                    // setEvents(oldArray => [...oldArray, { start: moment(doc.id).toDate(), end: moment(doc.id).add(1, 'hours').toDate(), title: "forFun" }]);
                });
            });
        };
        fetchData();
    }, [camp, facility, events]);

    const handleSelect = ({ start, end }) => {
        if (events.length === 0) {
            const title = window.prompt('예약목적을 작성해주십시오.')
            if (title) {
                setEvents(oldArray => [...oldArray, { start, end, title }]);
                save({ start: start, end: end, title: title })
            }
        }
    }

    return (
        <div>
            <Calendar
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView={Views.WEEK}
                events={events}
                onSelectSlot={handleSelect}
                style={{ height: "80vh" }}
                views={{ week: true, day: true }}
                onSelectEvent={event => alert(event.title)}
            />
        </div>
    )
}

export default SelectDate