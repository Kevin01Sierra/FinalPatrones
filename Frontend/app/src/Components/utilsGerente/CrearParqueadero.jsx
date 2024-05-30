import React, { useState, useEffect } from 'react';
import './CrearParqueadero.css';
import Sidebar from '../Sidebar/Sidebar';

const CrearParqueadero = () => {
    const [parkingType, setParkingType] = useState('');
    const [nombreParqueadero, setNombreParqueadero] = useState('');
    const [numCars, setNumCars] = useState('');
    const [numMotorcycles, setNumMotorcycles] = useState('');
    const [numBicycles, setNumBicycles] = useState('');
    const [altitude, setAltitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [city, setCity] = useState('');
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const response = await fetch("https://backend-parqueadero-production.up.railway.app/obtenerCiudades", requestOptions);
                const result = await response.json();
                setCities(result.data);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedCity = cities.find(c => c.nombre === city);
        if (!selectedCity) {
            alert('Please select a valid city');
            return;
        }

        const data = {
            nombre: nombreParqueadero,
            ciudad_fk: selectedCity.id,
            cupo_carro_total: parseInt(numCars, 10),
            cupo_moto_total: parseInt(numMotorcycles, 10),
            cupo_bici_total: parseInt(numBicycles, 10),
            tipo_fk: parkingType === 'cubierto' ? 1 : parkingType === 'descubierto' ? 2 : parkingType === 'con_suscripcion' ? 3 : 4,
            longitud: parseFloat(altitude),
            latitud: parseFloat(latitude)
        };

        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                redirect: "follow"
            };

            const response = await fetch("https://backend-parqueadero-production.up.railway.app/guardarParqueadero", requestOptions);
            const result = await response.json();
            console.log('Response from server:', result);

            if (result && result.msg === 'Ciudad creada') {
                alert('Parqueadero creado');
                // Reset form fields
                setParkingType('');
                setNombreParqueadero('');
                setNumCars('');
                setNumMotorcycles('');
                setNumBicycles('');
                setAltitude('');
                setLatitude('');
                setCity('');
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div>
            <Sidebar vista='Gerente'></Sidebar>
            <div className="card2">
                <form className='form-ciudades' onSubmit={handleSubmit}>
                    <div className='div-select-ciudades'>
                        <label>Tipo Parqueadero</label>
                        <select className='select-ciudades'
                            value={parkingType}
                            onChange={(e) => setParkingType(e.target.value)}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="cubierto">Cubierto</option>
                            <option value="descubierto">Descubierto</option>
                        </select>
                    </div>
                    <div className='div-input-ciudades'>
                        <label>Nombre del parqueadero</label>
                        <input className='input-ciudades'
                            type="text"
                            value={nombreParqueadero}
                            onChange={(e) => setNombreParqueadero(e.target.value)}
                        /></div>
                    <div className='div-input-ciudades'>
                        <label>Disponibilidad de carros</label>
                        <input className='input-ciudades'
                            type="number"
                            value={numCars}
                            onChange={(e) => setNumCars(e.target.value)}
                        /></div>
                    <div className='div-input-ciudades'>
                        <label>Disponibilidad Motos</label>
                        <input className='input-ciudades'
                            type="number"
                            value={numMotorcycles}
                            onChange={(e) => setNumMotorcycles(e.target.value)}
                        />
                    </div>
                    <div className='div-input-ciudades'>
                        <label>Disponibilidad Bicicletas</label>
                        <input className='input-ciudades'
                            type="number"
                            value={numBicycles}
                            onChange={(e) => setNumBicycles(e.target.value)}
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
                    <div className='div-input-ciudades'>
                        <label>Altitud</label>
                        <input className='input-ciudades'
                            type="number"
                            value={altitude}
                            onChange={(e) => setAltitude(e.target.value)}
                        />
                    </div>
                    <div className='div-select-ciudades'>
                        <label>Ciudad</label>
                        <select className='select-ciudades'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">Seleccione una ciudad</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.nombre}>
                                    {city.nombre}
                                </option>
                            ))}
                        </select>
                        
                    </div>
                    <button className='button-ciudades' type="submit">Enviar</button>

                </form>
            </div>
        </div>
    );
};

export default CrearParqueadero;
