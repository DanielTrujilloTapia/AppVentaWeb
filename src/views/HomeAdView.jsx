import React, { useEffect, useState } from 'react';
import HomeAdController from '../controller/HomeAdController.jsx';
import HomeEmpController from '../controller/HomeEmpController.jsx';

function HomeAdView() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recupera los datos del usuario almacenados en localStorage
    const storedUserString = localStorage.getItem('user');
    const storedUser = JSON.parse(storedUserString);
    setUser(storedUser);
  }, []);

  
  // Lógica de validación según el tipo de usuario
  const isAdmin = user && user.idusucattipousuario === 1;
  const isEmployee = user && user.idusucattipousuario === 2;
  
  return (
    <div>
      {isAdmin ? (
        <HomeAdController />
      ) : isEmployee ? (
        <HomeEmpController />
      ) : (
        <p>No tienes permisos para ver esta página.</p>
        
      )}
    </div>
  );
}

export default HomeAdView;
