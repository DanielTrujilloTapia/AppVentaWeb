import React, { useState, useEffect } from 'react';
import '../NuevaVenta.css';

const VentasController = () => {
  const [productos, setProductos] = useState([]);
  const [productosVenta, setProductosVenta] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Obtener productos desde la API al cargar el componente
    const obtenerProductos = async () => {
      try {
        const response = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
    obtenerProductos();

    const storedUserIdString = localStorage.getItem('user');
    const storedUserId = JSON.parse(storedUserIdString);
    setUserId(storedUserId);
  }, []);

  const agregarProductoVenta = (idProducto, cantidad) => {
    const producto = productos.find(producto => producto.id_producto === idProducto);
    if (producto) {
      const productoExistente = productosVenta.find(item => item.id_proproducto === idProducto);

      if (productoExistente) {
        // Si el producto ya está en la lista, incrementa la cantidad y actualiza el total
        const nuevosProductosVenta = productosVenta.map(item => {
          if (item.id_proproducto === idProducto) {
            return {
              ...item,
              cantidad: item.cantidad + cantidad,
              total: (item.cantidad + cantidad) * producto.precio // Calcular el nuevo total
            };
          }
          return item;
        });
        setProductosVenta(nuevosProductosVenta);
      } else {
        // Si el producto no está en la lista, agrégalo con la cantidad especificada
        const productoVenta = {
          id_proproducto: idProducto,
          cantidad: cantidad,
          nombre: producto.nom_producto,
          total: cantidad * producto.precio
        };
        setProductosVenta([...productosVenta, productoVenta]);
      }
    }
  };
  const eliminarProductoVenta = (idProducto) => {
    const nuevosProductosVenta = productosVenta.filter(item => item.id_proproducto !== idProducto);
    setProductosVenta(nuevosProductosVenta);
  };

  const limpiarCarrito = () => {
    setProductosVenta([]);
  };

  const guardarVenta = async () => {
    try {
      // Generar y guardar el folio único
      const nuevoFolio = generarFolioUnico();

      // Crear nueva venta en ven_venta
      const ventaResponse = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Ven_Ventas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuusuario: userId.id_usuario,
          folio: nuevoFolio,
          fecha_venta: new Date(),
          idvencatestado: 1
        })
      });
      const ventaData = await ventaResponse.json();
      console.log('Venta Response:', ventaData);

      if (ventaData === true) {
        // Obtener todas las ventas
        const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Ven_Ventas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data.length > 0) {
          // Obtener el último registro
          const ultimaVenta = data[data.length - 1];
          const ventaId = ultimaVenta.id_venta;

          // Agregar productos a la venta en ven_venta_producto
          await Promise.all(productosVenta.map(async productoVenta => {
            await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Ven_Venta_Producto', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                id_venventa: ventaId,
                id_proproducto: productoVenta.id_proproducto,
                cantidad: productoVenta.cantidad,
                total: productoVenta.total
              })
            });
          }));

          await Promise.all(productosVenta.map(async productoVenta => {
            const producto = productos.find(item => item.id_producto === productoVenta.id_proproducto);
            if (producto) {
              const nuevoStock = producto.stock - productoVenta.cantidad;
              if (nuevoStock >= 0) {
                try {
                  const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos?id=${producto.id_producto}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      ...producto,
                      stock: nuevoStock
                    })
                  });
                  if (!response.ok) {
                    throw new Error(`Error al actualizar el producto con ID ${producto.id_producto}: ${response.statusText}`);
                  }
                  console.log(`Stock actualizado para el producto con ID ${producto.id_producto}. Nuevo stock: ${nuevoStock}`);
                } catch (error) {
                  console.error(`Error en la actualización del producto con ID ${producto.id_producto}:`, error);
                }
              } else {
                console.error(`Error: El nuevo stock para el producto con ID ${producto.id_producto} no puede ser negativo.`);
              }
            } else {
              console.error('Error: Producto no encontrado en la lista de productos.');
            }
          }));
          

          // Limpiar datos después de guardar la venta
          setProductosVenta([]);
          alert('Venta guardada exitosamente');
        } else {
          console.error('Error al obtener el ID de venta.');
          alert('Ocurrió un error al obtener el ID de venta.');
        }
      } else {
        console.error('Error al guardar la venta.');
        alert('Ocurrió un error al guardar la venta');
      }
    } catch (error) {
      console.error('Error al guardar la venta:', error);
      alert('Ocurrió un error al guardar la venta');
    }
  };

  const generarFolioUnico = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let folioGenerado = '';
    for (let i = 0; i < 10; i++) {
      folioGenerado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return folioGenerado;
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Columna de productos disponibles */}
      <div className="productos-disponibles">
        <h2>Productos Disponibles:</h2>
        {productos.map(producto => (
          <div key={producto.id_producto} className="producto-card">
            <span>{producto.nom_producto} - Precio: {producto.precio} - Stock: {producto.stock}</span>
            <img src={producto.imagen} alt={producto.nom_producto} /> {/* Mostrar la imagen del producto */}
            <button className="button" onClick={() => agregarProductoVenta(producto.id_producto, 1)}>Agregar a la Venta</button>
          </div>
        ))}
      </div>
      {/* Columna de finalización de venta */}
      <div className="productos-en-venta">
        <h2>Productos en la Venta:</h2>
        <ul>
          {productosVenta.map(productoVenta => (
            <li key={productoVenta.id_proproducto} className="producto-card">
              <img src={productoVenta.imagen} alt={productoVenta.nombre} /> {/* Mostrar la imagen del producto */}
              Producto: {productoVenta.nombre} - Cantidad: {productoVenta.cantidad} - Total: {productoVenta.total}
              <button className="button" onClick={() => eliminarProductoVenta(productoVenta.id_proproducto)}>Eliminar</button> {/* Botón para eliminar el producto */}
            </li>
          ))}
        </ul>
        <button className="button" onClick={guardarVenta}>Guardar Venta</button>
        <button className="button" onClick={limpiarCarrito}>Limpiar Carrito</button> {/* Botón para limpiar el carrito */}
      </div>
    </div>
  );
};

export default VentasController;
