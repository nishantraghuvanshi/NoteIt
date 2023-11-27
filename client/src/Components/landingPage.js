import React from 'react';


const LandingPage = () => {
  return (
    <div className=" bg-yellow-300 h-full w-full">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-blue-100 rounded-lg shadow-2xl p-10">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold">NoteIt.</h1>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-gray-500">A note taking app</p>
          </div>
          </div>
        </div>
    </div>
  );
}

export default LandingPage;
