import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const NewProductoController = () => {
  const [nombreProducto, setNombreProducto] = useState('');
  const [descripcionProducto, setDescripcionProducto] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [idSubcategoria, setIdSubcategoria] = useState('');
  const [maximo, setMaximo] = useState(0);
  const [minimo, setMinimo] = useState(0);
  const [stock, setStock] = useState(0);
  const [costo, setCosto] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasResponse = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Cat_Categorias');
        const categoriasData = await categoriasResponse.json();
        setCategorias(categoriasData);
      } catch (error) {
        console.error('Error fetching categorías:', error);
      }
      
      try {
        const subcategoriasResponse = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Cat_Subcategorias');
        const subcategoriasData = await subcategoriasResponse.json();
        setSubcategorias(subcategoriasData);
      } catch (error) {
        console.error('Error fetching subcategorías:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Pro_Productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_producto: nombreProducto,
          descripcion_producto: descripcionProducto,
          idprocatcategoria: idCategoria,
          idprocatsubcategoria: idSubcategoria,
          maximo: maximo,
          minimo: minimo,
          stock: stock,
          costo: costo,
          precio: precio,
          imagen: imagen
        }),
      });

      if (response.ok) {
        // Muestra la SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Producto agregado!',
          text: 'El producto se agregó con éxito.',
        }).then(() => {
          // Redirige al usuario a la tabla de productos
          window.location.href = '/productosAdmin';
        });
      } else {
        console.error('Error al enviar los datos.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleChangeNombreProducto = (event) => {
    const { value } = event.target;
    // Limitar el nombre del producto a 50 caracteres
    if (value.length <= 50) {
      setNombreProducto(value);
    }
  };

  const handleChangeDescripcionProducto = (event) => {
    const { value } = event.target;
    // Limitar la descripción del producto a 50 caracteres
    if (value.length <= 50) {
      setDescripcionProducto(value);
    }
  };

  return (
    <div className="form-container">
      <h2>Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombreProducto">Nombre del producto:</label>
          <input
            type="text"
            id="nombreProducto"
            value={nombreProducto}
            onChange={handleChangeNombreProducto}
            required
          />
        </div>
        <div>
          <label htmlFor="descripcionProducto">Descripción:</label>
          <input
            type="text"
            id="descripcionProducto"
            value={descripcionProducto}
            onChange={handleChangeDescripcionProducto}
            required
          />
        </div>
        <div>
          <label htmlFor="idCategoria">Categoría:</label>
          <select
            id="idCategoria"
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nom_categoria}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="idSubcategoria">Subcategoría:</label>
          <select
            id="idSubcategoria"
            value={idSubcategoria}
            onChange={(e) => setIdSubcategoria(e.target.value)}
            required
          >
            <option value="">Seleccionar subcategoría</option>
            {subcategorias.map((subcategoria) => (
              <option key={subcategoria.id_subcategoria} value={subcategoria.id_subcategoria}>{subcategoria.nom_subcategoria}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="maximo">Máximo:</label>
          <input
            type="number"
            id="maximo"
            value={maximo}
            onChange={(e) => setMaximo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="minimo">Mínimo:</label>
          <input
            type="number"
            id="minimo"
            value={minimo}
            onChange={(e) => setMinimo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="costo">Costo:</label>
          <input
            type="number"
            id="costo"
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="text"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default NewProductoController;
