package com.api.crud.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.crud.services.VehiculoService;

@RestController
@RequestMapping("")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    @CrossOrigin(origins = "https://backend-parqueadero-production.up.railway.app")
    @GetMapping("/obtenerVehiculos")
    public Map<String, Object> obtenerVehiculos() {
        return Map.of("data", vehiculoService.obtenerVehiculos(true), "msg", "Vehiculos");
    }
}
