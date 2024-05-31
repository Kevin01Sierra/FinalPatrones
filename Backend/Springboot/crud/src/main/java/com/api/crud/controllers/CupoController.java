package com.api.crud.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.api.crud.DTO.Request.*;
import com.api.crud.DTO.Response.CuposUsuarioResponse;
import com.api.crud.models.CupoModel;
import com.api.crud.models.FacturaModel;
import com.api.crud.models.FacturaOfflineModel;
import com.api.crud.models.ParqueaderoModel;
import com.api.crud.models.TarifaModel;
import com.api.crud.services.CalculoPrecioService;
import com.api.crud.services.CiudadService;
import com.api.crud.services.Codigos;
import com.api.crud.services.CupoService;
import com.api.crud.services.IEmailService;
import com.api.crud.services.ManejarFechas;
import com.api.crud.services.ParqueaderoService;
import com.api.crud.services.TarifaService;
import com.api.crud.services.UsuarioService;
import com.api.crud.services.models.EmailCupo;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("")
public class CupoController {

    @Autowired
    private CupoService cupoService;

    @Autowired
    private IEmailService emailService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private CiudadService ciudadService;

    @Autowired
    private ParqueaderoService parqueaderoService;

    @Autowired
    private TarifaService tarifaService;

    @CrossOrigin(origins = "https://fourparks-one.vercel.app")
    @PostMapping("/reservarCupo")
    public Map<String, Object> reservarCupo(@RequestBody ReservarCupoRequest request) throws MessagingException {
        boolean disponibilidad = cupoService.verificarDisponibilidadCupo(request.getParqueaderoId(),
                request.getVehiculoId(), request.getHora_llegada());
        if (disponibilidad) {
            CupoModel cupo = new CupoModel();
            cupo.setEstado(CupoModel.Estado.RESERVADO);
            cupo.setUsuario_fk(request.getUsuarioId());
            cupo.setParqueadero_fk(request.getParqueaderoId());
            cupo.setVehiculo_fk(request.getVehiculoId());
            cupo.setFecha_creacion(ManejarFechas.obtenerFechaActual());
            cupo.setHora_llegada(request.getHora_llegada());
            cupo.setHoras_pedidas(request.getHoras());
            cupo.setPagado(false);
            cupo.setActivo(true);
            String codigo = Codigos.generarCodigoCupo();
            cupo.setCodigo(codigo);
            cupoService.guardarCupo(cupo);
            EmailCupo emailCupo = new EmailCupo();
            emailCupo.setAsunto("Confirmación de Reserva de Parqueadero y Código de Acceso");
            emailCupo.setDestinatario(usuarioService.getPorId(request.getUsuarioId()).get().getCorreo());
            emailCupo.setCodigo(codigo);
            emailCupo.setHoraLlegada(request.getHora_llegada());
            emailCupo.setHorasSolicitadas(request.getHoras());
            emailService.enviarCorreoCodigoCupo(emailCupo);

            return Map.of("data", Map.of("codigo", codigo), "msg", "Cupo reservado con exito");
        }
        return Map.of("data", "", "msg", "Sin disponibilidad");
    }

    @CrossOrigin(origins = "https://fourparks-one.vercel.app")
    @PostMapping("/ocuparCupo")
    public Map<String, Object> ocuparCupo(@RequestBody OcuparRequest request) throws MessagingException {
        boolean ocupado = cupoService.ocuparCupo(request.getCodigo());
        if (ocupado) {
            EmailCupo emailCupo = new EmailCupo();
            emailCupo.setAsunto("Confirmación de Reserva de Parqueadero y Código de Acceso");
            emailCupo.setDestinatario(usuarioService
                    .getPorId(cupoService.buscarCodigo(request.getCodigo()).getUsuario_fk()).get().getCorreo());
            emailCupo.setCodigo(request.getCodigo());
            emailCupo.setHoraLlegada(ManejarFechas.obtenerFechaActual());
            emailService.enviarCorreoConfirmacionCupo(emailCupo);
            return Map.of("data", Map.of("ocupado", true), "msg", "Cupo ocupado con exito");
        } else {
            return Map.of("data", "", "msg", "No se encontraron cupos con reserva");
        }
    }

