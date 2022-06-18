import React, { useEffect } from "react";
import Note from "./Note";
import AddNote from "./AddNote";

function NotesList({
  notesData,
  addNoteFunction,
  addDeleteFunction,
  setOpenModal,
}) {
  useEffect(() => {
    console.log(notesData);
  }, []);

  return (
    <div className="notes-list">
      {notesData.map((data) => (
        <Note details={data} addDeleteFunction={addDeleteFunction} />
      ))}
      <AddNote addNoteFunction={addNoteFunction} setOpenModal={setOpenModal} />
    </div>
  );
}

export default NotesList;
