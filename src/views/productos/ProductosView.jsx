import React, { useEffect, useState } from 'react';

import ProductosController from "../../controller/productos/ProductosController";
import ProdEmpleadoController from "../../controller/productos/ProdEmpeladoController";
import Navbar from '../../Navbar';

function ProductosView() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Recupera el ID del usuario almacenado en localStorage
    const storedUserIdString = localStorage.getItem('user');
    const storedUserId = JSON.parse(storedUserIdString);
    setUserId(storedUserId);
  }, []);

  // Lógica de validación según el ID de usuario (si es necesario)
  // Puedes agregar la lógica aquí si necesitas validar el ID de usuario para esta vista
  const admin = userId && userId.idusucattipousuario === 1;
  const empleado = userId && userId.idusucattipousuario === 2;
  
  return (
    <div> 
      <Navbar/>
      {admin ? (
        <ProductosController />
      ) : empleado ? (
        <ProdEmpleadoController />
      ) : (
        <p>No tienes permisos para ver esta página.</p>
        
      )}
    </div>
  );
}
  
export default ProductosView;
