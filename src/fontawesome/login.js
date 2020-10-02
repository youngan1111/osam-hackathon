import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    return (
        <i className="fas fa-door-closed">
            <FontAwesomeIcon icon={faLock} />
        </i>
    );
}

export default Login;
