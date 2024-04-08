import { Link } from 'react-router-dom';
import './NavbarStyle.css';

const Navbar = () => {
  return (
    <nav>
      
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/usuarios">Usuarios</Link></li>
        <li><Link to="/productosAdmin">Productos</Link></li>
        <li><Link to="/ventas">Ventas</Link></li>
        

      </ul>
    </nav>
  );
};

export default Navbar;
