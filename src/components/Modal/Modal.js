import React, { useState } from "react";
import "./Modal.css";
import Dropdown from "../Dropdown/Dropdown";

function Modal({ setOpenModal, addNote, newNoteText }) {
  const [category, setCategory] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const clickHandler = () => {
    if (newNoteText !== "" && category !== "") {
      setErrorMsg(false);
      addNote(newNoteText, category);
      setOpenModal(false);
    } else {
      console.log("error message is false!");
      setErrorMsg(true);
      setOpenModal(true);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => setOpenModal(false)}> X </button>
        </div>
        <div className="modalTitle">
          <h1>
            Please check that all information is filled out and assign a
            category
          </h1>
          <Dropdown setCategory={setCategory} />
        </div>
        <div className="modalBody">
          {errorMsg ? (
            <p className="errorMsg">
              NOTE: Note form submission is incorrect, please double check if
              category is selected and/or notes text is not empty
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="modalFooter">
          <button
            style={{ backgroundColor: "crimson" }}
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </button>
          <button onClick={() => clickHandler()}>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
