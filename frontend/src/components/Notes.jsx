import React, { useState } from 'react'; 
import { FaPencil, FaRegTrashCan } from 'react-icons/fa6'; 
import Spinner from './Spinner';
import axios from 'axios';
 
const Notes = ({ notes,loading,setAddNote }) => { 
  const [selectedNote, setSelectedNote] = useState(null); 
  const [editNote, setEditNote] = useState(null); 
 
  const handleReadMore = (note) => { 
    setSelectedNote(note); 
  }; 

  const handleEditNote = (note) => { 
    setEditNote(note); 
  }; 
 
  const handleClosePopup = () => { 
    setSelectedNote(null); 
  }; 

 

  const handleSaveEdit = async () => { 
    try { 
      const response = await axios.put(`http://localhost:8100/api/note/${editNote._id}`, { 
        title: editNote.title, 
        description: editNote.description 
      }); 
 
      // const updatedNotes = notes.map((note) => { 
      //   if (note._id === editNote._id) { 
      //     return { ...note, title: editNote.title, description: editNote.description }; 
      //   } 
      //   return note; 
      // }); 
 
      // setNotes(updatedNotes); 
 
      // Close the edit popup 
      setEditNote(null); 
    } catch (error) { 
      console.log(error.message); 
    } 
  }; 

  const handleDelete = async (id) => {
      const confirmation = window.confirm('Are you sure you want to delete this')
      if (!confirmation) {
        return
      }
      try {
       const deleted= await axios.delete(`http://localhost:8100/api/note/${id}`)
       setAddNote(deleted)
        if (notes.length <=1) {
          setAddNote(null)
        }
      } catch (error) {
        console.log(error.message);
      }
  }
  return ( 
    <div>
    {notes.length > 0 ?( <div className='grid grid-cols-1 mx-10 md:grid-cols-2 lg:grid-cols-3 items-center gap-2 mt-2'> 
    {loading && <Spinner/>}
      { !loading && notes.map((note) => ( 
        <div className='max-w-xs rounded overflow-hidden shadow-lg bg-slate-200 mt-3 h-36 flex flex-col' key={note._id}> 
          <div className='flex-1'> 
            <h1 className='text-xl font-bold text-center border-b-2 border-black border-spacing-2'>{note.title}</h1> 
            <p className='font-semibold text-center'> 
              {note.description.length > 50 ? `${note.description.slice(0, 50)}...` : note.description} 
            </p> 
          </div> 
          <div className='flex flex-row justify-around border-t-2 border-slate-300 p-2 text-lg text-center items-center'> 
            <FaPencil className='cursor-pointer hover:text-slate-800' onClick={() => handleEditNote(note)}/> 
            {note.description.length >50 ?(
            <p className='font-semibold cursor-pointer hover:text-slate-700' onClick={() => handleReadMore(note)}>Read More</p> 
          ):null}
            <FaRegTrashCan className='text-red-500 hover:text-red-900 cursor-pointer' onClick={()=>handleDelete(note._id)} /> 
          </div> 
        </div> 
      ))} 
      {selectedNote && ( 
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'> 
          <div className='max-w-md p-4 bg-white rounded shadow-lg'> 
            <h1 className='text-xl font-bold text-center border-b-2 border-black border-spacing-2'>{selectedNote.title}</h1> 
            <p className='font-semibold text-center'>{selectedNote.description}</p> 
            <button className='mt-4 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded' onClick={handleClosePopup}>Close</button> 
          </div> 
        </div> 
      )} 
      {editNote && ( 
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50'> 
          <div className='max-w-md p-4 bg-white rounded shadow-lg'> 
          <form className='flex flex-col items-center py-3 gap-3 bg-green-300'>
          <label htmlFor="title" className='text-xl font-bold'>Title</label>
          <input type="text" id='title' name='title' className='border-2 border-black p-1' placeholder='Add Title [100 Char Max]' value={editNote.title} onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}/>
          <label htmlFor="description" className='text-xl font-bold'>Description</label>
          <textarea type="text-area" id='description' name='description' className='border-2 border-black p-1' placeholder='Add Description here [5000 Char Max]' value={editNote.description} onChange={(e) => setEditNote({ ...editNote, description: e.target.value })}/>
          <button type='submit' className='flex flex-row gap-1 items-center justify-center text-xl border-2 border-black rounded p-2 font-bold hover:bg-yellow-300' onClick={handleSaveEdit}> Update</button>
          </form>
          </div> 
        </div> 
      )} 
    </div> ):<p className='font-semibold text-xl text-center'>Your Notes List Is Empty. First Add New Notes</p>}
    </div>
   
  ); 
}; 
 
export default Notes; 