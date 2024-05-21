INSERT INTO ciudad VALUES (default,"Medellín",-75.56359,6.25184, NOW());
INSERT INTO ciudad VALUES (default,"Bogotá",-74.0467,4.6569, NOW());
INSERT INTO ciudad VALUES (default,"Cali",-76.5225,3.43722, NOW());
INSERT INTO ciudad VALUES (default,"popo",-76.5225,3.43722, NOW());

INSERT INTO tipo_parqueadero VALUES (default, "descubierto",NOW());
INSERT INTO tipo_parqueadero VALUES (default, "cubierto",NOW());
INSERT INTO tipo_parqueadero VALUES (default, "Semicubierto",NOW());

INSERT INTO usuario VALUES (default, "pedro","identificacion","contraseña","correo@correo.co",1,"usuario1",NOW(),0,"123456",1);

SELECT * FROM ciudad;