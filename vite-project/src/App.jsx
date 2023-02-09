
import React from 'react'
import './App.css'
import Login1 from './pages/Login1' ;
import Sign_up from './pages/Sign_up';
import Hope from './pages/Hope';
import { BrowserRouter, Routes, Route ,Router} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Hope/>} />
          <Route path="signup" element={<Sign_up />} />
          <Route path="home" element={<Hope />} />
          <Route path="login" element={<Login1/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
