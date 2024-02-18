import React, { useContext, useEffect, useRef, useState } from 'react'

import noteContext from '../context/noteContext'
import NoteItem from './NoteItem'
const Notes = (props) => {
  const [note, setNote] = useState({
    eid: '',
    etitle: '',
    edescription: '',
    etag: '',
  })
  const context = useContext(noteContext)
  const { notes, getNotes, updateNote } = context
  //   const setNotes = context.setNotes
  useEffect(() => {
    getNotes() 
  }, []) 
  const ref = useRef('')
  const refclose = useRef('')
  const updatenote = (currentnote) => {
    ref.current.click()
    setNote({
      eid: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    }) 
  }
  const handleClick = (e) => {
    e.preventDefault()
    updateNote(note.eid, note.etitle, note.edescription, note.etag)
    console.log('Updating Note..... ', note)
    props.setmyAlert('Note Updated Successfully', 'success')
    refclose.current.click()
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
      <button
        id="modalbutton"
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={ref}
      >
        Launch static backdrop modal
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit a Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 ">
        <h2>Your Notes</h2>
        {notes &&
          notes.map((note) => {
            return (
              <NoteItem
                note={note} 
                updatenote={updatenote}
                key={note._id}
                setmyAlert={props.setmyAlert}
              />
            )
          })}
      </div>
    </>
  )
}

export default Notes
