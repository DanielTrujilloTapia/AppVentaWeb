import emailjs from 'emailjs-com';

function EmailController() {
  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm('service_5spewyy', 'template_eknbpzl', event.target, 'PzrQvCDpwPJXnDuP0')
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  return (
    <>
      <div className='div-form'>
        <h1 className='title-form'>Contactanos </h1>
        <form className='form-mail' onSubmit={sendEmail}>
          <label htmlFor="user_name">Name</label>
          <input type="text" id="user_name" name='user_name' />
          <hr />

          <label htmlFor="user_email">Email</label>
          <input type="email" id="user_email" name='user_email' />
          <hr />

          <label htmlFor="user_message">Message</label>
          <textarea id="user_message" name="user_message" cols="30" rows="10"></textarea>
          <hr />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}

export default EmailController;
