import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import AddForm from './AddForm';


const AddNotes = ({setAddNote}) => {
  const [addClick,setAddClick]=useState(false)

  const handleClick=()=>{
      setAddClick(true)
  }
  return (
    <div>
    {!addClick ?(
    <div className='flex flex-row items-center justify-center py-1 gap-3 w-full text-green-950 cursor-pointer' onClick={handleClick}>
    <FaCirclePlus className='text-3xl hover:text-green-900'/>
    <h2 className='text-3xl hover:text-green-900'>Add Note</h2>
    </div>
  ):<AddForm setAddClick={setAddClick} setAddNote={setAddNote}/>}
  </div>
  )
}

export default AddNotes