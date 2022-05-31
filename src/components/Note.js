import React, { useEffect } from 'react'
import {MdDeleteForever} from 'react-icons/md'; //from our react-icons 

//our individla note card
function Note({details, addDeleteFunction}) {

  useEffect(() => {
    console.log(details)
  
  }, [])
  
  const deleteNote = (id) => {
    console.log(id);
    addDeleteFunction(id);
  }
  return (
    <div className='note'>
        <span>{details.text}</span>
        <div className="note-footer">
            <small>{details.date}</small>

            <MdDeleteForever className='delete-icon' size='1.3em' onClick={() => deleteNote(details.id)}/>
        </div>
    </div>
  )
}

export default Note