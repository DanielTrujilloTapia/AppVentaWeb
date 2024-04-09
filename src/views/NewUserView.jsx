  import NewUserController from "../controller/NewUserController";
  import '../CreateUsrStyle.css'


  function NewUserView() {
    return (
      <div className="new-user-container"> 
        <NewUserController></NewUserController>
      </div>
    );
  }

  export default NewUserView;