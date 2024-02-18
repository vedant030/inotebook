import React, { useContext } from 'react'

import noteContext from '../context/noteContext'

const NoteItem = (props) => {
  const { note, updatenote } = props
  const context = useContext(noteContext)
  const { deleteNote } = context

  return (
    <>
      <div className="col-md-4"> 
        <div className="card my-3">
          <div className="card-body">
            <h4 className="card-title">{note.title}</h4>
            <b>
              <p className="card-text">Tag: {note.tag}</p>
            </b>
            <p className="card-text">{note.description}</p>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                deleteNote(note._id)
                props.setmyAlert('Note Deleted Successfully', 'success')
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-3"
              onClick={() => {
                updatenote(note)
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoteItem
