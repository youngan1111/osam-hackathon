import React from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import app from "../firebase";
import "moment/locale/ko"
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale('ko');
moment.updateLocale('ko', { week: { dow: 1 } });
const localizer = momentLocalizer(moment)

const SelectDate = ({ camp, facility, save }) => {
    const [events, setEvents] = React.useState([]);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        //https://firebase.google.com/docs/firestore/query-data/queries?hl=ko#node.js 참조

        // console.log(moment().startOf('isoWeek').format("YYYY.MM.DD"), 'date of today')
        // console.log(moment().endOf('isoWeek').format("YYYY.MM.DD"), 'date of today')

        var days = [];
        for (let i = 0; i <= 6; i++) {
            days.push(moment(moment().startOf('isoWeek')).add(i, 'days').format("YYYY.MM.DD"));
        };

        const fetchData = async () => {
            const db = app.firestore();

            //이걸로 맨 마지막 필드 값들 얻을 수 있다.
            await days.forEach(day => {
                db.collection("camp").doc(camp).collection('facility').doc(facility).collection('date').doc(day).collection('reservation').get().then(snapshot => {
                    snapshot.forEach(doc => {
                        setEvents(oldArray => [...oldArray, { start: doc.data().start.toDate(), end: doc.data().end.toDate(), title: doc.data().title }]);
                    });
                });
            })
        };
        fetchData();
    }, [camp, facility]);

    const handleSelect = async ({ start, end }) => {
        if (count === 0) {
            const title = window.prompt('예약목적을 작성해주십시오.')
            if (title) {
                await setEvents(oldArray => [...oldArray, { start, end, title }]);
                save({ start: start, end: end, title: title })
            }
            setCount(1)
        }
    }

    const onView = (view) => {
        console.log('#### onView');
        console.log('#### view=', view);//그냥 문자열로 'day' 리턴된다.
    }
    const onNavigate = (date, view) => {
        // DAY:   from moment(date).startOf('day') to moment(date).endOf('day');
        // WEEK:  from moment(date).startOf('isoWeek') to moment(date).endOf('isoWeek');
        // MONTH: from moment(date).startOf('month').subtract(7, 'days') to moment(date).endOf('month').add(7, 'days');

        if (view === 'week') console.log(moment(date).startOf('isoWeek').format("YYYY.MM.DD"), moment(date).endOf('isoWeek').format("YYYY.MM.DD"))
        console.log('#### onNavigate');
        console.log('#### date=', date);
        console.log('#### view=', view); //그냥 문자열로 'week' 리턴된다.
    }
    return (
        <div>
            <Calendar
                onNavigate={onNavigate}
                onView={onView}
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