import { useEffect, useState } from 'react'
import AddNotes from './components/AddNotes'
import Nav from './components/Nav'
import Notes from './components/Notes'
import Footer from './components/Footer'
import axios from 'axios'

function App() {
  const [notes,setNotes]=useState([])
  const [loading,setLoading]=useState(false)
  const [addNote,setAddNote]=useState(null)

  const getNotes=async()=>{
      try {
        setLoading(true)
       const response=await axios.get('http://localhost:8100/api/notes');
       if (response.data.success) {
        setNotes(response.data.notes)
       }
       
       
      } catch (error) {
        console.log(error.message);
      } finally{
        setLoading(false)
      }
  }
  useEffect(() => {
    getNotes()
  }, [addNote])
  

  return (
    <div className='container mx-auto min-h-screen flex flex-col'> 
    <Nav/>
    
    <div className="flex-1"> 
    <AddNotes setAddNote={setAddNote}/> 
    <Notes notes={notes} loading={loading} setAddNote={setAddNote}/> 
    </div>
   
    <Footer className="mt-auto"/>
    
    </div>
  )
}

export default App
