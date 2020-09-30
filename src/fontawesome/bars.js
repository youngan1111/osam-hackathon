import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Bars = () => {
  return (
	<i onClick={clickHandler} className="navbar__toggleBtn">
		<FontAwesomeIcon icon={faBars}/>
	 </i>
  );
}

const clickHandler = () => {
	const menu = document.querySelector('.navbar__menu');
	const icons = document.querySelector('.navbar__icons');

	menu.classList.toggle('active');
	icons.classList.toggle('active');
}

export default Bars;
