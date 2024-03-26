//Clase App
import { useState } from 'react';
import {Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginView from './views/loginView.jsx'
import HomeAdView from './views/HomeAdView.jsx'
import UsuariosView from './views/UsuariosView.jsx'
import NewUserView from './views/NewUserView.jsx'
import Navbar from './Navbar.jsx';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginView setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/home" element={<HomeAdView />} />
        <Route path="/crear" element={<NewUserView />} />
        <Route path="/usuarios" element={<UsuariosView />} />
        <Route path="/registro" element={<NewUserView />} />
      </Routes>
    </div>
  )
}

export default App
