//Clase App
import {Routes, Route } from 'react-router-dom'
import './App.css'
import LoginView from './views/loginView.jsx'
import HomeAdView from './views/HomeAdView.jsx'


function App() {

  return (
    <div>
        <Routes>
          <Route path='/' element={<LoginView />}></Route>
          <Route path='/home' element={<HomeAdView />}></Route>

        </Routes>
    </div>
  )
}

export default App
