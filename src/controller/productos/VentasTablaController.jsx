import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

const VentasTallaController = () => {
  const [ventas, setVentas] = useState([]);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [ventaProductos, setVentaProductos] = useState([]);
  const [productosNombres, setProductosNombres] = useState([]);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Ven_Ventas');
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchVentas();
  }, []);

  const handleVentaClick = async (ventaId) => {
    try {
      const confirmation = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas ver los detalles de esta venta?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, mostrar detalles',
        cancelButtonText: 'Cancelar'
      });

      if (confirmation.isConfirmed) {
        const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Ven_Venta_Producto?id_venventa=${ventaId}`);
        const data = await response.json();
        const ventasProductoFiltradas = data.filter(ventaProducto => ventaProducto.id_venventa === ventaId);
        setVentaProductos(ventasProductoFiltradas);
        setSelectedVenta(ventaId);
        
        // Obtener los nombres de los productos
        const nombres = await Promise.all(ventasProductoFiltradas.map(async (ventaProducto) => {
          try {
            const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/ObtenerNombreProductoPorID?id_proproducto=${ventaProducto.id_proproducto}`);
            const data = await response.json();
            return data.nombre_producto;
          } catch (error) {
            console.error('Error fetching product name:', error);
            return '';
          }
        }));
        setProductosNombres(nombres);
      }
    } catch (error) {
      console.error('Error fetching venta productos:', error);
    }
  };

  const generatePDF = () => {
    if (!selectedVenta) {
      return;
    }

    const doc = new jsPDF();
    
    let ticketContent = `ID Venta: ${selectedVenta}\nProductos:\n`;

    ventaProductos.forEach((ventaProducto, index) => {
      ticketContent += `- Nombre: ${productosNombres[index]}\n`;
      ticketContent += `  Cantidad: ${ventaProducto.cantidad}\n`;
      ticketContent += `  Total: ${ventaProducto.total}\n`;
    });

    doc.text(ticketContent, 10, 10);

    doc.save('ticket_compra.pdf');
  };

  return (
    <div>
      <h2>Tabla de Ventas</h2>
      <button onClick={() => window.location.href = '/ventasNueva'}>/ventasNueva</button>
      <table className="ventas-table">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Usuario</th>
            <th>Folio</th>
            <th>Fecha de Venta</th>
            <th>ID Estado</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.id_venta} onClick={() => handleVentaClick(venta.id_venta)}>
              <td>{venta.id_venta}</td>
              <td>{venta.id_usuusuario}</td>
              <td>{venta.folio}</td>
              <td>{new Date(venta.fecha_venta).toLocaleString()}</td>
              <td>{venta.idvencatestado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {selectedVenta && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectedVenta(null)}>&times;</span>
            <h3>Ventas de Productos</h3>
            <table className="productos-table">
              <thead>
                <tr>
                  <th>ID Venta</th>
                  <th>Nombre Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ventaProductos.map((ventaProducto, index) => (
                  <tr key={ventaProducto.id_venta_producto}>
                    <td>{ventaProducto.id_venventa}</td>
                    <td>{productosNombres[index]}</td>
                    <td>{ventaProducto.cantidad}</td>
                    <td>{ventaProducto.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={generatePDF}>Generar PDF del Ticket</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VentasTallaController;
