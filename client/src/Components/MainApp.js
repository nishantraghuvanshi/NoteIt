import React from 'react'
import Card from './card.js'
import { useState } from 'react'
import UserContext from '../userContext'


const MainApp = () => {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [tag, setTag] = useState('')
  const [cards, setCards] =useState([])
  const [search, setSearch] = useState('')
  const [filtercards,setFiltercards] = useState([])
  const {user,setUser} = React.useContext(UserContext)


  const userId = localStorage.getItem('userId')

  // async function getCards(){
  //   const response = await fetch("http://localhost:8000/cards",{
  //     method:"GET",
  //     headers:{
  //       "Content-Type":"application/json"
  //     },
  //     credentials:'include'
  //   })
  //   if(response.status===200){
  //     const data = await response.json()
  //     setCards(data)
  //   }
  // }

  // React.useEffect(() => {
  //   getCards()
  // })
  
  async function handleAdd(e) {
    e.preventDefault()
    
    if (title === '' || desc === '' || tag === '') 
    {
      return alert('Please fill all the fields')
    }
    else{
      addCard(title, desc, tag)
    setTitle('')
    setDesc('')
    setTag('')
    const response = await fetch("http://localhost:8000/cards",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title:title,
        desc:desc,
        tag:tag,
        userId:userId
      })
    })
    if(response.status===201){
      console.log(response.json()
      .then(data => 
        {
          try {
            localStorage.setItem('cardId',data._id)
          } catch (error) {
            console.log(error)            
          }
        }));
    }
    }
  }

  const addCard = (title, desc, tag) => {
    const newCard = { title, desc, tag }
    setCards([...cards, newCard])
  }
  const CardId = localStorage.getItem('cardId')
  const deleteCard = (index,CardId) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
    const respose = fetch("http://localhost:8000/delete",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        index:index,
        CardId:CardId
      })
    })
    console.log(respose);
  };
  
  const filteredCards = (e) => {
    e.preventDefault()
    const newCards = cards.filter((card) => 
    card.title.toLowerCase().includes(search.toLowerCase()))
    setFiltercards(newCards)    
  }


  
  return (
    <div>
      <div className='w-1/2 '>
        <form onSubmit={handleAdd}>
          <h2 className='text-2xl font-serif font-semibold'>Add a Note</h2>
          <input type='text' 
          placeholder='title' 
          className='block w-full p-5 border-2 my-3 rounded-lg'
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          />
          <input 
          type='text' 
          placeholder='tags[Enter space seperated tags with space at the end]' 
          className='block w-full p-5 border-2 my-3 rounded-lg'
          value={tag}
          onChange={(e)=>{setTag(e.target.value)}}
          />
          <textarea 
          type='input' 
          placeholder='description' 
          className='block w-full p-5 border-2 my-3 rounded-lg'
          value={desc}
          onChange={(e)=>{setDesc(e.target.value)}}
          />
          <button className='block px-5 py-2 border-2 my-2 rounded-lg bg-blue-700 text-white font-bold'>Add</button>
        </form>
      </div>
      <hr />
      <div className='bg-gray-200 h-screen min-h-min'>
       <div className='flex justify-between items-center'>
         <h2 className='text-2xl font-serif font-semibold'>Your Notes</h2>
         <form className='flex justify-between gap-x-2'>
          <input type='text' 
          placeholder='search' 
          className='block border-2 my-4 rounded-lg'
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}/>
          <button 
          className='block p-1 border-2 my-4 rounded-lg bg-blue-700 text-white font-semibold'
          onClick={filteredCards}>Search</button>
         </form>
       </div>
       <div className='flex flex-wrap gap-3 m-2'>
          {cards.map((card, index) => (
        <Card key={index} {...card} onDelete={() => deleteCard(index)} />
      ))}
      
       </div>
       
      </div>
      <div className='bg-gray-600 h-screen min-h-min '>
        <div className='flex justify-between items-center'>
         <h2 className='text-2xl font-serif font-semibold text-white'>Filtered Notes</h2>
         </div>
         <hr />
        <div className='flex flex-wrap gap-3 m-2'>
          {filtercards.map((card, index) => (
        <Card key={index} {...card} onDelete={() => deleteCard(index)} />
      ))}
        </div>
       </div>
      
    </div>
  )
}

export default MainApp