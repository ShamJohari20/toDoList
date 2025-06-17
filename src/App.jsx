import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Protected from './pages/Protected'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} ></Route> */}
          <Route path="/" element={<Login />} ></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Home" element={<Protected Component={Home} />}></Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App