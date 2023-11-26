import React from 'react'


const Login = () => {
  const handleclick = () =>{

  }
  return (
    <div>
        <form className='w-[400px] m-auto mt-7'>
            <h1 className='text-3xl font-bold text-center'>Login</h1>
            <input type='text' placeholder='username' className='block w-full p-5 border-2 my-3 rounded-lg'/>
            <input type='password' placeholder='password' className='block w-full p-5 border-2 my-3 rounded-lg'/>
            <button className='w-full bg-gray-500 rounded-lg text-xl font-bold p-2' onClick={handleclick}>Login</button> 
        </form>
    </div>
  )
}

export default Login