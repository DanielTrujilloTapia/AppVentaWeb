import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import VentasController from '../controller/VentasController';

function VentasView() {
  const [userId, setUserId] = useState(null);
  const [productosData, setProductosData] = useState([]);

  useEffect(() => {
    // Recupera el ID del usuario almacenado en localStorage
    const storedUserIdString = localStorage.getItem('user');
    const storedUserId = JSON.parse(storedUserIdString);
    setUserId(storedUserId);

    fetchData(); // Llama a la función fetchData para obtener los productos
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos');
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductosData(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  return (
    <div>
      <Navbar />
      {userId ? (
        <VentasController productosData={productosData} />
      ) : (
        <p>No tienes permisos para ver esta página.</p>
      )}
    </div>
  );
}

export default VentasView;
