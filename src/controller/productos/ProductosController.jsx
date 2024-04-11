import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function ProductosController() {
  const [productosData, setProductosData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSubcategoria, setSelectedSubcategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  const apiUrlProductos = 'https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos';
  const apiUrlCategorias = 'https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Cat_Categorias';
  const apiUrlSubcategorias = 'https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Cat_Subcategorias';

  // Líneas agregadas para definir la función fetchData
  const fetchData = async () => {
    try {
      const responseProductos = await fetch(apiUrlProductos); 
      if (!responseProductos.ok) {
        throw new Error('Network response for productos was not ok');
      }
      const dataProductos = await responseProductos.json();

      const responseCategorias = await fetch(apiUrlCategorias);
      if (!responseCategorias.ok) {
        throw new Error('Network response for categorias was not ok');
      }
      const dataCategorias = await responseCategorias.json();

      const responseSubcategorias = await fetch(apiUrlSubcategorias);
      if (!responseSubcategorias.ok) {
        throw new Error('Network response for subcategorias was not ok');
      }
      const dataSubcategorias = await responseSubcategorias.json();

      setCategorias(dataCategorias);
      setSubcategorias(dataSubcategorias);

      const combinedData = dataProductos.map(producto => {
        const categoria = dataCategorias.find(cat => cat.id_categoria === producto.idprocatcategoria);
        const subcategoria = dataSubcategorias.find(subcat => subcat.id_subcategoria === producto.idprocatsubcategoria);
        return {
          id_producto: producto.id_producto,
          nom_producto: producto.nom_producto,
          descripcion_producto: producto.descripcion_producto,
          categoria_nombre: categoria ? categoria.nom_categoria : '',
          subcategoria_nombre: subcategoria ? subcategoria.nom_subcategoria : '',
          maximo: producto.maximo,
          minimo: producto.minimo,
          stock: producto.stock,
          costo: producto.costo,
          precio: producto.precio,
          imagen: producto.imagen
        };
      });

      setProductosData(combinedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // Fin de las líneas agregadas para definir fetchData

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (productoId) => {
    try {
      const producto = productosData.find(producto => producto.id_producto === productoId);

      // Dentro de la función handleEdit
      const categoriasOptions = categorias.map(categoria => `<option value="${categoria.nom_categoria}" ${categoria.nom_categoria === producto.categoria_nombre ? 'selected' : ''}>${categoria.nom_categoria}</option>`).join('');
      const subcategoriasOptions = subcategorias.map(subcategoria => `<option value="${subcategoria.nom_subcategoria}" ${subcategoria.nom_subcategoria === producto.subcategoria_nombre ? 'selected' : ''}>${subcategoria.nom_subcategoria}</option>`).join('');


      const { value: formValues } = await Swal.fire({
        title: 'Editar Producto',
        html: `
          <label for="nom_producto">Nombre del Producto:</label>
          <input id="nom_producto" type="text" value="${producto.nom_producto}" placeholder="Nombre del producto" class="swal2-input">
          <label for="descripcion_producto">Descripción:</label>
          <input id="descripcion_producto" type="text" value="${producto.descripcion_producto}" placeholder="Descripción" class="swal2-input">
          <label for="categoria">Categoría:</label>
          <select id="categoria" class="swal2-input">${categoriasOptions}</select>
          <label for="subcategoria">Subcategoría:</label>
          <select id="subcategoria" class="swal2-input">${subcategoriasOptions}</select>
          <label for="maximo">Máximo:</label>
          <input id="maximo" type="number" value="${producto.maximo}" placeholder="Máximo" class="swal2-input">
          <label for="minimo">Mínimo:</label>
          <input id="minimo" type="number" value="${producto.minimo}" placeholder="Mínimo" class="swal2-input">
          <label for="stock">Stock:</label>
          <input id="stock" type="number" value="${producto.stock}" placeholder="Stock" class="swal2-input">
          <label for="costo">Costo:</label>
          <input id="costo" type="number" value="${producto.costo}" placeholder="Costo" class="swal2-input">
          <label for="precio">Precio:</label>
          <input id="precio" type="number" value="${producto.precio}" placeholder="Precio" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          const nom_producto = Swal.getPopup().querySelector('#nom_producto').value;
          const descripcion_producto = Swal.getPopup().querySelector('#descripcion_producto').value;
          const categoria = Swal.getPopup().querySelector('#categoria').value;
          const subcategoria = Swal.getPopup().querySelector('#subcategoria').value;
          const maximo = parseFloat(Swal.getPopup().querySelector('#maximo').value);
          const minimo = parseFloat(Swal.getPopup().querySelector('#minimo').value);
          const stock = parseFloat(Swal.getPopup().querySelector('#stock').value);
          const costo = parseFloat(Swal.getPopup().querySelector('#costo').value);
          const precio = parseFloat(Swal.getPopup().querySelector('#precio').value);
          return { nom_producto, descripcion_producto, categoria, subcategoria, maximo, minimo, stock, costo, precio };
        }
      });
  
      if (formValues) {
        const updatedProduct = {
          id_producto: productoId,
          nom_producto: formValues.nom_producto,
          descripcion_producto: formValues.descripcion_producto,
          idprocatcategoria: categorias.find(cat => cat.nom_categoria === formValues.categoria)?.id_categoria || null,
          idprocatsubcategoria: subcategorias.find(subcat => subcat.nom_subcategoria === formValues.subcategoria)?.id_subcategoria || null,
          maximo: formValues.maximo,
          minimo: formValues.minimo,
          stock: formValues.stock,
          costo: formValues.costo,
          precio: formValues.precio,
          imagen: producto.imagen
        };
  
        try {
          const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos?id=${productoId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
          });
  
          if (!response.ok) {
            throw new Error('Error al actualizar el producto');
          }
  
          Swal.fire({
            icon: 'success',
            title: '¡Producto actualizado!',
            text: 'El producto se actualizó correctamente.'
          });
  
          fetchData();
        } catch (error) {
          console.error('Error al actualizar el producto:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al actualizar el producto. Por favor, inténtalo de nuevo.'
          });
        }
      }
    } catch (error) {
      console.error('Error al abrir la ventana de edición:', error);
    }
  };
  
  const handleDelete = async (productoId) => {
    try {
      const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos?id=${productoId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }
  
      Swal.fire({
        icon: 'success',
        title: '¡Producto eliminado!',
        text: 'El producto se eliminó correctamente.',
      });
  
      setProductosData(productosData.filter(producto => producto.id_producto !== productoId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const redirectToRegistro = () => {
    window.location.href = '/productoNuevo';
  };

  const filteredProductos = productosData.filter(producto => {
    return (
      producto.nom_producto.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategoria === '' || producto.categoria_nombre === selectedCategoria) &&
      (selectedSubcategoria === '' || producto.subcategoria_nombre === selectedSubcategoria)
    );
  });

  return (
    <div className="homead-controller-container">
      <h1>Tabla de Productos</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar producto..."
          className="search-input"
        />
        <select
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Todas las categorías</option>
          {categorias.map(categoria => (
            <option key={categoria.id_categoria} value={categoria.nom_categoria}>{categoria.nom_categoria}</option>
          ))}
        </select>
        <select
          value={selectedSubcategoria}
          onChange={(e) => setSelectedSubcategoria(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Todas las subcategorías</option>
          {subcategorias.map(subcategoria => (
            <option key={subcategoria.id_subcategoria} value={subcategoria.nom_subcategoria}>{subcategoria.nom_subcategoria}</option>
          ))}
        </select>

        <button onClick={redirectToRegistro} className="register-button">Registrar un nuevo producto</button>
      </div>
      <table className="homead-table"> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Subcategoría</th>
            <th>Máximo</th>
            <th>Mínimo</th>
            <th>Stock</th>
            <th>Costo</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map(producto => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nom_producto}</td>
              <td>{producto.descripcion_producto}</td>
              <td>{producto.categoria_nombre}</td>
              <td>{producto.subcategoria_nombre}</td>
              <td>{producto.maximo}</td>
              <td>{producto.minimo}</td>
              <td>{producto.stock}</td>
              <td>{producto.costo}</td>
              <td>{producto.precio}</td>
              <td><img src={producto.imagen} alt={producto.nom_producto} style={{ maxWidth: '100px' }} /></td>
              <td>
                <button onClick={() => handleEdit(producto.id_producto)} className="edit-button">Editar</button>
                <button onClick={() => handleDelete(producto.id_producto)} className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosController;
