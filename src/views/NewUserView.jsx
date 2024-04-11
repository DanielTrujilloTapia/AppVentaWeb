  import NewUserController from "../controller/NewUserController";
  import '../CreateUsrStyle.css'
  import Navbar from "../Navbar";

  function NewUserView() {
    return (
      <div className="new-user-container"> 
      <Navbar/>
        <NewUserController></NewUserController>
      </div>
    );
  }

  export default NewUserView;