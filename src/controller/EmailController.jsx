import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../Email.css';
import Swal from 'sweetalert2';


function EmailController() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const sendEmail = (event) => {
    event.preventDefault();
  
    emailjs
      .sendForm('service_5spewyy', 'template_eknbpzl', event.target, 'PzrQvCDpwPJXnDuP0')
      .then((response) => {
        console.log(response);
        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Correo enviado!',
          text: 'Tu correo ha sido enviado correctamente.',
        });
        // Limpiar los campos después de enviar el correo
        setUserName('');
        setUserEmail('');
        setUserMessage('');
      })
      .catch((error) => {
        console.log(error);
        // Mostrar SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un error al enviar el correo. Por favor, inténtalo de nuevo más tarde.',
        });
      });
  };
  

  const handleClear = () => {
    // Limpiar los campos
    setUserName('');
    setUserEmail('');
    setUserMessage('');
  };

  return (
    <>
      <div className='div-form'>
        <h1 className='title-form'>Contactanos!! </h1>
        <form className='form-mail' onSubmit={sendEmail}>
          <label htmlFor='user_name'>Nombre</label>
          <input type='text' id='user_name' name='user_name' value={userName} onChange={(e) => setUserName(e.target.value)} />
          <hr />

          <label htmlFor='user_email'>Correo electronico</label>
          <input type='email' id='user_email' name='user_email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          <hr />

          <label htmlFor='user_message'>Mensaje</label>
          <textarea id='user_message' name='user_message' value={userMessage} onChange={(e) => setUserMessage(e.target.value)} cols='30' rows='10'></textarea>
          <hr />
          <button type='submit'>Enviar</button>
          <button type='button' onClick={handleClear}>Limpiar campos</button>
        </form>
      </div>
    </>
  );
}

export default EmailController;
