import { useState, useEffect } from 'react';
import '../CreateUsrStyle.css';

const NewUserController = () => {
  const [nomUsuario, setNomUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [idUsuCatEstado, setIdUsuCatEstado] = useState('');
  const [idUsuCatTipoUsuario, setIdUsuCatTipoUsuario] = useState('');
  const [tiposUsuarios, setTiposUsuarios] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tiposResponse = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Cat_Tipos_Usuarios');
        const tiposData = await tiposResponse.json();
        setTiposUsuarios(tiposData);
      } catch (error) {
        console.error('Error fetching tipos de usuarios:', error);
      }
      
      try {
        const estadosResponse = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Cat_Estados');
        const estadosData = await estadosResponse.json();
        setEstados(estadosData);
      } catch (error) {
        console.error('Error fetching estados:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://mysqlventapunto20240409001954.azurewebsites.net/api/Usu_Usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_usuario: nomUsuario,
          contrasena: contrasena,
          idusucatestado: idUsuCatEstado,
          idusucattipousuario: idUsuCatTipoUsuario
        }),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente.');
      } else {
        console.error('Error al enviar los datos.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const handleChangeNomUsuario = (event) => {
    const { value } = event.target;
    // Limitar el nombre de usuario a 10 caracteres
    if (value.length <= 10) {
      setNomUsuario(value);
    }
  };

  const handleChangeContrasena = (event) => {
    const { value } = event.target;
    // Limitar la contraseña a 10 caracteres
    if (value.length <= 10) {
      setContrasena(value);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomUsuario">Nombre de usuario:</label>
          <input
            type="text"
            id="nomUsuario"
            value={nomUsuario}
            onChange={handleChangeNomUsuario}
            required
          />
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            id="contrasena"
            value={contrasena}
            onChange={handleChangeContrasena}
            required
          />
        </div>
        <div>
          <label htmlFor="idUsuCatEstado">Estado:</label>
          <select
            id="idUsuCatEstado"
            value={idUsuCatEstado}
            onChange={(e) => setIdUsuCatEstado(e.target.value)}
            required
          >
            <option value="">Seleccionar estado</option>
            {estados.map((estado) => (
              <option key={estado.id_estado} value={estado.id_estado}>{estado.nom_estado}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="idUsuCatTipoUsuario">Tipo de usuario:</label>
          <select
            id="idUsuCatTipoUsuario"
            value={idUsuCatTipoUsuario}
            onChange={(e) => setIdUsuCatTipoUsuario(e.target.value)}
            required
          >
            <option value="">Seleccionar tipo de usuario</option>
            {tiposUsuarios.map((tipoUsuario) => (
              <option key={tipoUsuario.id_tipo} value={tipoUsuario.id_tipo}>{tipoUsuario.nom_tipo}</option>
            ))}
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default NewUserController;
