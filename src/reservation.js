import React, { Component } from 'react';

class Reservation extends Component {
	state = {
		reservations: [
			{ todo: '할일1' },
			{ todo: '할일2' },
			{ todo: '할일3' },
		],
		reservation: ''
	}

	onClickHandler = (e) => {
		e.preventDefault();
		const reservation = { todo: this.state.reservation };
		const reservations = [...this.state.reservations, reservation]
		this.setState({
			reservations,
			reservation: ''
		})
	}
	onChangeHandler = (e) => {
		this.setState({
			reservation: e.target.value
		})
	}
	deleteHandler = (index) => {
		const reservations = this.state.reservations.filter((reservation, i) => i !== index)
		this.setState({ reservations });
	}

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
					deleteHandler={this.deleteHandler} />
			</div >
		)
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
	)
}

const ReservationDisplay = ({ reservations, deleteHandler }) => {
	const reservationDisplay = reservations.map((reservation, index) => {
		return (
			<div key={index}>
				<p>{reservation.todo}</p>
				<button onClick={() => deleteHandler(index)}>삭제</button>
			</div>
		)
	})
	return reservationDisplay
}

export default Reservation