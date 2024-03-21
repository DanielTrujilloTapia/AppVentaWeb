//Clase App
import {Routes, Route } from 'react-router-dom'
import './App.css'
import LoginView from './views/loginView.jsx'
import HomeAdView from './views/HomeAdView.jsx'
import NewUserView from './views/NewUserView.jsx'
import UsuariosView from './views/UsuariosView.jsx'
import Navbar from './Navbar.jsx';


function App() {

  return (
    <div>
            <Navbar></Navbar>

        <Routes>
          <Route path='/' element={<LoginView />}></Route>
          <Route path='/home' element={<HomeAdView />}></Route>
          <Route path='/crear' element={<NewUserView />}></Route>
          <Route path='/usuarios' element={<UsuariosView />}></Route>

    

        </Routes>
    </div>
  )
}

export default App
