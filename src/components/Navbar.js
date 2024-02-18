import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  let location = useLocation().pathname
  const logout = () => {
    localStorage.removeItem('authtoken')
    navigate('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-body-tertiary-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location === '/' ? 'active' : ''}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location === '/about' ? 'active' : ''} `}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('authtoken') ? (
            <form>
              <Link className="btn btn-primary mx-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup">
                SignUp
              </Link>
            </form>
          ) : (
            <button type="logout" className="btn btn-primary" onClick={logout}>
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
