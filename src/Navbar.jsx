import { Link } from 'react-router-dom';
import './NavbarStyle.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/home" className="navbar-link">Home</Link></li>
        <li><Link to="/usuarios" className="navbar-link">Usuarios</Link></li>
        <li><Link to="/productosAdmin" className="navbar-link">Productos</Link></li>
        <li><Link to="/ventas" className="navbar-link">Ventas</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
