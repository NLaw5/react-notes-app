import React, {useEffect} from 'react'
import Note from './Note'
import AddNote from './AddNote'

function NotesList({notesData, addNoteFunction, addDeleteFunction}) {

  useEffect(() => {
    console.log(notesData)
  
  }, [])
  
  return (
    <div className="notes-list">
        {/* <Note/>
        <Note/>
        <Note/>
        <Note/> */}
        {
          notesData.map((data) => <Note details={data} addDeleteFunction={addDeleteFunction}/>)
        }
        <AddNote addNoteFunction={addNoteFunction}/>
    </div>
  )
}

export default NotesList