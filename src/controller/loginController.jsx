import { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const LoginController = ({ username, password }) => {
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://localhost:7199/api/Usu_Usuarios');
      const users = await response.json();

      const userFound = users.find((usu_usuario) => usu_usuario.nom_usuario === username && usu_usuario.contrasena === password);

      if (userFound) {
        // Mostrar una alerta de éxito
        Swal.fire({ 
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: 'Ok'
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            // Redireccionar a la página de inicio después de que se cierre la alerta
            window.location.href = '/home';
          }
        });
      } else {
        // Mostrar SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas',
          text: 'Por favor, verifica tus credenciales e inténtalo de nuevo.'
        });
      
        // Actualizar el estado loginStatus
        setLoginStatus('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al obtener datos de la base de datos:', error);
      setLoginStatus('Error al iniciar sesión. Inténtalo más tarde.');

      // Mostrar una alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Inténtalo más tarde.'
      });
    }
  };
  
  return (
    <div>
      <button className='login-button' onClick={handleLogin}>Iniciar sesión</button>
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
