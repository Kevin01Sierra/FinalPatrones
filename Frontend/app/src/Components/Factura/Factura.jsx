import React from 'react';
import './Factura.css';
import logo from '../../assets/logo.png'; // Asegúrate de que la ruta al logo sea correcta

export default function Factura({ data,nombreParqueadero , tipoVehiculo}) {
    const { codigo, horaLlegada, vehiculo, parqueadero, ciudad, horasPedidas } = data;
    const name = localStorage.getItem('userName');
    const Nofactura =1;
    console.log(nombreParqueadero, "    ,  ",tipoVehiculo)
    return (
        <div className="factura-container">
            <div className="factura-header">
                <img src={logo} alt="Logo" className="factura-logo" />
                <div className="factura-info">
                    <h2>FACTURA:{Nofactura} </h2>
                    <p><strong>Fecha generado:</strong> {new Date().toLocaleDateString()}</p>
                </div>
            </div>
            <div className="factura-body">
                <p><strong>Cliente:</strong> {name}</p>
                <p><strong>CODIGO:</strong> {data.codigo}</p>
                <p><strong>Hora llegada:</strong> {horaLlegada}</p>
                <p><strong>Vehiculo:</strong> {tipoVehiculo}</p>
                <p><strong>Parqueadero:</strong> {nombreParqueadero}</p>
                <p><strong>Ciudad:</strong> {ciudad}</p>
                <p><strong>Horas pedidas:</strong> {horasPedidas}</p>
                
                <p><strong>Nit:</strong> 123456789-3</p>
            </div>
            <button className="factura-print" onClick={() => window.print()}>IMPRIMIR</button>
        </div>
    );
}
