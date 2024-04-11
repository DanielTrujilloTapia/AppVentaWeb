import NewProductoController from "../../controller/productos/NewProductoController";
import Navbar from "../../Navbar";

function NewProductoView() {
  return (
    <div className="new-user-container"> 
    <Navbar/>
      <NewProductoController />
    </div>
  );
}

export default NewProductoView;