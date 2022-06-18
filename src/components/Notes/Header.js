import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ darkModeFunction }) {
  let navigate = useNavigate();
  //IMPORTANT: When we call our darkModeFunction, we can grab the "previous" value of our darkmode and
  //                  set the darkmode to be the opposite
  return (
    <div className="header">
      <h1 className="toggleDarkMode">Notes</h1>
      <button
        className="save"
        onClick={() => darkModeFunction((prevDarkMode) => !prevDarkMode)}
      >
        Toggle Mode
      </button>
    </div>
  );
}

export default Header;
