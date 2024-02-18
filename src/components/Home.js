import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Notes from './Notes'
import AddNote from './AddNote'
import Alert from './Alert'
const Home = (props) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('authtoken') === null) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <Alert />
      <h2 className="my-3">Add a Note</h2>
      <AddNote setmyAlert={props.setmyAlert} />
      <Notes setmyAlert={props.setmyAlert} /> 
    </div>
  )
}

export default Home
