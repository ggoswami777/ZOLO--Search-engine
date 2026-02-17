import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Search from './pages/Search'

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/search/:id' element={<Search/>}/>
    
   </Routes>
  )
}

export default App
