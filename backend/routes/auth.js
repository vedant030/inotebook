const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router() 

const JWT_SECRET = 'OmmIk@$143' 

//ROUTE1:  Create a user using POST "api/auth/createuser". No login required.
router.post(
  '/createuser',
  [
    body('email', 'Enter a valid Email').isEmail(),
    body('name', 'Enter a Long Name.').isLength({ min: 1 }),
    body('password', 'Enter at least 5 characters in Password.').isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // If there are errors return Bad request and errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    let success = false
    // Checking if alreday user with this mail id exits or not
    try {
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res
          .status(400)
          .json({ message: 'Sorry : Already Email Id Registered' })
      }

      const pass = req.body.password
      const salt = await bcrypt.genSaltSync(10)
      const secpass = await bcrypt.hashSync(pass, salt)

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      })

      //Creating JWT (Authorization Token) with the help of id and returning it to a user
      const data = {
        user: {
          id: user.id,
        }, 
      }
      var authtoken = jwt.sign(data, JWT_SECRET) 
      success = true
      res.json({ success, authtoken })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Some Error occured')
    }
  },
)

//ROUTE2: Login a user using POST "api/auth/login". No login required.
router.post(
  '/login',
  [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter Password.').exists(),
  ],
  async (req, res) => {
    // If there are errors return Bad request and errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const email = req.body.email
    const pass = req.body.password
    let success = false

    try {
      let user = await User.findOne( {email} )
      if (!user) {
        return res
          .status(400)
          .json({ error: 'Please Login with correct credentials.' })
      }

      const comparePassword = await bcrypt.compare(pass, user.password)
      if (!comparePassword) {
        return res
          .status(400)
          .json({ error: 'Please Login with correct credentials.' })
      }

      const data = {
        user: {
          id: user.id,
        },
      }
      const authtoken = jwt.sign(data, JWT_SECRET)
      if (authtoken) {
        success = true
      }
      res.json({ success, authtoken })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Internal Error Occured')
    }
  },
)
 
//ROUTE3:  Get Loged in User Details using post "api/auth/getuser"
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    let userId = req.user.id
    let user = await User.findById(userId).select('-password')
    res.send(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Internal Error Occured')
  }
})

module.exports = router
