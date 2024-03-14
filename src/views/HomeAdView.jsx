// HomeAdView.js
import React from 'react';
import HomeAdController from '../controller/HomeAdController';
import '../App.css'; // Importa los estilos CSS

function HomeAdView() {
  return (
    <div className="homead-view-container"> 
      <h1>Usuarios Registrados</h1>
      <HomeAdController />
    </div>
  );
}

export default HomeAdView;
