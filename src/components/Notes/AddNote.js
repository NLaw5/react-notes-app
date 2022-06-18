import React, { useState, useEffect, useContext } from "react";
import NotesList from "./NotesList";
import { ThemeContext } from "../../App";

//this Component is for any "new component" that we are adding
function AddNote({ addNoteFunction, setOpenModal }) {
  const [newNoteText, setNoteText] = useState("");
  const wordLimit = 1000;
  let readOnlyAttribute = false;

  const { successfulText, setSuccesfulText } = useContext(ThemeContext);

  const handleChange = (event) => {
    if (wordLimit - event.target.value.length > 0) {
      setNoteText(event.target.value);
      readOnlyAttribute = false;
    } else {
      readOnlyAttribute = true;
    }
  };

  useEffect(() => {
    console.log(
      "Testing add note useContext for succsefulText: " + successfulText
    );
    if (successfulText === true) {
      setSuccesfulText(false);
      setNoteText("");
    }
  }, [successfulText]);

  const saveChange = () => {
    setOpenModal(true);
    //add safeguard so that there is no empty string
    if (newNoteText.trim().length != 0) {
      //Need to send this function
      addNoteFunction(newNoteText);
      // setNoteText("");
    } else {
      console.log("You need to enter values into the new note before saving!");
    }
  };

  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={newNoteText}
        onChange={handleChange}
        readOnly={readOnlyAttribute}
      ></textarea>
      <div className="note-footer">
        <small>{wordLimit - newNoteText.length} Remaining</small>
        {/* This button will trigger save event */}
        <button className="save" onClick={saveChange}>
          Save
        </button>
      </div>
    </div>
  );
}

export default AddNote;
