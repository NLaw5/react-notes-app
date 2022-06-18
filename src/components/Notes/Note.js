import React, { useEffect } from "react";
import { MdDeleteForever } from "react-icons/md"; //from our react-icons

//our individual note card
function Note({ details, addDeleteFunction }) {
  useEffect(() => {
    console.log(details);
  }, []);

  const deleteNote = (id) => {
    console.log(id);
    addDeleteFunction(id);
  };
  return (
    <div className="note">
      <h1>Category: {details.categoryType}</h1>
      <span>{details.notesData}</span>
      <div className="note-footer">
        <div>
          <small>{details.datePosted}</small>
        </div>

        <MdDeleteForever
          className="delete-icon"
          size="1.3em"
          onClick={() => deleteNote(details._id)}
        />
      </div>
    </div>
  );
}

export default Note;
