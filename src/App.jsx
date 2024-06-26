//Clase App
import { useState } from 'react';
import {Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginView from './views/loginView.jsx'
import HomeAdView from './views/HomeAdView.jsx'
import NewUserView from './views/NewUserView.jsx'
import UsuariosView from './views/UsuariosView.jsx'
import ProductosView from './views/productos/ProductosView.jsx';
import VentasView from './views/VentasView.jsx';

import Navbar from './Navbar.jsx';
import NewProductoView from './views/productos/NewProductoView.jsx';
import EmailController from './controller/EmailController.jsx';
import VentasTablaView from './views/VentasTablaView.jsx';



function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginView setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path="/home" element={<HomeAdView />} />
        <Route path="/crear" element={<NewUserView />} />
        <Route path="/usuarios" element={<UsuariosView />} />
        <Route path="/productosAdmin" element={<ProductosView />} />
        <Route path="/productoNuevo" element={<NewProductoView />} />
        <Route path="/contactanos" element={<EmailController />} />
        <Route path="/ventasNueva" element={<VentasView />} />
        <Route path="/ventas" element={<VentasTablaView />} />


      </Routes>
    </div>
  )
}

export default App