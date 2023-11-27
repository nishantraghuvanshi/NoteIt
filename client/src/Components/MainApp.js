import React from 'react'
import Card from './card.js'





const MainApp = () => {
  const [title, setTitle] = React.useState('')
  const [desc, setDesc] = React.useState('')
  const [tag, setTag] = React.useState('')
  const [cards, setCards] = React.useState([])

  function handleAdd(e) {
    e.preventDefault()
    addCard(title, desc, tag)
    setTitle('')
    setDesc('')
    setTag('')
  }

  const addCard = (title, desc, tags) => {
    const newCard = { title, desc, tags }
    setCards([...cards, newCard])
  }

    const deleteCard = (index) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };
  
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
          <input 
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
      <div className='bg-gray-200 h-screen'>
       <div className='flex justify-between items-center'>
         <h2 className='text-2xl font-serif font-semibold'>Your Notes</h2>
         <form className='flex justify-between gap-x-2'>
          <input type='text' placeholder='search' className='block border-2 my-4 rounded-lg'/>
          <button className='block p-1 border-2 my-4 rounded-lg bg-blue-700 text-white font-semibold'>Search</button>
         </form>
       </div>
       <div className='flex justify-between gap-4'>
          {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
       </div>
      </div>
      
    </div>
  )
}

export default MainApp