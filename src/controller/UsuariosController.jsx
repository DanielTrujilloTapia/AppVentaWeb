import  { useEffect, useState } from 'react';

import '../HomeStyle.css'; // Importa los estilos CSS

function UsuariosController() {
  const [userData, setUserData] = useState([]);

  const apiUrlUsers = 'https://mysqlventapuntoapidu.azurewebsites.net/api/Usu_Usuarios';
  const apiUrlTipos = 'https://mysqlventapuntoapidu.azurewebsites.net/api/Usu_Cat_Tipos_Usuarios';
  const apiUrlEstados = 'https://mysqlventapuntoapidu.azurewebsites.net/api/Usu_Cat_Estados';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch de usuarios
        const responseUsers = await fetch(apiUrlUsers); 
        if (!responseUsers.ok) {
          throw new Error('Network response for users was not ok');
        }
        const dataUsers = await responseUsers.json();

        // Fetch de tipos de usuarios
        const responseTipos = await fetch(apiUrlTipos);
        if (!responseTipos.ok) {
          throw new Error('Network response for tipos was not ok');
        }
        const dataTipos = await responseTipos.json();

        // Fetch de estados de usuarios
        const responseEstados = await fetch(apiUrlEstados);
        if (!responseEstados.ok) {
          throw new Error('Network response for estados was not ok');
        }
        const dataEstados = await responseEstados.json();

        // Combinar datos de usuarios con tipos y estados
        const combinedData = dataUsers.map(user => {
          const tipoUsuario = dataTipos.find(tipo => tipo.id_tipo === user.idusucattipousuario);
          const estadoUsuario = dataEstados.find(estado => estado.id_estado === user.idusucatestado);
          return {
            id_usuario: user.id_usuario,
            nom_usuario: user.nom_usuario,
            contrasena: user.contrasena,
            estado_nombre: estadoUsuario ? estadoUsuario.nom_estado : '',
            estado_descripcion: estadoUsuario ? estadoUsuario.descripcion_estado : '',
            tipo_cuenta_nombre: tipoUsuario ? tipoUsuario.nom_tipo : '',
            tipo_cuenta_descripcion: tipoUsuario ? tipoUsuario.descripcion_tipo : ''
          };
        });

        setUserData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (userId) => {
    // Lógica para editar el usuario con el ID especificado
  };

  const handleDelete = (userId) => {
    // Lógica para eliminar el usuario con el ID especificado
  };

  const redirectToRegistro = () => {
    window.location.href = '/registro';
  };

  return (
    <div className="homead-controller-container"> 
      <h1>Tabla de Usuarios</h1>
      <button onClick={redirectToRegistro}>Registrar un nuevo usuario</button>
      <table className="homead-table"> 
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Estado</th>
            <th>Descripción Estado</th>
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
              <td>{user.estado_descripcion}</td>
              <td>{user.tipo_cuenta_nombre}</td>
              <td>{user.tipo_cuenta_descripcion}</td>
              <td>
                <button onClick={() => handleEdit(user.id_usuario)}>Editar</button>
                <button onClick={() => handleDelete(user.id_usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosController;
