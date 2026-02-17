import React from 'react'
import SearchBar from '../components/SearchBar'

function Search() {
  return (
    <section className='min-h-screen py-5'>
         <div className='flex justify-between items-center border-b-gray-900 border-b-1'>
            <h1 className="text-xl sm:text-xl font-extrabold mb-8 text-center ">
          <div className='mt-5'>
            <span className="text-blue-500">Z</span>
          <span className="text-red-500">O</span>
          <span className="text-yellow-500">L</span>
          <span className="text-green-500">O</span>
          <span className="ml-2 text-blue-500">S</span>
          <span className="text-red-500">e</span>
          <span className="text-yellow-500">a</span>
          <span className="text-green-500">r</span>
          <span className="text-blue-500">c</span>
          <span className="text-red-500">h</span>
          </div>
        </h1>
            <SearchBar/>
        <div>profile image</div>
         </div>
    </section>
  )
}

export default Search
