  //Componente loginView
  import { useState } from 'react';
  import LoginController from '../controller/loginController.jsx'; 
  import '../App.css'
  const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => { 
      setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    return (
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        {/* Pasamos las credenciales al componente LoginController */}
        <LoginController username={username} password={password} />
      </div>
    );
  };

  export default LoginView;
