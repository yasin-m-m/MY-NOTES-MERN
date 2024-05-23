import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import Spinner from './Spinner';
import axios from 'axios';


const AddForm = ({setAddClick,setAddNote}) => {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [loading,setLoading]=useState(false)
    
    
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if (!title) {
          alert('Must Enter The Title')
          return;
        }
        if (!description) {
            alert('Must Enter The Description')
            return;
        }
        try {
          setLoading(true)
          const response=await axios.post("http://localhost:8100/api/note", {title, description})
          setAddNote(response)
        } catch (error) {
          console.log(error.message);
        } finally {
            setTitle('')
            setDescription('')
            setLoading(false)
            setAddClick(false)
        }
    }
  return (
    <div>
    {loading && <Spinner/>}
    {!loading &&
    <form className='flex flex-col items-center py-3 gap-3 bg-green-300' onSubmit={handleSubmit}>
    <label htmlFor="title" className='text-xl font-bold'>Title</label>
    <input type="text" id='title' name='title' className='border-2 border-black p-1' placeholder='Add Title [100 Char Max]' value={title} onChange={(e)=>setTitle(e.target.value)}/>
    <label htmlFor="description" className='text-xl font-bold'>Description</label>
    <textarea type="text-area" id='description' name='description' className='border-2 border-black p-1' placeholder='Add Description here [5000 Char Max]' value={description} onChange={(e)=>setDescription(e.target.value)}/>
    <button type='submit' className='flex flex-row gap-1 items-center justify-center text-xl border-2 border-black rounded p-2 font-bold hover:bg-yellow-300'><FaCirclePlus/> Add Note</button>
    </form>}
    </div>
  )
}

export default AddForm