// HomeAdView.js
import React, { useState, useEffect } from 'react';
import HomeAdController from '../controller/HomeAdController';

function HomeAdView() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Aquí puedes agregar la lógica para obtener los datos de usuario desde tu servidor
    // Por ahora, simplemente inicializaremos algunos datos de ejemplo
    const sampleUserData = [
      
    ];
    setUserData(sampleUserData);
  }, []);

  return (
    <div className="homead-container">
      <h1>Tabla de Usuarios</h1>
      <HomeAdController userData={userData} />
    </div>
  );
}

export default HomeAdView;
