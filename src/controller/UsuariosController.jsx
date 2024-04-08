import React, { useEffect, useState } from 'react';
import '..//HomeStyle.css';

function UsuariosController() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedTipoUsuario, setSelectedTipoUsuario] = useState('');
  const [estadosUsuario, setEstadosUsuario] = useState([]); // Nuevo estado para almacenar los datos de los estados

  const apiUrlUsers = 'https://mysqlventapuntoapidu.azurewebsites.net/api/Usu_Usuarios';
  const apiUrlTipos = 'https://mysqlventapuntoapidu.azurewebsites.net/api/Usu_Cat_Tipos_Usuarios';
  const apiUrlEstados = 'https://mysqlventapuntoapidu.azurewebsites.net/api/Usu_Cat_Estados';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsers = await fetch(apiUrlUsers); 
        if (!responseUsers.ok) {
          throw new Error('Network response for users was not ok');
        }
        const dataUsers = await responseUsers.json();

        const responseTipos = await fetch(apiUrlTipos);
        if (!responseTipos.ok) {
          throw new Error('Network response for tipos was not ok');
        }
        const dataTipos = await responseTipos.json();

        const responseEstados = await fetch(apiUrlEstados);
        if (!responseEstados.ok) {
          throw new Error('Network response for estados was not ok');
        }
        const dataEstados = await responseEstados.json();

        console.log('Data Estados:', dataEstados); // Verificar los datos de estados recibidos

        setEstadosUsuario(dataEstados); // Almacenar datos de estados en el estado

        const combinedData = dataUsers.map(user => {
          const tipoUsuario = dataTipos.find(tipo => tipo.id_tipo === user.idusucattipousuario);
          return {
            id_usuario: user.id_usuario,
            nom_usuario: user.nom_usuario,
            contrasena: user.contrasena,
            estado_id: user.idusucatestado, // Cambiar a identificador de estado
            tipo_cuenta_nombre: tipoUsuario ? tipoUsuario.nom_tipo : '',
            tipo_cuenta_descripcion: tipoUsuario ? tipoUsuario.descripcion_tipo : ''
          };
        });

        const filteredData = combinedData.filter(user => {
          return (
            user.nom_usuario.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedEstado === '' || user.estado_id === parseInt(selectedEstado)) && // Utilizar identificador de estado
            (selectedTipoUsuario === '' || user.tipo_cuenta_nombre.toLowerCase() === selectedTipoUsuario.toLowerCase())
          );
        });

        console.log('Filtered Data:', filteredData); // Verificar los datos filtrados

        setUserData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, selectedEstado, selectedTipoUsuario]);

  const handleEdit = (userId) => {
    // Lógica para editar el usuario con el ID especificado
  };

  const handleDelete = (userId) => {
    // Lógica para eliminar el usuario con el ID especificado
  };

  const redirectToRegistro = () => {
    window.location.href = '/crear';
  };

  return (
    <div className="homead-controller-container">
      <h1>Tabla de Usuarios</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar usuario..."
          className="search-input"
        />
        <select
          value={selectedEstado}
          onChange={(e) => setSelectedEstado(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Todos los estados</option>
          {estadosUsuario.map(estado => (
            <option key={estado.id_estado} value={estado.id_estado}>{estado.nom_estado}</option>
          ))}
        </select>
        <select
          value={selectedTipoUsuario}
          onChange={(e) => setSelectedTipoUsuario(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Todos los tipos de usuario</option>
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>

        <button onClick={redirectToRegistro} className="register-button">Registrar un nuevo usuario</button>
      </div>
      <table className="homead-table"> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Estado</th>
            <th>Tipo cuenta</th>
            <th>Descripción del Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(user => (
            <tr key={user.id_usuario}>
              <td>{user.id_usuario}</td>
              <td>{user.nom_usuario}</td>
              <td>{user.contrasena}</td>
              <td>{user.estado_nombre}</td>
              <td>{user.tipo_cuenta_nombre}</td>
              <td>{user.tipo_cuenta_descripcion}</td>
              <td>
                <button onClick={() => handleEdit(user.id_usuario)} className="edit-button">Editar</button>
                <button onClick={() => handleDelete(user.id_usuario)} className="delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosController;
