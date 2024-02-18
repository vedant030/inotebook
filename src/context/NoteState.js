import React, { useState } from 'react'
import NoteContext from './noteContext'
import {baseURI as host} from '../api'
// require('dotenv').config()
const notesInitial = []
// const host = process.env.baseURI
 
const NoteState = (props) => {
  const [notes, setNotes] = useState(notesInitial)
  //Get all notes 
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    const json = await response.json() // parses JSON response into native JavaScript objects
    // console.log(json.notes)
    setNotes(json.notes)
  }

  const addNote = async (title, description, tag) => {
    //Add Note: API Request
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ title, description, tag }),
    })

    const json = await response.json()
    getNotes()
    console.log('Note Added :', json)
  }
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }) 
    const json = await response.json()
    getNotes()
    console.log({ 'Deleted Note': json.note })
  }
  const updateNote = async (id, title, description, tag) => {

    const checknote = notes.filter((e) => {
      return e._id === id
    })
    checknote.title = title
    checknote.description = description
    checknote.tag = tag
    console.log('Updating Note id: ' + id)

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('authtoken'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ title, description, tag }),
    })
    const json = await response.json()
    console.log(json)
    getNotes()
  }

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getNotes, setNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
