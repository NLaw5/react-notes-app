import React, {useState, useEffect} from 'react'
import NotesList from './NotesList';

//this Component is for any "new component" that we are adding
function AddNote({addNoteFunction}) {

  const [newNoteText, setNoteText] = useState('');
  const wordLimit = 200;
  let readOnlyAttribute = false;

  const handleChange = (event) =>{
    if(wordLimit - event.target.value.length > 0)
    {
        setNoteText(event.target.value)
        readOnlyAttribute = false;
    }
    else{
        readOnlyAttribute = true;
    }
  }

  const saveChange = () =>{

    //add safeguard so that there is no empty string
    if(newNoteText.trim().length != 0) 
    {
        addNoteFunction(newNoteText);
        //Empty out our state variable once addNoteFunction works!
        setNoteText('');
    }
    else{
        console.log("You need to enter values into the new note before saving!")
    }  
  }

  return (
    <div className="note new">
        <textarea rows="8" cols="10" placeholder="Type to add a note..."
            value={newNoteText}
            onChange={handleChange}
            readOnly={readOnlyAttribute}
        >

        </textarea>
        <div className="note-footer">
            <small>{wordLimit - newNoteText.length} Remaining</small>
            {/* This button will trigger save event */}
            <button className='save' onClick={saveChange}>Save</button>
        </div>
    </div>
  )
}

export default AddNote