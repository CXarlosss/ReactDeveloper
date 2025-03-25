import React from 'react'
import { useNavigate } from 'react-router-dom'
const Contact = () => {
  const navigate = useNavigate()
  const handleSubmit = () => {
    console.log('Back to Home')
    return navigate('/');
  }
  return (
    <>
    <div className='component'>Contact</div>
    <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default Contact
