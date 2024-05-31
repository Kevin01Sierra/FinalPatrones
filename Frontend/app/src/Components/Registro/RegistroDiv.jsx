import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/logo.png'; // Placeholder para el logo
import backgroundLogin from '../../assets/backgroundLogin.svg';
import TarjetaCredito from './TarjetaCredito';
import './RegistroDiv.css';
import { Link } from 'react-router-dom';

function RegistroDiv() {
  const URL_POST = 'https://backend-parqueadero-production.up.railway.app/registroPersona'; // Endpoint para confirmar datos
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [correo, setCorreo] = useState('');
  const [isTarjetaOpen, setTarjetaOpen] = useState(false);

  const registrar = (event) => {
    event.preventDefault();

    // Validación del nombre
    const nombreValidado = validarNombre(nombre);
    if (!nombreValidado) {
      toast.error('El nombre debe contener al menos 2 palabras de mínimo 3 caracteres cada una, separadas por un espacio.');
      return;
    }

    if (nombre.trim() === '' || identificacion.trim() === '' || correo.trim() === '') {
      toast.error('Por favor complete todos los campos.');
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
        toast.success("Registro exitoso");
        console.log("Registro exitoso:", data);
      })
      .catch((error) => {
        toast.error("Error en el registro");
        console.error("Error en el registro:", error);
      });
  };

  // Función de validación del nombre
  const validarNombre = (nombre) => {
    const palabras = nombre.trim().split(' ');
    if (palabras.length < 2) return false;
    for (let palabra of palabras) {
      if (palabra.length < 3) return false;
    }
    return true;
  };

  return (
    <div id="container">
      <ToastContainer />
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
        <Link to='/login' className='link'>
          <p className="p">¿Ya tienes una cuenta? Inicia sesión</p>
        </Link>
        <TarjetaCredito isOpen={isTarjetaOpen} />
      </div>
    </div>
  );
}

export default RegistroDiv;
