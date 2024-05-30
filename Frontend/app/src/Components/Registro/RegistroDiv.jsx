import { useState } from 'react';
import Logo from '../../assets/logo.png'; // Placeholder para el logo
import backgroundLogin from '../../assets/backgroundLogin.svg';
import TarjetaCredito from './TarjetaCredito';
import './RegistroDiv.css';
import { useNavigate } from 'react-router-dom';

function RegistroDiv() {
  const URL_POST = 'https://backend-parqueadero-production.up.railway.app/registroPersona'; // Endpoint para confirmar datos
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [correo, setCorreo] = useState('');
  const [isTarjetaOpen, setTarjetaOpen] = useState(false);

  const registrar = (event) => {
    event.preventDefault();
    if (nombre.trim() === '' || identificacion.trim() === '' || correo.trim() === '') {
      alert('Por favor complete todos los campos.');
      return;
    }

    const info = {
      nombre,
      identificacion,
      correo,
    };

    fetch(URL_POST, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar el post');
        }
        return response.json();
      })
      .then((data) => {
        setTarjetaOpen(true);
        console.log("Registro exitoso:", data);
      })
      .catch((error) => {
        console.error("Error en el registro:", error);
      });
  };

  return (
    <div id="container">
      <div id="backgroundContainer">
        <img src={backgroundLogin} alt="Background" />
      </div>
      <div id="contentContainer">
        <img id="logo" src={Logo} alt="Logo" />
        <h2>Registrate!</h2>
        <label className="label">Un gusto que te unas a nosotros!</label>
        <form id="form-registro" onSubmit={registrar}>
          <div id="containerUsername">
            <label className="label">Nombre</label>
            <input type="text" id="inputUsername" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div id="containerPassword">
            <label className="label">Identificación</label>
            <input type="text" id="inputPassword" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} />
          </div>
          <div id="containerTarjetaCredito">
            <label className="label">Correo electrónico</label>
            <input type="email" id="inputCorreo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          <button type="submit" id="btnRegistro">Registrarse</button>
        </form>
        <p className="p">¿Ya tienes una cuenta? <a className="a" href="/">Inicia sesión</a></p>
        <TarjetaCredito isOpen={isTarjetaOpen} />
      </div>
    </div>
  );
}

export default RegistroDiv;
