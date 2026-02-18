import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Search from './pages/Search'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search/:id' element={<Search />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
