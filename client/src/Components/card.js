import React, { useState } from 'react';

const Card = ({title,desc,tag,onDelete}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);
  const [nTag, setNTag] = useState(tag);
  const newTag=tag.split(' ')
  
  const cardId=localStorage.getItem('cardId')

  const handleDelete = () => {
    onDelete();
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const handleEdit = () => {
    setEditOpen(true);
  }

  const closeEdit = () => {
    fetch(`http://localhost:8000/update`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title:newTitle,
        desc:newDesc,
        tag:nTag,
        id:cardId
      })
    })
    if(newTitle==='' || newDesc==='' || nTag===''){
      return alert('Please fill all the fields')
    }
    else{
      setEditOpen(false);
    }

  }


  return (
    
      <div className="bg-[#514f4a] shadow-2xl h-48 w-1/4 overflow-hidden rounded-lg ">
        <div className="card-body flex flex-col h-full text-white p-1">
          <h2 className="card-title font-bold text-2xl">{title}</h2>
          {tag &&  (
            <div className="text-sm text-gray-300">
              {newTag.map((tag, index) => (
                <span key={index} className="mr-2 bg-blue-100 font-light text-black rounded-lg  px-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <hr className="border-white my-2" />
          <p className="flex-1 overflow-y-auto flex-wrap">{desc}</p>
          <div className="card-actions flex justify-between items-center">
            <button
              className="bg-red-600 m-2 text-white font-bold px-3  rounded-lg"
              onClick={openModal}
            >
              View Details
            </button>
            <button className="bg-red-600 m-2 text-white font-bold px-2 py-1 rounded-lg" onClick={handleEdit}>Edit</button>
            <button className="bg-red-600 m-2 text-white font-bold px-2 py-1 rounded-lg" onClick={handleDelete}>Delete</button>
               
          </div>
        </div>

        {/* Edit */}
        {isEditOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-1/4 rounded-md">
              <h2 className="font-bold text-3xl mb-4">Edit Note</h2>
            <input type='text' 
            placeholder='title' 
            className='block w-full p-5 border-2 my-3 rounded-lg'
            value={newTitle}
            onChange={(e)=>{setNewTitle(e.target.value)}}
            />
            <input 
            type='text' 
            placeholder='tags[Enter space seperated tags with space at the end]' 
            className='block w-full p-5 border-2 my-3 rounded-lg'
            value={nTag}
            onChange={(e)=>{setNTag(e.target.value)}}
            />
            <textarea 
            type='input' 
            placeholder='description' 
            className='block w-full p-5 border-2 my-3 rounded-lg'
            value={newDesc}
            onChange={(e)=>{setNewDesc(e.target.value)}}
            />
            <div className="mt-4 flex justify-end">
              
              <button
                className="bg-red-600 text-white font-bold px-4 py-1 rounded-lg"
                onClick={closeEdit}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
        


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-1/4 rounded-md">
              <h2 className="font-bold text-3xl mb-4">{title}</h2>
            {tag &&  (
            <div className="text-sm text-gray-300">
              {newTag.map((tag, index) => (
                <span key={index} className="mr-2 bg-blue-100 text-black rounded-lg font-semibold px-1">
                  {tag}
                </span>
              ))}
            </div>
          )}
            <p>{desc}</p>
            <div className="mt-4 flex justify-end">
              
              <button
                className="bg-red-600 text-white font-bold px-4 py-1 rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