    @CrossOrigin(origins = "https://fourparks-one.vercel.app")
    @PostMapping("/finalizarCupoOnline")
    public Map<String, Object> finalizarCupoOn(@RequestBody OcuparRequest request) {
        FacturaModel factura = cupoService.finalizarCupoOnline(request.getCodigo());
        return Map.of("data",
                Map.of("valor_ordinario", factura.getValorOrdinario(), "valor_extraordinario",
                        factura.getValorExtraordinario(), "valor_total", factura.getValorTotal()),
                "msg", "Error al finalizar el cupo");
    }

    @CrossOrigin(origins = "https://fourparks-one.vercel.app")
    @PostMapping("/finalizarCupoOffline")
    public Map<String, Object> finalizarCupoOff(@RequestBody OcuparRequest request) {
        FacturaOfflineModel factura = cupoService.finalizarCupoOffline(request.getCodigo());
        return Map.of("data", Map.of("valor_total", factura.getValorPagado()), "msg", "Error al finalizar el cupo");
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/cancelarCupo")
    public Map<String, Object> cancelarCupo(@RequestBody CancelReservationRequest request) {
        boolean cancelado = cupoService.cancelarReserva(request.getCupoId());
        if (cancelado) {
            return Map.of("data", Map.of("cancelado", true), "msg", "Cancelado con exito");
        } else {
            return Map.of("data", Map.of("cancelado", false), "msg", "Error al cancelar el cupo");
        }
    }

    @CrossOrigin(origins = "https://fourparks-one.vercel.app")
    @PostMapping("/verificarDisponibilidad")
    public Map<String, Object> verificarDisponibilidad(@RequestBody VerificarDisponibilidadRequest verificar) {
        boolean cupoDisponible = cupoService.verificarDisponibilidadCupo(verificar.getParqueaderoId(),
                verificar.getVehiculoId(), verificar.getHora_llegada());
        return Map.of("data", cupoDisponible, "msg", "Disponibilidad");

    }

    @CrossOrigin(origins = "https://fourparks-one.vercel.app")
    @PostMapping("/listaCupos")
    public Map<String, Object> listaCupos(@RequestBody UsuarioRequest usuario) {
        List<CupoModel> cupos = cupoService.buscarCupos(usuario.getUsuario_id());
        List<CuposUsuarioResponse> cuposUsuario = new ArrayList<>();
        for (int i = 0; i < cupos.size(); i++) {
            CuposUsuarioResponse cupoGuardar = new CuposUsuarioResponse();
            ParqueaderoModel parqueadero = parqueaderoService.obtenerParqueadero(cupos.get(i).getParqueadero_fk())
                    .get();
            cupoGuardar.setCiudad(ciudadService.buscarNombreCiudad(parqueadero.getCiudad_fk()));
            cupoGuardar.setParqueadero(parqueaderoService.obtenerNombreParqueadero(parqueadero.getId()));
            cupoGuardar.setCupoId(cupos.get(i).getId());
            cupoGuardar.setCodigo(cupos.get(i).getCodigo());
            cupoGuardar.setEstado(cupos.get(i).getEstado().toString());
            cupoGuardar.setMontoPagar(CalculoPrecioService.CalcularPrecio(tarifaService
                    .obtenerTarifaParqueaderoVehiculo(cupos.get(i).getParqueadero_fk(), cupos.get(i).getVehiculo_fk())
                    .get(), cupos.get(i).getHoras_pedidas()));
            cuposUsuario.add(cupoGuardar);
        }
        return Map.of("data", cuposUsuario, "msg", "Disponibilidad");
    }
}
