import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {baseURI as host} from '../api'
// require('dotenv').config()
const Signup = (props) => {
  const [credential, setCredential] = useState({
    name: '',
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault() 
    signup()
    setCredential({ name: '', email: '', password: '' })
  }
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  const signup = async () => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      }),
    })
    const json = await response.json()
    if (json.success) {
      console.log('User Added with authtoken', json)
      props.setmyAlert('Success: SignUp Successfully', 'success')
      localStorage.setItem('authtoken', json.authtoken)
      navigate('/')
    } else {
      props.setmyAlert(json.message, 'danger')
    }
  }

  return (
    <div>
      <form className="container my-5">
        <h2 className="my-1">SignUp</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={onChange}
            value={credential.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credential.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credential.password}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
