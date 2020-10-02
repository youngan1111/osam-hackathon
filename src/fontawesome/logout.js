import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const Logout = () => {
  return (
    <i className="fas fa-door-open">
      <FontAwesomeIcon icon={faDoorOpen} />
    </i>
  );
}

export default Logout;
