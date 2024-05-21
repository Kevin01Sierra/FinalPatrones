drop database fourParks;
create database fourParks;
use fourParks;

-- Creación de la tabla Usuario
CREATE TABLE Usuario (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Identificacion VARCHAR(50) NOT NULL,
    Contrasena VARCHAR(50) NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Estado BOOLEAN NOT NULL DEFAULT TRUE,
    Usuario VARCHAR(50) NOT NULL,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    Num_intentos INT NOT NULL,
    Cod_verificacion VARCHAR(6) NOT NULL,
    Puntos INT NOT NULL DEFAULT 0
);

-- Creación de la tabla Tarjeta_credito
CREATE TABLE Tarjeta_credito (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Numero VARCHAR(50) NOT NULL,
    Nombre_propietario VARCHAR(50) NOT NULL,
    CVC VARCHAR(3) NOT NULL,
    Fecha_vencimiento DATE NOT NULL,
    Usuario_fk BIGINT UNSIGNED,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (Usuario_fk) REFERENCES Usuario(Id)
);

-- Creación de la tabla tipo_usuario
CREATE TABLE Tipo_usuario (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(30) NOT NULL,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Tipo_usuario_usuario (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Tipo_usuario_fk BIGINT UNSIGNED,
    Usuario_fk BIGINT UNSIGNED,
    FOREIGN KEY (Tipo_usuario_fk) REFERENCES Tipo_usuario(Id),
    FOREIGN KEY (Usuario_fk) REFERENCES Usuario(Id)
);


-- Creación de la tabla Ip
CREATE TABLE Ip (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Direccion_ip VARCHAR(50) NOT NULL,
    Usuario_fk BIGINT UNSIGNED,
    Fecha_creacion DATE NOT NULL DEFAULT (CURRENT_DATE),
    FOREIGN KEY (Usuario_fk) REFERENCES Usuario(Id)
);

CREATE TABLE Ciudad (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255) NOT NULL,
    Longitud DECIMAL(9,6) NOT NULL,
    Latitud DECIMAL(9,6) NOT NULL,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Tipo_parqueadero (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(255) NOT NULL,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Vehiculo (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Tipo VARCHAR(255),
    Fecha_creacion DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Parqueadero (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(255),
    Cupo_moto_total INT NOT NULL DEFAULT 0,
    Cupo_carro_total INT NOT NULL DEFAULT 0,
    Cupo_bici_total INT NOT NULL DEFAULT 0,
    Ciudad_fk BIGINT UNSIGNED,
    Tipo_fk BIGINT UNSIGNED,
    Longitud DECIMAL(9,6) NOT NULL,
    Latitud DECIMAL(9,6) NOT NULL,
    Cupo_uti_moto INT NOT NULL DEFAULT 0,
    Cupo_uti_carro INT NOT NULL DEFAULT 0,
    Cupo_uti_bici INT NOT NULL DEFAULT 0,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    Usuario_fk BIGINT UNSIGNED,
    FOREIGN KEY (Ciudad_fk) REFERENCES Ciudad(Id),
    FOREIGN KEY (Tipo_fk) REFERENCES Tipo_parqueadero(Id),
    FOREIGN KEY (Usuario_fk) REFERENCES Usuario(Id)
);

CREATE TABLE Cupo (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Usuario_fk BIGINT UNSIGNED,
    Parqueadero_fk BIGINT UNSIGNED,
    Vehiculo_fk BIGINT UNSIGNED,
    Pagado BOOLEAN DEFAULT FALSE,
    Hora_llegada DATE,
    Hora_salida DATE,
    horas_pedidas INT,
    Estado VARCHAR(25),
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (Usuario_fk) REFERENCES Usuario(Id),
    FOREIGN KEY (Parqueadero_fk) REFERENCES Parqueadero(Id),
    FOREIGN KEY (Vehiculo_fk) REFERENCES Vehiculo(Id)
);

CREATE TABLE Cupo_offline (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Parqueadero_fk BIGINT UNSIGNED,
    Vehiculo_fk BIGINT UNSIGNED,
    Pagado BOOLEAN DEFAULT FALSE,
    Hora_llegada DATE,
    Hora_salida DATE,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (Parqueadero_fk) REFERENCES Parqueadero(Id),
    FOREIGN KEY (Vehiculo_fk) REFERENCES Vehiculo(Id)
);

CREATE TABLE Tarifa (
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Valor_ordinario INT,
    Parqueadero_fk BIGINT UNSIGNED,
    Vehiculo_fk BIGINT UNSIGNED,
    Valor_mora INT,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (Parqueadero_fk) REFERENCES Parqueadero(Id),
    FOREIGN KEY (Vehiculo_fk) REFERENCES Vehiculo(Id)
);

CREATE TABLE Factura(
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Valor_pagado DECIMAL(15, 2),
    Cupo_fk BIGINT UNSIGNED,
    Vehiculo_fk BIGINT UNSIGNED,
    Parqueadero_fk BIGINT UNSIGNED,
    Usuario_fk BIGINT UNSIGNED,
    Tarjeta_credito_fk BIGINT UNSIGNED,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (Parqueadero_fk) REFERENCES Parqueadero(Id),
    FOREIGN KEY (Vehiculo_fk) REFERENCES Vehiculo(Id),
    FOREIGN KEY (Usuario_fk) REFERENCES Usuario(Id),
    FOREIGN KEY (Tarjeta_credito_fk) REFERENCES Tarjeta_credito(Id),
    FOREIGN KEY (Cupo_fk) REFERENCES Cupo(Id)
);

CREATE TABLE Factura_offline(
    Id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    Valor_pagado DECIMAL(15, 2),
    Cupo_offline_fk BIGINT UNSIGNED,
    Vehiculo_fk BIGINT UNSIGNED,
    Parqueadero_fk BIGINT UNSIGNED,
    Fecha_creacion DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (Parqueadero_fk) REFERENCES Parqueadero(Id),
    FOREIGN KEY (Vehiculo_fk) REFERENCES Vehiculo(Id),
    FOREIGN KEY (Cupo_offline_fk) REFERENCES Cupo_offline(Id)
);