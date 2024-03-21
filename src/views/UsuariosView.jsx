// HomeAdView.js
import React from 'react';
import UsuariosController from '../controller/UsuariosController.jsx';
import Navbar from '../Navbar.jsx';
import '../LoginStyle.css'

function UsuariosView() {
  return (
  
    

    <div> 
      <Navbar></Navbar>
      <UsuariosController />
    </div>
  );
}
  
export default UsuariosView;
