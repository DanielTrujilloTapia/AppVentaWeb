import { Link } from 'react-router-dom';
import './NavbarStyle.css';


const Navbar = () => {
  const handleLogout = () => {
    // Eliminar los datos del usuario del localStorage al cerrar sesión
    localStorage.removeItem('user');


    console.log("Sesión cerrada, redirigiendo...");
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/home" className="navbar-link">Home</Link></li>
        <li><Link to="/usuarios" className="navbar-link">Usuarios</Link></li>
        <li><Link to="/productosAdmin" className="navbar-link">Productos</Link></li>
        <li><Link to="/ventas" className="navbar-link">Ventas</Link></li>
        <li><Link to="/contactanos" className="navbar-link">Contactanos</Link></li>
        <li><button onClick={handleLogout} className="logout-button">Cerrar sesión</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
