import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NuevoUsuario.css';
import Persona from '../../assets/Persona.svg';
import { Map, Marker } from "pigeon-maps";
import Parqueadero from './Parqueadero';
import Historial from '../../Components/Historial/Historial';
import ConfiguracionTarjetas from '../../Components/configuracionTarjetas/ConfiguracionTarjetas';

function NuevoUsuario() {
  const [hue, setHue] = useState(0);
  const [isParqueaderoOpen, setParqueaderoOpen] = useState(false);
  const [selectedParqueadero, setSelectedParqueadero] = useState({});
  const [selectedCity, setSelectedCity] = useState('');
  const [mapKey, setMapKey] = useState(0);
  const [cities, setCities] = useState([]);
  const [cityCoordinates, setCityCoordinates] = useState({});
  const [parqueaderos, setParqueaderos] = useState([]);
  const [isTarjetasCreditoOpen, setTarjetasCreditoOpen] = useState(false);
  const nombre = localStorage.getItem('userName');

  const userData = {
    name: nombre,
    paymentMethod: "VISA **** 4029",
    paymentNumber: "310 5544 391"
  };

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
        
        const coordinates = {};
        result.data.forEach(city => {
          coordinates[city.nombre.toLowerCase()] = [city.latitud, city.longitud];
        });
        setCityCoordinates(coordinates);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const fetchParqueaderos = async (cityId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "ciudad_fk": cityId
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://backend-parqueadero-production.up.railway.app/parqueaderoCiudad", requestOptions);
      const result = await response.json();

      const mappedParqueaderos = result.data.map(parqueadero => {
        return {
          ...parqueadero,
          color: mapColor(parqueadero.color)
        };
      });

      setParqueaderos(mappedParqueaderos);
    } catch (error) {
      console.error('Error fetching parqueaderos:', error);
    }
  };

  const mapColor = (color) => {
    switch (color) {
      case 'NEGRO':
        return `hsl(48, 100%, 0%, 1)`;
      case 'VERDE':
        return 'hsl(86, 100%, 43%, 1';
      case 'AMARILLO':
        return 'hsl(48, 100%, 48%, 1)'; 
      default:
        return 'hsl(0deg, 0%, 50%)'; 
    }
  };

  const handleCityChange = (e) => {
    const selectedCityName = e.target.value;
    setSelectedCity(selectedCityName);
    setMapKey(prevKey => prevKey + 1);

    const selectedCity = cities.find(city => city.nombre.toLowerCase() === selectedCityName.toLowerCase());
    if (selectedCity) {
      fetchParqueaderos(selectedCity.id);
    }
  };

  const fetchParqueaderoDetails = async (parqueaderoId) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "parqueadero_id": parqueaderoId
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("https://backend-parqueadero-production.up.railway.app/obtenerParqueadero", requestOptions);
      const result = await response.json();
      
      const { data } = result;

      const updatedParqueadero = {
        ...data,
        cupo_disponible_carro: data.cupo_carro_total - data.cupo_uti_carro,
        cupo_disponible_moto: data.cupo_moto_total - data.cupo_uti_moto,
        cupo_disponible_bici: data.cupo_bici_total - data.cupo_uti_bici
      };

      setSelectedParqueadero(updatedParqueadero);
      setParqueaderoOpen(true);
    } catch (error) {
      console.error('Error fetching parqueadero details:', error);
    }
  };

  const handleMarkerClick = (parqueadero) => {
    fetchParqueaderoDetails(parqueadero.id);
  };

  return (
    <div className="card-user">
      <div className='container'>
        <Parqueadero 
          isOpen={isParqueaderoOpen} 
          onClose={() => setParqueaderoOpen(false)} 
          name={selectedParqueadero.nombre} 
          cupoCarro={selectedParqueadero.cupo_disponible_carro}
          cupoMoto={selectedParqueadero.cupo_disponible_moto}
          cupoBici={selectedParqueadero.cupo_disponible_bici}
          idParqueadero={selectedParqueadero.id}
          tipo={selectedParqueadero.tipo}
        />
        <header>
          <div className='imagen'>
            <img src={Persona} alt="Perfil" className='imagen-usuario' />
          </div>
          <div className="perfil-usuario">
            <h1 className='nombreUsuario'>Hola, {userData.name}!</h1>
            <hr />
            <div className='datos-usuario'>
              <p className='datos-usuario-p'>Medio de pago: {userData.paymentMethod}</p>
              <p className='datos-usuario-p'>Número: {userData.paymentNumber}</p>
            </div>
            <div className='botones'>
              <button className='Configuracion' onClick={() => setTarjetasCreditoOpen(true)}>Configuración</button>
              <Link to="/login" className='Salir'>Salir</Link>
            </div>
          </div>
        </header>

        <div className='contenedor-mapa'>
          <div className='city-select'>
            <label htmlFor="city">Selecciona una ciudad:</label>
            <select id="city" value={selectedCity} onChange={handleCityChange}>
              <option value="">Seleccione una ciudad</option>
              {cities.map((city) => (
                <option key={city.id} value={city.nombre.toLowerCase()}>
                  {city.nombre}
                </option>
              ))}
            </select>
          </div>
          {selectedCity && cityCoordinates[selectedCity] && (
            <div className='mapa'>
              <Map key={mapKey} defaultCenter={cityCoordinates[selectedCity]} defaultZoom={12} minHeight={300}>
                {parqueaderos.map(parqueadero => (
                  <Marker
                    key={parqueadero.id}
                    width={50}
                    anchor={[parqueadero.latitud, parqueadero.longitud]}
                    color={parqueadero.color}
                    onClick={() => handleMarkerClick(parqueadero)}
                  />
                ))}
              </Map>
            </div>
          )}
        </div>
        <Historial />
      </div>
      {isTarjetasCreditoOpen && <ConfiguracionTarjetas onClose={() => setTarjetasCreditoOpen(false)} />}
    </div>
  );
}

export default NuevoUsuario;
