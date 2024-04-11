//Clase App
import { useState } from 'react';
import {Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LoginView from './views/loginView.jsx'
import HomeAdView from './views/HomeAdView.jsx'
import NewUserView from './views/NewUserView.jsx'
import UsuariosView from './views/UsuariosView.jsx'
import ProductosView from './views/productos/ProductosView.jsx';

import Navbar from './Navbar.jsx';
import NewProductoView from './views/productos/NewProductoView.jsx';
import EmailController from './controller/EmailController.jsx';
<<<<<<< HEAD

=======
>>>>>>> 54647b362d9173d216e6ecbc41d29520877fb23f



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
<<<<<<< HEAD
        
=======
>>>>>>> 54647b362d9173d216e6ecbc41d29520877fb23f

      </Routes>
    </div>
  )
}

export default App