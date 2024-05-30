import React, { useState } from 'react';
import './TarjetaCredito.css';
import { Link } from 'react-router-dom';
export default function TarjetaCredito({ isOpen }) {
    if (!isOpen) return null;

    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCardInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const formatCardNumber = (number) => {
        return number.replace(/(.{4})/g, '$1 ').trim();
    };

    const formatExpiryDate = (expiry) => {
        return expiry.replace(/^(\d{2})(\d{0,4})$/, '$1/$2');
    };

    const validateData = () => {
        const { number, name, expiry, cvc } = cardInfo;
        if (
            number.length !== 16 ||
            !/^\d{16}$/.test(number.replace(/\s/g, '')) ||
            name.trim() === '' ||
            !/^\d{2}\/\d{4}$/.test(expiry) ||
            cvc.length !== 3 ||
            !/^\d{3}$/.test(cvc)
        ) {
            alert('Datos erróneos, por favor verificar.');
            return false;
        }
        alert('Datos válidos.');
        return true;
    };

    const handleSubmit = async () => {
        if (!validateData()) return;

        const { number, name, expiry, cvc } = cardInfo;
        const [month, year] = expiry.split('/');
        const formattedExpiry = `${year}-${month}-01`;
        const usuario = localStorage.getItem('userId'); // Make sure 'userId' is stored in localStorage

        const data = {
            numero: number,
            nombre_propietario: name,
            cvc: cvc,
            fecha_vencimiento: formattedExpiry,
            usuario: usuario // This should be the actual user ID from localStorage
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

            const response = await fetch("https://backend-parqueadero-production.up.railway.app/guardarTarjeta", requestOptions);
            const result = await response.json();
            console.log('Response from server:', result);
            // Handle success, maybe reset form or show a message
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className="credit-card-form">
            <div className='credit-card-card'>
                <div className='tarjetas'>
                    <div className="credit-card-front">
                        <div className="credit-card">
                            <div className='tipo-tarjeta'>
                                <div className='rccs__chip'></div>
                                <div className='rccs__card--visa'></div>
                            </div>
                            <div className="rccs__number">
                                {formatCardNumber(cardInfo.number.padEnd(16, '•'))}
                            </div>
                            <div className='parte-abajo'>
                                <div className="rccs__name">{cardInfo.name || 'YOUR NAME HERE'}</div>
                                <div className='rccs__exp'>
                                    <p>valid true</p>
                                    <div className="rccs__expiry__valid">
                                        {formatExpiryDate(cardInfo.expiry.padEnd(6, '•'))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="credit-card-back">
                        <div className="rccs__cardback">
                            <div className="rccs__card__background">
                                <div className="rccs__issuer"></div>
                                <div className="rccs__stripe"></div>
                                <div className="rccs__signature">
                                    <div className="rccs__cvc-text">CVC</div>
                                    <div className="rccs__cvc">{cardInfo.cvc.padEnd(3, '•')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='formulario'>
                    <p className='texto'>Ingresa los datos de tu tarjeta para poder continuar </p>
                    <form className='campos'>
                        <input
                            type="text"
                            className='input-Tarjeta'
                            name="number"
                            placeholder="Card Number"
                            value={cardInfo.number}
                            onChange={handleChange}
                            maxLength={16}
                        />
                        <input
                            type="text"
                            className='input-Tarjeta'
                            name="name"
                            placeholder="Name"
                            value={cardInfo.name}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            className='input-Tarjeta'
                            name="expiry"
                            placeholder="Valid Thru (MM/YYYY)"
                            value={cardInfo.expiry}
                            onChange={handleChange}
                            maxLength={7}
                        />
                        <input
                            type="text"
                            className='input-Tarjeta'
                            name="cvc"
                            placeholder="CVC"
                            value={cardInfo.cvc}
                            onChange={handleChange}
                            maxLength={3}
                        />
                    </form>
                    <Link to="/login">
                        <button onClick={handleSubmit}>Validar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
