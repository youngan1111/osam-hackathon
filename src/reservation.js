import React, { Component } from "react";
import firebase from "./firebase";
import Login from './Login';

class Reservation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
      ],
      task: '',
      login: true
    }
    if (firebase.auth.currentUser === null) {
      this.state.login = false;
    }
  }

  componentDidMount() {
    const reservations = [...this.state.reservations];
    firebase.firestore
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

    firebase.firestore
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
    firebase.firestore
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
  checkLogin = () => {
    if (firebase.auth.currentUser != null) {
      this.setState({ login: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.login ?
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
          : <Login login={this.checkLogin}></Login>
        }
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
