import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './Chart.css';

ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = ({ idParqueadero }) => {
    const [cuposTotales, setCuposTotales] = useState(null);
    const [cuposOcupados, setCuposOcupados] = useState(null);
    const [cuposDisponibles, setCuposDisponibles] = useState(null);
    const [ingresos, setIngresos] = useState(null);
    const [dataGlobalCargada, setDataGlobalCargada] = useState(false);

    const URL_ESTADISTICAS_GLOBALES = "http://localhost:3241/estadisticasGlobal"
    const URL_ESTADISTICAS_ESPECIFICAS = "http://localhost:3241/" ///{id}/estadisticasParqueadero

        useEffect(() => {
            if (idParqueadero != null) {
                const fetchData = async () => {
                    try {
                        const response = await fetch(URL_ESTADISTICAS_ESPECIFICAS + idParqueadero + "/estadisticasParqueadero");
                        if (!response.ok) {
                            throw new Error('Problema: ' + response.statusText);
                        }
                        const responseData = await response.json();
                        setCuposTotales({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.cuposTotales,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                        setDataGlobalCargada(true);
                        setCuposOcupados({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.cuposOcupados,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                        setCuposDisponibles({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.cuposDisponibles,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                        setIngresos({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.ingresos,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                    } catch (error) {
                        console.error('Problema:', error);
                    }
                };
                fetchData();      
            }else{
                const fetchData = async () => {
                    try {
                        const response = await fetch(URL_ESTADISTICAS_GLOBALES);
                        if (!response.ok) {
                            throw new Error('Problema: ' + response.statusText);
                        }
                        const responseData = await response.json();
                        setCuposTotales({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.cuposTotales,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                        setDataGlobalCargada(true);
                        setCuposOcupados({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.cuposOcupados,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                        setCuposDisponibles({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.cuposDisponibles,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                        setIngresos({
                            labels: responseData.labels,
                            datasets: [
                                {
                                    data: responseData.ingresos,
                                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(220, 80, 132, 0.5)'],
                                    borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)', 'rgba(220, 80, 132, 0.5)'],
                                    borderWidth: 1
                                },
                            ],
                        });
                    } catch (error) {
                        console.error('Problema:', error);
                    }
                };
                fetchData();
}}, [idParqueadero]);
            
            





    const dataBar2 = {
        labels: ['Cali 2', 'Cali 1', 'Villavicencio 1', 'Barranquilla 1', 'Antioquia 2', 'Antioquia 1', 'Bogotá 3', 'Bogotá 2', 'Bogotá 1'],
        datasets: [
            {
                label: 'Disponibilidad',
                data: [80, 60, 100, 87, 35, 15, 84, 36, 0],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Ocupado',
                data: [20, 40, 0, 13, 65, 85, 16, 64, 100],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };


    const handlePrint = () => {
        window.print();
    };

    if (!dataGlobalCargada) {
        return <p>Cargando datos...</p>;
    }

    return (
        <>
            <div className='dashboard-charts '>
                <div className="chart">
                    <h2>Ingresos por tipo</h2>
                    <Pie data={ingresos} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Ingresos' } } }} />
                </div>
                <div className="chart">
                    <h2>Cupos totales</h2>
                    <Pie data={cuposTotales} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Cupos totales' } } }} />
                </div>
                <div className="chart">
                    <h2>Cupos Disponibles</h2>
                    <Pie data={cuposDisponibles} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Cupos Disponibles' } } }} />
                </div>
                <div className="chart">
                    <h2>Cupos Ocupados</h2>
                    <Pie data={cuposOcupados} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Cupos Ocupados' } } }} />
                </div>
            </div>

            <div className="print-button-container">
                <button className="print-button" onClick={handlePrint}>Imprimir</button>
            </div>
        </>
    );
};

export default Chart;
