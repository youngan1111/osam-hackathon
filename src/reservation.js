import React, { Component } from "react";
import { firestore } from "./firebase";

class Reservation extends Component {
  state = {
    reservations: [],
    reservation: "",
  };

  componentDidMount() {
    const reservations = [...this.state.reservations];
    firestore
      .collection("reservations")
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          reservations.push({ sports: doc.data().sports, id: doc.id });
        });
        this.setState({ reservations });
      });
  }

  onClickHandler = (e) => {
    e.preventDefault();

    firestore
      .collection("reservations")
      .add({ sports: this.state.reservation })
      .then((r) => {
        const reservations = [
          ...this.state.reservations,
          { sports: this.state.reservation, id: r.id },
        ];
        this.setState({
          reservations,
          reservation: "",
        });
      });
  };
  onChangeHandler = (e) => {
    this.setState({
      reservation: e.target.value,
    });
  };
  deleteHandler = (id) => {
    firestore
      .collection("reservations")
      .doc(id)
      .delete()
      .then(() => {
        const reservations = this.state.reservations.filter(
          (reservation) => reservation.id !== id
        );
        this.setState({ reservations });
      });
  };

  render() {
    return (
      <div>
        <ReservationAdd
          value={this.state.reservation}
          changeHandler={this.onChangeHandler}
          clickHandler={this.onClickHandler}
        />
        <ReservationDisplay
          reservations={this.state.reservations}
          deleteHandler={this.deleteHandler}
        />
      </div>
    );
  }
}

const ReservationAdd = ({ value, changeHandler, clickHandler }) => {
  return (
    <div>
      <form>
        <input value={value} onChange={changeHandler}></input>
        <button onClick={clickHandler}>저장</button>
      </form>
    </div>
  );
};

const ReservationDisplay = ({ reservations, deleteHandler }) => {
  const reservationDisplay = reservations.map((reservation) => {
    return (
      <div key={reservation.id}>
        <p>{reservation.sports}</p>
        <button onClick={() => deleteHandler(reservation.id)}>삭제</button>
      </div>
    );
  });
  return reservationDisplay;
};

export default Reservation;
