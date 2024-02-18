import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => { 
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('authtoken') === null) {
      navigate('/login')
    }
  }, [])
  return (
    <div>
      <h4>This is About page </h4>
    </div>
  )
}

export default About
