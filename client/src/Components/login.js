
import React, { useContext } from 'react'
import { useState } from 'react'
import UserContext from '../userContext'






const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUser} = useContext(UserContext)

  
  const handleclick = async (e) =>{
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/login', {
        method:'POST',
        body:JSON.stringify({
          username,
          password
        }),
        headers:{'Content-Type':'application/json'},
        credentials:'include'
                
      })
      if(response.ok){
        response.json().then(data => {
        setUser(data)
        setRedirect(true)
        localStorage.setItem('userId',data.id)
        setUsername('')
        setPassword('')
        })
        
      }
      else{
        alert('Wrong username or password.')
        console.log('error')
      }
      
    } catch (error) {
      console.log(error)
    }
    if(redirect){
      setRedirect(false)
      return window.location.href = '/'
    }

  }
  return (
    <div>
        <form className='w-[400px] m-auto mt-7' onSubmit={handleclick}>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <input type='text' 
            placeholder='username' 
            className='block w-full p-5 border-2 my-3 rounded-lg'
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}/>
            <input type='password' 
            placeholder='password' 
            className='block w-full p-5 border-2 my-3 rounded-lg'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <button className='w-full bg-gray-500 rounded-lg text-xl font-bold p-2'>Login</button> 
        </form>
    </div>
  )
}

export default Login

