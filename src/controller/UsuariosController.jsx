import React, { useEffect, useState } from 'react';
import '..//HomeStyle.css';
import Swal from 'sweetalert2';

function UsuariosController() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedTipoUsuario, setSelectedTipoUsuario] = useState('');
  const [estadosUsuario, setEstadosUsuario] = useState([]);
  const [tiposUsuario, setTiposUsuario] = useState([]);

  const apiUrlUsers = 'https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Usuarios';
  const apiUrlTipos = 'https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Cat_Tipos_Usuarios';
  const apiUrlEstados = 'https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Cat_Estados';

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

      setEstadosUsuario(dataEstados);
      setTiposUsuario(dataTipos);

      const combinedData = dataUsers.map(user => {
        const tipoUsuario = dataTipos.find(tipo => tipo.id_tipo === user.idusucattipousuario);
        const estadoUsuario = dataEstados.find(estado => estado.id_estado === user.idusucatestado);
        return {
          id_usuario: user.id_usuario,
          nom_usuario: user.nom_usuario,
          contrasena: user.contrasena,
          estado_id: user.idusucatestado,
          estado_nombre: estadoUsuario ? estadoUsuario.nom_estado : '',
          tipo_cuenta_id: user.idusucattipousuario,
          tipo_cuenta_nombre: tipoUsuario ? tipoUsuario.nom_tipo : '',
          tipo_cuenta_descripcion: tipoUsuario ? tipoUsuario.descripcion_tipo : ''
        };
      });

      const filteredData = combinedData.filter(user => {
        return (
          user.nom_usuario.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedEstado === '' || user.estado_id === parseInt(selectedEstado)) &&
          (selectedTipoUsuario === '' || user.tipo_cuenta_id === parseInt(selectedTipoUsuario))
        );
      });

      setUserData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, selectedEstado, selectedTipoUsuario]);

  const handleEdit = async (userId) => {
    try {
      const user = userData.find(user => user.id_usuario === userId);

      const { value: formValues } = await Swal.fire({
        title: 'Editar Usuario',
        html: `
          <label for="nom_usuario">Nombre de Usuario:</label>
          <input id="nom_usuario" type="text" value="${user.nom_usuario}" placeholder="Nombre de usuario" class="swal2-input">
          <label for="contrasena">Contraseña:</label>
          <input id="contrasena" type="password" value="${user.contrasena}" placeholder="Contraseña" class="swal2-input">
          <label for="confirm_contrasena">Confirmar Contraseña:</label>
          <input id="confirm_contrasena" type="password" placeholder="Confirmar contraseña" class="swal2-input">
          <label for="estado">Estado:</label>
          <select id="estado" class="swal2-input">
            ${estadosUsuario.map(estado => `<option value="${estado.id_estado}" ${estado.id_estado === user.estado_id ? 'selected' : ''}>${estado.nom_estado}</option>`).join('')}
          </select>
          <label for="tipo_cuenta">Tipo de Cuenta:</label>
          <select id="tipo_cuenta" class="swal2-input">
            ${tiposUsuario.map(tipo => `<option value="${tipo.id_tipo}" ${tipo.id_tipo === user.tipo_cuenta_id ? 'selected' : ''}>${tipo.nom_tipo}</option>`).join('')}
          </select>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const nom_usuario = Swal.getPopup().querySelector('#nom_usuario').value;
          const contrasena = Swal.getPopup().querySelector('#contrasena').value;
          const confirm_contrasena = Swal.getPopup().querySelector('#confirm_contrasena').value;
          const estado = Swal.getPopup().querySelector('#estado').value;
          const tipo_cuenta = Swal.getPopup().querySelector('#tipo_cuenta').value;
          return { nom_usuario, contrasena, confirm_contrasena, estado, tipo_cuenta };
        }
      });

      if (formValues) {
        if (formValues.contrasena !== formValues.confirm_contrasena) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.'
          });
          return;
        }

        const isUsuarioExists = userData.some(item => item.nom_usuario === formValues.nom_usuario && item.id_usuario !== userId);
        if (isUsuarioExists) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un usuario con este nombre. Por favor, elige otro nombre.'
          });
          return;
        }

        const updatedUser = {
          id_usuario: userId,
          nom_usuario: formValues.nom_usuario,
          contrasena: formValues.contrasena,
          idusucattipousuario: parseInt(formValues.tipo_cuenta),
          idusucatestado: parseInt(formValues.estado)
        };

        try {
          const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Usuarios?id=${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
          });

          if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
          }

          Swal.fire({
            icon: 'success',
            title: '¡Usuario actualizado!',
            text: 'El usuario se actualizó correctamente.'
          });

          fetchData();
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al actualizar el usuario. Por favor, inténtalo de nuevo.'
          });
        }
      }
    } catch (error) {
      console.error('Error al abrir la ventana de edición:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const confirmation = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede revertir.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
      });

      if (confirmation.isConfirmed) {
        const response = await fetch(`https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Usuarios?id=${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error al eliminar el usuario');
        } else {
          // Muestra la SweetAlert de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Usuario eliminado!',
            text: 'El usuario se eliminó con éxito.',
          });
        }

        // Actualizar el estado para reflejar que el usuario ha sido eliminado
        setUserData(userData.filter(user => user.id_usuario !== userId));
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
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
          {tiposUsuario.map(tipo => (
            <option key={tipo.id_tipo} value={tipo.id_tipo}>{tipo.nom_tipo}</option>
          ))}
        </select>

        <button onClick={redirectToRegistro} className="register-button">Registrar un nuevo usuario</button>
      </div>
      <table className="homead-table"> 
        <thead>
          <tr>
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
