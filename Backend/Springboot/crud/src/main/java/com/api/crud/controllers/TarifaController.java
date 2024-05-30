package com.api.crud.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.crud.DTO.Request.TarifaRequest;
import com.api.crud.models.TarifaModel;
import com.api.crud.services.CalculoPrecioService;
import com.api.crud.services.TarifaService;

@RestController
@RequestMapping("")
public class TarifaController {
    @Autowired
    private TarifaService tarifaService;

    @CrossOrigin(origins = "https://prueba3-rhby.vercel.app")
    @PostMapping("/tarifaParqueadero")
    public Map<String, Object> tarifaParqueadero(@RequestBody TarifaRequest tarifa) {
        return Map.of("data", tarifaService.obtenerTarifaParqueadero(tarifa.getParqueadero_fk()), "msg", "Precios");
    }

    @CrossOrigin(origins = "https://prueba3-rhby.vercel.app")
    @PostMapping("/tarifaParqueaderoVehiculo")
    public Map<String, Object> tarifaParqueaderoVehiculo(@RequestBody TarifaRequest tarifa) {
        Optional<TarifaModel> tarifaParqueadero = tarifaService
                .obtenerTarifaParqueaderoVehiculo(tarifa.getParqueadero_fk(), tarifa.getVehiculo_fk());
        if (tarifaParqueadero.isPresent()) {
            int precioFinal = CalculoPrecioService.CalcularPrecio(tarifaParqueadero.get(), tarifa.getHoras());
            return Map.of("data", Map.of("Precio", precioFinal), "msg", "Calculo de precio");
        }
        return Map.of("data", "", "msg", "Parqueadero o vehiculo no encontrado");

    }
}
