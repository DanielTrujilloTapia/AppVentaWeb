import VentasTallaController from '../controller/productos/VentasTablaController.jsx'
import Navbar from '../Navbar.jsx'
function VentasTablaView() {

  return (
    <div>
      <Navbar/>
        <VentasTallaController/>
    </div>
  );
}
 
  export default VentasTablaView;