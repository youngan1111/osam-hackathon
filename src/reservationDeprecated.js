import React from "react";
import app from "./firebase";

const Reservation = () => {
  const [reservations, setReservations] = React.useState([]);
  const [newReservation, setNewReservation] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      const db = app.firestore();
      const data = await db.collection("reservations").get();
      setReservations(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const onCreate = (e) => {
    e.preventDefault();

    const db = app.firestore();
    db.collection("reservations").add({ name: newReservation })
      .then(r => {
        setReservations([...reservations, { name: newReservation, id: r.id }]);
      })
    setNewReservation("");
  };
  const onDelete = async (id) => {
    const db = app.firestore();
    await db.collection("reservations").doc(id).delete();
    const newReservations = reservations.filter(
      (reservation) => reservation.id !== id
    );
    setReservations([...newReservations])
  }

  return (
    <ul>
      <form onSubmit={onCreate}>
        <input
          value={newReservation}
          type="text"
          onChange={({ target: { value } }) => setNewReservation(value)}
        />
        <button type="submit">추가</button>
      </form>
      {
        reservations.map(reservation => (
          <li key={reservation.id}>
            <input defaultValue={reservation.name} readOnly ></input>
            <button type="submit" onClick={() => onDelete(reservation.id)}>삭제</button>
          </li>
        ))
      }
    </ul >
  );
}

export default Reservation;
