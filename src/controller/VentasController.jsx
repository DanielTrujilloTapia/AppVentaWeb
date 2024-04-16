import React, { useState, useEffect } from 'react';

const VentasController = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [productos, setProductos] = useState([]);
  const [productosVenta, setProductosVenta] = useState([]);

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
  }, []);

  const agregarProductoVenta = (idProducto, cantidad) => {
    const producto = productos.find(producto => producto.id_producto === idProducto);
    if (producto) {
      const productoExistente = productosVenta.find(item => item.id_proproducto === idProducto);

      if (productoExistente) {
        // Si el producto ya está en la lista, incrementa la cantidad
        const nuevosProductosVenta = productosVenta.map(item => {
          if (item.id_proproducto === idProducto) {
            return {
              ...item,
              cantidad: item.cantidad + cantidad
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
          id_usuusuario: idUsuario,
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

          // Limpiar datos después de guardar la venta
          setIdUsuario('');
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
    <div>
      <h2>Realizar Venta</h2>
      <label>Usuario ID:</label>
      <input type="text" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} />
      <h3>Productos Disponibles:</h3>
      <div>
        {productos.map(producto => (
          <div key={producto.id_producto}>
            <span>{producto.nom_producto} - Precio: {producto.precio}</span>
            <button onClick={() => agregarProductoVenta(producto.id_producto, 1)}>Agregar a la Venta</button>
          </div>
        ))}
      </div>
      <h3>Productos en la Venta:</h3>
      <ul>
        {productosVenta.map(productoVenta => (
          <li key={productoVenta.id_proproducto}>
            Producto: {productoVenta.nombre} - Cantidad: {productoVenta.cantidad} - Total: {productoVenta.total}
          </li>
        ))}
      </ul>
      <button onClick={guardarVenta}>Guardar Venta</button>
    </div>
  );
};

export default VentasController;
