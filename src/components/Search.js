import React, {useState} from 'react'
import {MdSearch} from 'react-icons/md'

function Search({searchFunction}) {

  const handleChange = (event) => {
    searchFunction(event.target.value)
  }

  return (
    <div className="search">
        <MdSearch className='saerch-icons' size='1.3em'/>
        <input type='text' placeholder='type to search...' onChange={(event) => {handleChange(event)}}/>
    </div>
  )
}

export default Search