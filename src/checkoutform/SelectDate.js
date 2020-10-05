import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import app from "../firebase";
import "moment/locale/ko"
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('ko');
const localizer = momentLocalizer(moment)

const SelectDate = ({ camp, facility }) => {
    const [events, setEvents] = React.useState([]);

    // const events = [
    //     {
    //         start: moment().add(-1, 'hours').toDate(),
    //         end: moment().toDate(),
    //         title: "정체단 단합대회"
    //     },
    //     {
    //         start: moment().add(1, "days").toDate(),
    //         end: moment().add(1, "days").toDate(),
    //         title: "전평단 단합대회"
    //     }
    // ]

    React.useEffect(() => {
        const fetchData = () => {
            const db = app.firestore();
            db.collection("camp").doc(camp).collection('facility').doc(facility).collection('date').get().then(snapshot => {
                snapshot.forEach(doc => {
                    console.log(doc.id)
                    console.log(moment(doc.id).toDate)
                    setEvents(oldArray => [...oldArray, { start: doc.id, end: doc.id, title: "forFun" }]);
                });
            });
        };
        fetchData();
    }, [camp, facility]);

    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={events}
                style={{ height: "80vh" }}
            />
        </div>
    )
}

export default SelectDate