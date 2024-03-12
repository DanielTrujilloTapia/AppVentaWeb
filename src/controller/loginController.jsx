import { useState } from 'react';
import PropTypes from 'prop-types'; // Importa PropTypes

const LoginController = ({ username, password }) => {
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = async () => {
    try {
      // Realizar un fetch para obtener datos de la base de datos
      const response = await fetch('https://localhost:7199/api/Usu_Usuarios');
      const users = await response.json();

      // Validar las credenciales
      const userFound = users.find((usu_usuario) => usu_usuario.nom_usuario === username && usu_usuario.contrasena === password);

      if (userFound) {
        setLoginStatus('¡Inicio de sesión exitoso!');
      } else {
        setLoginStatus('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al obtener datos de la base de datos:', error);
      setLoginStatus('Error al iniciar sesión. Inténtalo más tarde.');
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Iniciar login</button>
      <p>{loginStatus}</p>
    </div>
  );
};

// Define las propiedades requeridas
LoginController.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginController;
