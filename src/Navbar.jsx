import { Link } from 'react-router-dom';
import './NavbarStyle.css';

const Navbar = () => {
  const handleLogout = () => {
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
      </ul>
      <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
    </nav>
  );
};

export default Navbar;
