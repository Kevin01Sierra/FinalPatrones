import React, { useState } from 'react';
import './codigo.css';
import { useNavigate } from 'react-router-dom';

export default function Codigo({ isOpen, UserId }) {
    if (!isOpen) return null;

    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const irAOtraRuta = () => {
        navigate(`/user/${UserId}`, { state: { key: UserId } });
    };
    
    const promptForAccessCode = () => {
        const raw = JSON.stringify({ id: 1, codigo: code });  // Ahora usando el estado 'code'
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: raw
        };
        
        fetch('https://backend-parqueadero-production.up.railway.app/loginCodigo', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data && data.success) {
                    
                    localStorage.setItem('Username', data.data.usuario);
                    irAOtraRuta();
                } else {
                    alert('El código introducido fue incorrecto');
                }
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                alert('Error al procesar la solicitud.');
            });
    };

    return (
        <div className="backdrop">
            <div className="cod">
                <h3>Ingresa tu código</h3>
                <input
                    type="text"
                    value={code}
                    placeholder="Escribe aquí tu código"
                />
                <button className='cerrar' onClick={promptForAccessCode}>Entrar</button>
            </div>
        </div>
    );
}
