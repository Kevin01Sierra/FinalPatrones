import React, { useState } from 'react'
import Logo from '../assets/logo.png' // Placeholder para el logo
import backgroundLogin from '../assets/backgroundLogin.svg'
import './App.css'
import NewUser from '../Views/Cliente/NewUser'; // Importando el componente NewUser
import Registro from './Registro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Gerente from '../Views/Gerente/Gerente';
import Codigo from './Codigo';

function Login() {

  const URL_POST = 'http://localhost:3241/login'; // Endpoint para confirmar datos
  const URL_USER = '/user'; // Endpoint del perfil de usuario
  const URL_REGISTRO = 'registro'; // Endpoint para registro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [UserDataName, setUserDataName] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [iscodigo, setcodigo] = useState(false);

  //ir A User
  const irAOtraRuta = () => {
    navigate(`/user/${userId}`, { state: { key: userId } });
  };

  //primera funcion del login
  function login(event) {
    //verificar campos
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      alert('Por favor complete todos los campos.');
      return;
    }
    //cosas del fetch
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "usuario": username,
      "contrasena": password
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    //primer post para usuario y contraseña
    fetch(URL_POST, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json(); // Procesamos la respuesta JSON si es exitosa
        } else {
          console.log(response);
          alert(response);
          throw new Error('Failed to fetch data'); // Manejamos errores en caso de fallo en la petición
        }
      })
      .then(data => {
        if (data && data.data) {
          const id = data.data.id;      // Guardar el id
          localStorage.setItem('userId', id);
          promptForAccessCode()
        } else {
          alert("Usuario o contraseña incorrectos")
        }
      })
      .catch(error => {
        console.error(error);
        alert('Usuario no válido. Intente nuevamente.'); // Show alert on failed login
      });
    //segundo fetch
    const promptForAccessCode = () => {
      const code = prompt('Ingrese el codigo enviado al correo');
      const raw = JSON.stringify({ id: 1, codigo: code });  // Ahora usando el estado 'code'
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: raw
      };
      //segunda peticion
      fetch('http://localhost:3241/loginCodigo', requestOptions)
        .then(response => response.json())
        .then(data => {
          if (data && data.success) {

            localStorage.setItem('Username', data.data.usuario);
            irAOtraRuta();
          } else {
            irAOtraRuta()
          }
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
          alert('Error al procesar la solicitud.');
        });
    };
  }


  return (
    <>
      <div id='container'>
        <div id='backgroundContainer'>
          <img src={backgroundLogin} alt="Background"></img>
        </div>
        <div id='contentContainer'>
          <img id='logo' src={Logo} alt="Logo"></img>
          <h2>Bienvenido!</h2>
          <label>Bienvenido de nuevo, que placer tenerte acá </label>
          <form id='Datos'>
            <div id='username'>
              <label>Usuario</label>
              <input type='text' id='inputUsername' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div id='password'>
              <label>Contraseña</label>
              <input type='password' id='inputPassword' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button type='button' id='btnIngresar' onClick={login}>Ingresar</button>
          </form>
          <p>Aún no tienes una cuenta? <a href={URL_REGISTRO}>Registrate</a></p>
        </div>
      </div>
      <Codigo isOpen={iscodigo} UserId={userId} />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/:userId" element={<NewUser />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/admin" element={<Gerente />} />
        <Route path="/gerentez" element={<Gerente />} />
      </Routes>
    </Router>
  );
}

export default App;