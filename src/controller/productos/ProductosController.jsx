import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleEdit = (productoId) => {
    // Lógica para editar el producto con el ID especificado
  };

  const handleDelete = (productoId) => {
    // Lógica para eliminar el producto con el ID especificado
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
