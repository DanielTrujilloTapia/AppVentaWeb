import React, { useEffect, useState } from 'react';
import UsuariosController from '../controller/UsuariosController.jsx';
import '../LoginStyle.css'; 
import UsuEmpleadosController from '../controller/UsuEmpleadosController.jsx';

function UsuariosView() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Recupera el ID del usuario almacenado en localStorage
    const storedUserIdString = localStorage.getItem('user');
    const storedUserId = JSON.parse(storedUserIdString);
    setUserId(storedUserId);
  }, []);

  // Lógica de validación según el ID de usuario (si es necesario)
  // Puedes agregar la lógica aquí si necesitas validar el ID de usuario para esta vista
  const admin2 = userId && userId.idusucattipousuario === 1;
  const empleado2 = userId && userId.idusucattipousuario === 2;

  return (
    <div>
      {admin2 ? (
        <UsuariosController />
      ) : empleado2 ? (
        <UsuEmpleadosController />
      ) : (
        <p>No tienes permisos para ver esta página.</p>
        
      )}
    </div>
  );
}

export default UsuariosView;
