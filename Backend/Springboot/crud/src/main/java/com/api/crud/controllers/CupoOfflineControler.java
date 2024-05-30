package com.api.crud.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.crud.DTO.Request.ReservarCupoOfflineRequest;
import com.api.crud.models.CupoOfflineModel;
import com.api.crud.services.Codigos;
import com.api.crud.services.CupoService;
import com.api.crud.services.ManejarFechas;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("")
public class CupoOfflineControler {
    @Autowired
    private CupoService cupoService;

    @CrossOrigin(origins = "https://backend-parqueadero-production.up.railway.app")
    @PostMapping("/reservarCupoOffline")
    public Map<String, Object> postMethodName(@RequestBody ReservarCupoOfflineRequest request) {
        boolean disponibilidad = cupoService.verificarDisponibilidadCupo(request.getParqueaderoId(),
                request.getVehiculoId(), ManejarFechas.obtenerFechaActual());
        if (disponibilidad) {
            CupoOfflineModel cupoOffline = new CupoOfflineModel();
            cupoOffline.setEstado(CupoOfflineModel.Estado.OCUPADO);
            cupoOffline.setParqueadero_fk(request.getParqueaderoId());
            cupoOffline.setVehiculo_fk(request.getVehiculoId());
            cupoOffline.setFecha_creacion(ManejarFechas.obtenerFechaActual());
            cupoOffline.setHora_llegada(ManejarFechas.obtenerFechaActual());
            cupoOffline.setActivo(true);
            String codigo = Codigos.generarCodigoCupo();
            cupoOffline.setCodigo(codigo);
            cupoService.actualizarParqueadero(request.getParqueaderoId(), request.getVehiculoId(), 1);
            cupoService.guardarCupoOffline(cupoOffline);
            return Map.of("data", Map.of("codigo", codigo), "msg", "Cupo reservado con exito");
        }
        return Map.of("data", "", "msg", "Sin disponibilidad");
    }

}
