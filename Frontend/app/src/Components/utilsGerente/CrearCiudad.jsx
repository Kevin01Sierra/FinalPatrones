import React, { useState } from 'react';
import './CrearParqueadero.css';
import Sidebar from '../Sidebar/Sidebar';

const CrearCiudad = () => {
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
            const response = await fetch('https://backend-parqueadero-production.up.railway.app/crearCiudad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log('Response from server:', result);

            if (result && result.msg === 'Ciudad creada') {
                alert('Ciudad creada');
                // Reset form fields
                setCityName('');
                setLongitude('');
                setLatitude('');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <Sidebar vista={"Gerente"}></Sidebar>
            <div className="card2">
                <form className='form-ciudades' onSubmit={handleSubmit}>
                    <div className='div-input-ciudades'>
                        <label>Nombre de la ciudad</label>
                        <input className='input-ciudades'
                            type="text"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />
                    </div>
                    <div className='div-input-ciudades'>
                        <label>Longitud</label>
                        <input className='input-ciudades'
                            type="number"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </div>
                    <div className='div-input-ciudades'>
                        <label>Latitud</label>
                        <input className='input-ciudades'
                            type="number"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </div>
                    <button className='button-ciudades' type="submit">Enviar</button>
                </form>
            </div>
        </div>
    );
};

export default CrearCiudad;
