import React from 'react'
import { useState } from 'react'


const Resgister = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    async function Register(e){
        e.preventDefault()
        const response = await fetch('http://localhost:8000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                password
            })
        })
        if(response.ok){
            alert('User created successfully.')
            console.log('success')
        }
        else{
            alert('User already exists.')
            console.log('error')
        }
    }

  return (

    <div>
        <form className='w-[400px] m-auto mt-7' onSubmit={Register}>
            <h1 className='text-3xl font-bold text-center'>Resgister</h1>
            <input type='text' 
            placeholder='username' 
            className='block w-full p-5 border-2 my-3 rounded-lg'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <input type='password' 
            placeholder='password' 
            className='block w-full p-5 border-2 my-3 rounded-lg'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
            <button className='w-full bg-gray-500 rounded-lg text-xl font-bold p-2'>Register</button> 
        </form>
    </div>
  )
}

export default Resgister