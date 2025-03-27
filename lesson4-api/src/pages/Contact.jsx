import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
const Contact = () => {
  const navigate = useNavigate()
  const handleSubmit = () => {
    console.log('Back to Home')
    return navigate('/');
  }
  return (
    <main>
    <div className='component'>Contact</div>
    <Outlet />
    <button onClick={handleSubmit}>Submit</button>
    </main>
  )
}

export default Contact
