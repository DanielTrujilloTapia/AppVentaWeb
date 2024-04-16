import React, { useState } from 'react';
import '..//NuevaVenta.css'; // Importamos el archivo de estilos

function VentasController({ productosData }) {
  const [carrito, setCarrito] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) {
      alert(`No hay suficiente stock disponible para ${producto.nom_producto}.`);
      return;
    }
  
    const cantidadEnCarrito = carrito.filter(item => item.id_producto === producto.id_producto).length;
  
    if (cantidadEnCarrito >= producto.stock) {
      alert(`No puedes agregar más ${producto.nom_producto} al carrito. Stock insuficiente.`);
      return;
    }
  
    setCarrito([...carrito, producto]);
    setTotalVenta(totalVenta + producto.precio);
  };
  
  const eliminarDelCarrito = (id) => {
    const index = carrito.findIndex(item => item.id_producto === id);
    if (index !== -1) {
      const productoEliminado = carrito[index];
      const nuevoCarrito = [...carrito.slice(0, index), ...carrito.slice(index + 1)];
      setCarrito(nuevoCarrito);
      setTotalVenta(totalVenta - productoEliminado.precio);
    }
  };
  

  
  const limpiarCarrito = () => {
    setCarrito([]);
    setTotalVenta(0);
  };

  const finalizarVenta = async () => {
    try {
      await Promise.all(
        carrito.map(async (producto) => {
          const cantidadEnCarrito = carrito.filter(item => item.id_producto === producto.id_producto).length;
  
          const updatedStock = producto.stock - cantidadEnCarrito;
          const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos?id=${producto.id_producto}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...producto, stock: updatedStock })
          });
  
          if (!response.ok) {
            throw new Error('Error al actualizar el stock del producto');
          }
        })
      );
  
      setCarrito([]);
      setTotalVenta(0);
  
      alert('La venta se ha realizado con éxito. El stock ha sido actualizado.');
      await registrarVenta();
    } catch (error) {
      console.error('Error al finalizar la venta:', error);
      alert('Ocurrió un error al finalizar la venta. Por favor, inténtalo de nuevo.');
    }
  };
  const registrarVenta = async () => {
    try {
      console.log("Datos de la venta:", { carrito, totalVenta }); // Imprimir los datos de la venta
      const response = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Ven_Ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          carrito,
          totalVenta
        })
      });
  
      if (!response.ok) {
        throw new Error('Error al registrar la venta');
      }
  
      alert('La venta se ha registrado con éxito.');
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      alert('Ocurrió un error al registrar la venta. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <div className="ventas-container">
      <div className="productos-disponibles">
        <h2>Productos Disponibles</h2>
        <div className="productos-grid">
          {productosData.map((producto) => (
            <div key={producto.id_producto} className="producto-card">
              <img className="producto-imagen" src={producto.imagen} alt={producto.nom_producto} />
              <span>{producto.nom_producto} - ${producto.precio}</span>
              <button className="agregar" onClick={() => agregarAlCarrito(producto)}>Agregar al Carrito</button>
            </div>
          ))}
        </div>
      </div>
      <div className="carrito-compras">
        <h2>Carrito de Compras</h2>
        <div className="carrito-grid">
          {carrito.map((producto, index) => (
            <div key={`${producto.id_producto}-${index}`} className="producto-card">
              <img className="producto-imagen" src={producto.imagen} alt={producto.nom_producto} />
              <span>{producto.nom_producto} - ${producto.precio}</span>
              <button className="eliminar" onClick={() => eliminarDelCarrito(producto.id_producto)}>Eliminar</button>
            </div>
          ))}
        </div>
        <h3>Total: ${totalVenta}</h3>
        <div className="botones-finalizar">
          <button className="limpiar" onClick={limpiarCarrito}>Limpiar Carrito</button>
          <button className="finalizar" onClick={finalizarVenta}>Finalizar Venta</button>
        </div>
      </div>
    </div>
  );
}

export default VentasController;