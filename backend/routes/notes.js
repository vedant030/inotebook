const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')
const Notes = require('../models/Notes')

//ROUTE1: Get all Notes using get "api/auth/fetchallnotes". Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id })
    res.json({ notes }) 
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})

//ROUTE2: Add Note using Post "api/auth/addnote". Login required.
router.post(
  '/addnote',
  fetchuser,
  [
    body('title', 'Enter a valid Title').isLength({ min: 1 }),
    body('description', 'Enter a Long Name.').isLength({ min: 1 }),
  ], 
  async (req, res) => {
    try {
      // If there are errors return Bad request and errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { title, description, tag } = req.body

      let newnote = await Notes.create({
        title,
        description,
        tag,
        user: req.user.id,
      })

      res.json(newnote)
    } catch (err) {
      console.log(err)
      return res.status(500).send('Internal Server Error')
    }
  },
)

//ROUTE 3: Update the Existing Note using PUT "api/auth/updatenote". Login required.
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body

    let newNote = {}
    if (title) {
      newNote.title = title
    }
    if (description) {
      newNote.description = description
    }
    if (tag) {
      newNote.tag = tag
    }

    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send('Note Not Found')
    }

    if (note.user.toString() !== req.user.id) {
      return res.send('Invalid User: Not Allowed')
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    )
    res.json({ updatedNote: note })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})

//ROUTE 4: Delete the Existing Note using PUT "api/auth/deletenote/:id". Login required.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id)
    if (!note) {
      return res.status(404).send('Note Not Found')
    }
    if (note.user.toString() !== req.user.id) {
      return res.send('Invalid User: Not Allowed')
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ Success: 'Note Deleted', note: note })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
})
module.exports = router 
