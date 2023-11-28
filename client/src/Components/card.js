import React, { useState } from 'react';

const Card = ({title,desc,tag,onDelete}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const newTag=tag.split(' ')
  
  const handleDelete = () => {
    onDelete();
  }

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  return (
    
      <div className="bg-[#514f4a] shadow-xl h-48 overflow-hidden rounded-lg">
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
              className="bg-red-600 m-2 text-white font-bold px-4 py-1 rounded-lg"
              onClick={openModal}
            >
              View Details
            </button>
            <button className="bg-red-600 m-2 text-white font-bold px-4 py-1 rounded-lg" onClick={handleDelete}>Delete</button>
               
          </div>
        </div>


      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 w-1/4 rounded-md">
            {/* Adjusted width to cover 25% of the screen */}
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
