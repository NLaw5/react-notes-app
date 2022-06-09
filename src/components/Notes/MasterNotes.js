import React, {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header'
import { MdSearch } from 'react-icons/md';

function MasterNotes({user}) {

  
  // useEffect(() => {
  //   //Store in localStorage that user is currently logged in:
  //   localStorage.setItem('userEmail', user.email)
  //   localStorage.setItem('userName', user.displayName)
  //   localStorage.setItem('uid', user.uid)
  // }, user)

  const [searchText, setSearchText] = useState('')
  const [darkMode, setDarkMode] = useState(false)


  const settingSearch = (e) => {
    setSearchText(e)
  }

  //Note: we will be using this variable to store our Notes Value 
  const [notesList, setNotes] = useState([{
    id: nanoid(),
    text: "This is my first note!",
    date: "05/31/2022"
  },
  {
    id: nanoid(),
    text: "This is my second note!",
    date: "05/31/2022"
  },
  {
    id: nanoid(),
    text: "This is my third note!",
    date: "05/31/2022"
  },
  ]); //Need to know text of the note and the date of the note as well

  //sending function to AddNote component
  const addNote = (text) => {
    //Create new note object to save new Notes:
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString() //convert date to whatever format our country understands
    }

    // We don't call our useState first, because it's bad to mutate states
    // Instead we create a whole new array by adding newNote to the end of our notes array by coping the notes array in first parameter
    // Then adding newNote at the end
    const newNotes = [...notesList, newNote];

    //Now that we have our new Array, we can simply add this as the new Array for our notesList
    setNotes(newNotes);
  }

  //Remember we need to send this deleteNote function to our Notes component, since we need it to access this function
  const deleteNote = (id) => {
    //Create a new array that only contains the notes that are not the ID of the note that we are deleting
    const newNotes = notesList.filter((note) => note.id !== id) 

    setNotes(newNotes);

    //NOTE: obviously this will be different when we run it with express server, remember that we will be calling a delete route
    //When delete route is called, we should have a getAllNotes() function to be called again for the particular user
  }
  
  return (
    <div className={`${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <Header darkModeFunction={setDarkMode}/>
        <Search searchFunction={settingSearch}/>
        <NotesList notesData={notesList.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))} 
        addNoteFunction ={addNote} addDeleteFunction={deleteNote}/>
      </div>
    </div>
  );
}

export default MasterNotes 
