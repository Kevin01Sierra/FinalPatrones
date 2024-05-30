import React, { useState } from 'react';
import './FormCrearCiudad.css'

function FormCrearCiudad() {
    const URL_CREAR_CIUDAD = "https://backend-parqueadero-production.up.railway.app/crearCiudad"
    const [cityName, setCityName] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            nombre: cityName,
            longitud: parseFloat(longitude),
            latitud: parseFloat(latitude)
        };
        console.log('Form data submitted:', data);
        try {
            const response = await fetch(URL_CREAR_CIUDAD, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Response from server:', result);

            if (result && result.msg === 'Ciudad creada') {
                alert('Ciudad creada');
                setCityName('');
                setLongitude('');
                setLatitude('');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
            <div id='container-crear-ciudad'>
                <form id='form-crear-ciudad' onSubmit={handleSubmit}>
                    <div className='div-input-crear-ciudad'>
                        <label>Nombre:</label>
                        <input className='input-crear-ciudad'
                            type="text"
                            placeholder='Ingrese el nombre de la ciudad.'
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='div-input-crear-ciudad'>
                        <label>Longitud:</label>
                        <input className='input-crear-ciudad'
                            type="number"
                            placeholder='Ingrese la Longitud.'
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            required
                        />
                    </div>
                    <div className='div-input-crear-ciudad'>
                        <label>Latitud:</label>
                        <input className='input-crear-ciudad'
                            type="number"
                            placeholder='Ingrese la Latitud'
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            required
                        />
                    </div>
                    <button id='btn-crear-ciudad' type="submit">Enviar</button>
                </form>
            </div>

    );
};

export default FormCrearCiudad;

