import React, { useEffect, useState } from 'react';


import EmailController from "../controller/EmailController";

function EmailView() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Recupera el ID del usuario almacenado en localStorage
    const storedUserIdString = localStorage.getItem('user');
    const storedUserId = JSON.parse(storedUserIdString);
    setUserId(storedUserId);
  }, []);

  // Lógica de validación según el ID de usuario (si es necesario)
  // Puedes agregar la lógica aquí si necesitas validar el ID de usuario para esta vista
  const admin3 = userId && userId.idusucattipousuario === 1;

  return (
    <div>
      {admin3 ? (
        <EmailController />
      ) : (
        <p>No tienes permisos para ver esta página.</p>
        
      )}
    </div>
  );
}
 
  export default EmailView;