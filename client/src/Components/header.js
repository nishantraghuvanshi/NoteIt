import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../userContext'

const Header = () => {
  const {user,setUser} = React.useContext(UserContext)
  const [redirect, setRedirect] = React.useState(false)
  useEffect(() => {
    fetch('http://localhost:8000/profile', {
      credentials:'include',})
      .then(res => 
        {res.json().then(data => {
            setUser(data)
        })})
  },[])

  async function logout(){
    await fetch('http://localhost:8000/logout', {
      credentials:'include',
      method:'POST',
    })
    setUser(null)
    setRedirect(true)
    if(redirect){
      setRedirect(false)
      return window.location.href = '/login'
    }

  }

  return (
    <div>
    <div className='bg-blue-200 flex justify-between h-14 items-center w-100% '>
        <Link to="/" className='font-bold font-sans text-2xl'>NoteIt.</Link>
        <div>
          {user && (
          <>
          <ul className='flex gap-10'>
          <Link to="/MainApp">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Enter</button>
          </Link>
  
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={logout}>Logout</button>
        </ul>
          </>
          )}
        {!user && (
          <ul className='flex gap-10'>
          <Link to="/login">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Login</button>
          </Link>
          <Link to="/register">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Register</button>
          </Link>
        </ul>)}
        </div>
    </div>
    </div>
  )
}

export default Header