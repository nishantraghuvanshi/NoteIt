import React from 'react'
import { Link } from 'react-router-dom'

const header = () => {
  return (
    <div>
    <div className='bg-blue-200 flex justify-between h-14 items-center w-100% '>
        <Link to="/" className='font-bold font-sans text-2xl'>NoteIt.</Link>
        <div>
        <ul className='flex gap-10'>
          <Link to="/login">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Login</button>
          </Link>
          <Link to="/register">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Register</button>
          </Link>
        </ul>
        </div>
    </div>
    </div>
  )
}

export default header