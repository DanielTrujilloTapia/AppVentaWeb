import { useState } from 'react';
import LoginController from '../controller/loginController.jsx'; 
import '../App.css';

const LoginView = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => { 
    setUsername(e.target.value);  
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Nombre de usuario"
          required
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <LoginController
          username={username}
          password={password}
          onLoginSuccess={handleLoginSuccess} // Pasar la función handleLoginSuccess como prop
        />
      </div>
    </div>
  );
};

export default LoginView;
