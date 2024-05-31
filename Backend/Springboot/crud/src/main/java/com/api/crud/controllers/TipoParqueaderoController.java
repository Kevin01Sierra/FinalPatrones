package com.api.crud.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.api.crud.services.TipoParqueaderoService;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("")
public class TipoParqueaderoController {
    @Autowired
    private TipoParqueaderoService tipoParqueaderoService;

    @CrossOrigin(origins = "https://fourparks-one.vercel.app")
    @GetMapping("/tiposParqueadero")
    public Map<String, Object> tiposParqueadero() {
        return Map.of("data", tipoParqueaderoService.obtenerTipoParqueadero(true), "msg", "Parqueaderos");
    }

}
