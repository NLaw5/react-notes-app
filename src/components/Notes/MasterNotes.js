import React, { useState, useEffect, useContext } from "react";
import { nanoid } from "nanoid";
import NotesList from "./NotesList";
import Search from "./Search";
import Header from "./Header";
import Modal from "../Modal/Modal";
import { MdSearch } from "react-icons/md";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { ThemeContext } from "../../App";
import Dropdown from "../Dropdown/Dropdown";

function MasterNotes() {
  const [updatedNotes, setUpdateNote] = useState("");
  const [newNoteText, setNewNoteText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user, setSuccesfulText } = useContext(ThemeContext);

  const settingSearch = (e) => {
    setSearchText(e);
  };

  const [notesList, setNotes] = useState([]);

  useEffect(() => {
    console.log("Calling our express server for user notes!" + user);
    if (notesList.length == 0 || notesList == undefined) {
      getAPI();
    }
  });

  const getAPI = async () => {
    try {
      setIsLoading(true);
      const userUID = localStorage.getItem("uid");
      console.log("Inside our GET Request function!");
      return fetch(`http://localhost:8080/notes/${userUID}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          setNotes(json.message);
          setIsLoading(true);
        });
    } catch (err) {
      console.log(err);
    }
  };

  //sending function to AddNote component
  const addNote = async (text, category) => {
    //Create new note object to save new Notes:
    setNewNoteText("");
    const date = new Date();
    const newNote = {
      notesData: text,
      userUID: localStorage.getItem("uid"),
      datePosted: date.toLocaleDateString(),
      categoryType: category, //convert date to whatever format our country understands
    };
    //---------------------------------------------------------------------------------------------------------------

    //call our APi here
    fetch(`http://localhost:8080/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((data) => {
        data.json();
      })
      .then((response) => {
        console.log("Success: ", response);
        setUpdateNote("Succesfully added notes!");
        setSuccesfulText(true);
        getAPI();
      })
      .catch((error) => {
        console.log("Error when adding Notes: " + error);
      });
  };

  //Remember we need to send this deleteNote function to our Notes component, since we need it to access this function
  const deleteNote = (id) => {
    // //Create a new array that only contains the notes that are not the ID of the note that we are deleting
    // const newNotes = notesList.filter((note) => note.id !== id)

    // setNotes(newNotes);

    // //NOTE: obviously this will be different when we run it with express server, remember that we will be calling a delete route
    // //When delete route is called, we should have a getAllNotes() function to be called again for the particular user
    console.log("The Notes ID: " + id);

    //call our APi here
    fetch(`http://localhost:8080/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        data.json();
      })
      .then((response) => {
        console.log("Success: ", response);
        setUpdateNote("Succesfully deleted notes!");
        getAPI();
      })
      .catch((error) => {
        console.log("Error when adding Notes: " + error);
      });
  };

  return (
    <>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          addNote={addNote}
          newNoteText={newNoteText}
        />
      )}
      {notesList ? (
        <div className={`${darkMode ? "dark-mode" : ""}`}>
          <div className="container">
            <Header darkModeFunction={setDarkMode} />
            <Search searchFunction={settingSearch} />
            <div className="filterCategory">
              <Dropdown />
            </div>

            <NotesList
              notesData={notesList.filter((note) =>
                note.notesData.toLowerCase().includes(searchText.toLowerCase())
              )}
              addNoteFunction={setNewNoteText}
              addDeleteFunction={deleteNote}
              setOpenModal={setOpenModal}
            />
          </div>
        </div>
      ) : (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
}

export default MasterNotes;
