package com.api.crud.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.crud.DTO.ParqueaderoBasicoResponse;
import com.api.crud.DTO.ParqueaderoRequest;
import com.api.crud.DTO.ParqueaderoResponse;
import com.api.crud.models.ParqueaderoModel;
import com.api.crud.services.ParqueaderoService;
import com.api.crud.services.TipoParqueaderoService;
import java.util.Optional;
import java.util.Map;
import java.util.Vector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("")
public class ParqueaderoController {
    @Autowired
    private ParqueaderoService parqueaderoService;

    @Autowired
    private TipoParqueaderoService tipoParqueaderoService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/parqueaderoCiudad")
    public Map<String,Object> parqueaderoCiudad(@RequestBody ParqueaderoRequest ciudad){
        Vector<ParqueaderoModel> parquedaeros = parqueaderoService.obtenerParqueaderoCiudad(ciudad.getCiudad_fk());
        Vector<ParqueaderoResponse> parqueaderos_disponibles = new Vector<>();
        for(int i=0;i<parquedaeros.size();i++){
            ParqueaderoResponse parqueadero_parcial = new ParqueaderoResponse();
            parqueadero_parcial.setId(parquedaeros.get(i).getId());
            parqueadero_parcial.setNombre(parquedaeros.get(i).getNombre());
            parqueadero_parcial.setLongitud(parquedaeros.get(i).getLongitud());
            parqueadero_parcial.setLatitud(parquedaeros.get(i).getLatitud());

            int total_carro = parquedaeros.get(i).getCupo_carro_total();
            int total_bici = parquedaeros.get(i).getCupo_bici_total();
            int total_moto = parquedaeros.get(i).getCupo_moto_total();

            int utilizado_carro = parquedaeros.get(i).getCupo_uti_carro();
            int utilizado_bici = parquedaeros.get(i).getCupo_uti_bici();
            int utilizado_moto = parquedaeros.get(i).getCupo_uti_moto();

            parqueadero_parcial.setCupo_disponible_carro(total_carro-utilizado_carro);
            parqueadero_parcial.setCupo_disponible_bici(total_bici-utilizado_bici);
            parqueadero_parcial.setCupo_disponible_moto(total_moto-utilizado_moto);

            int disponibilidad_total = total_carro+total_bici+total_moto;
            int utilizado_total = utilizado_carro+utilizado_bici+utilizado_moto;

            double porcentaje_disponibilidad = ((double) disponibilidad_total / (double) (disponibilidad_total + utilizado_total));

            if (porcentaje_disponibilidad > 0 && porcentaje_disponibilidad < 0.6){
                parqueadero_parcial.setColor("VERDE");
            }else if(porcentaje_disponibilidad >= 0.6 && porcentaje_disponibilidad < 1){
                parqueadero_parcial.setColor("AMARILLO");
            }else if(porcentaje_disponibilidad == 1){
                parqueadero_parcial.setColor("NEGRO");
            }

            parqueadero_parcial.setTipo(tipoParqueaderoService.obtenerTipo(parquedaeros.get(i).getTipo_fk()));

            parqueaderos_disponibles.add(parqueadero_parcial);
        }
        
        return Map.of("data", parqueaderos_disponibles, "msg", "Parqueaderos");
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/parqueaderoCiudadBasico")
    public Map<String,Object> parqueaderoCiudadBasico(@RequestBody ParqueaderoRequest ciudad){
        Vector<ParqueaderoModel> parquedaeros = parqueaderoService.obtenerParqueaderoCiudad(ciudad.getCiudad_fk());
        Vector<ParqueaderoBasicoResponse> parqueaderos_disponibles = new Vector<>();
        for(int i=0;i<parquedaeros.size();i++){
            ParqueaderoBasicoResponse parqueadero_parcial = new ParqueaderoBasicoResponse();
            parqueadero_parcial.setId(parquedaeros.get(i).getId());
            parqueadero_parcial.setNombre(parquedaeros.get(i).getNombre());
            parqueaderos_disponibles.add(parqueadero_parcial);
        }
        return Map.of("data", parqueaderos_disponibles, "msg", "Parqueaderos");
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/obtenerParqueadero")
    public Map<String,Object> obtenerParqueadero(@RequestBody ParqueaderoRequest parqueadero){
        Optional<ParqueaderoModel> parquedaeros = parqueaderoService.obtenerParqueadero(parqueadero.getParqueadero_id());
        return Map.of("data", parquedaeros.get(), "msg", "Parqueaderos");
    }
    

}
