import React from 'react';
import {
  Switch,
  Route,
  NavLink,
  useParams,
  useRouteMatch
} from "react-router-dom";

const Sports = () => {
	let {activiyId} = useParams();
	return <h3>Requested activiy ID: {activiyId}</h3>;
}

const ShowReservation = () => {
	let match = useRouteMatch();

	let arr = [];
	for(let i = 0; i < activity.length; i++){
		arr.push(<li key={i}><NavLink className="reservationList" to={`${match.url}/${activity[i].id}`}>{activity[i].title}</NavLink></li>)
	}
	
	return(
		<div>
			<h2>Show a reservation~</h2>
			
			<ul>{arr}</ul>

			<Switch>
				<Route path={`${match.path}/:activiyId`}>
				  <Sports />
				</Route>
				<Route path={match.path}>
				  <h3>Erase this phrase or show default information</h3>
				</Route>
      		</Switch>
			
	</div>
	)
}

let activity = [
	{id:1, title:'Soccer'},
	{id:2, title:'Baseball'},
	{id:3, title:'Basketball'}
]



export default ShowReservation