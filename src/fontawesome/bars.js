import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Bars = () => {
  return (
	<a href="naver.com" className="navbar__toggleBtn">
		<FontAwesomeIcon icon={faBars}/>
	 </a>
  );
}

export default Bars;
