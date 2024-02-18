import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/NoteState'
import Alert from './components/Alert' 
import Login from './components/Login'
import Signup from './components/Signup'
import { useState } from 'react'

function App() {
  const [alert, setAlert] = useState(null)

  const setmyAlert = (message, ty) => {
    setAlert({
      msg: message,
      type: ty,
    })
  }
  setTimeout(() => {
    setAlert(null)
  }, 1000)
 
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact 
                path="/"
                element={<Home setmyAlert={setmyAlert} />}
              ></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route
                exact
                path="/login"
                element={<Login setmyAlert={setmyAlert} />}
              ></Route> 
              <Route
                exact
                path="/signup"
                element={<Signup setmyAlert={setmyAlert} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  )
}

export default App
