import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {baseURI as host} from '../api'
// require('dotenv').config()
const Login = (props) => {
  const [credential, setCredential] = useState({ email: '', password: '' })

  const handleClick = (e) => {
    e.preventDefault()
    login()
    setCredential({ email: '', password: '' })
  }
  const navigate = useNavigate()
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  // const host = process.env.baseURI

  const login = async () => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    })
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('authtoken', json.authtoken)
      props.setmyAlert('Success: Logged in Successfully', 'success')
      navigate('/')
    } else {
      localStorage.clear()
      props.setmyAlert('Error: Enter Valid Data', 'danger')
    }
  }
  return (
    <div>
      <form className="container my-5">
        <h2 className="my-1">Login</h2>
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

export default Login
