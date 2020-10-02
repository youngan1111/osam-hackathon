import React from "react";
import app from "./firebase";

function ShowFirestore() {
    const [reservations, setReservations] = React.useState([]);
    const [newReservation, setNewReservation] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            const db = app.firestore();
            const data = await db.collection("reservations").get();
            setReservations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchData();
    }, []);

    const onCreate = () => {
        const db = app.firestore();
        db.collection("reservations").add({ name: newReservation });
    };

    return (
        <ul>
            <input
                value={newReservation}
                onChange={e => setNewReservation(e.target.value)}
            />
            <button onClick={onCreate}>Create</button>
            {reservations.map(reservation => (
                <li key={reservation.name}>
                    <input value={reservation.name}></input>
                </li>
            ))}
        </ul>
    );
}

export default ShowFirestore;
