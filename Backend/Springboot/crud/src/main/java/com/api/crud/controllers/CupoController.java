package com.api.crud.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import com.api.crud.DTO.Request.*;
import com.api.crud.models.CupoModel;
import com.api.crud.models.FacturaModel;
import com.api.crud.models.FacturaOfflineModel;
import com.api.crud.services.Codigos;
import com.api.crud.services.CupoService;
import com.api.crud.services.IEmailService;
import com.api.crud.services.ManejarFechas;
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
    
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/reservarCupo")
    public Map<String, Object> reservarCupo(@RequestBody ReservarCupoRequest request) throws MessagingException{
        boolean disponibilidad = cupoService.verificarDisponibilidadCupo(request.getParqueaderoId(),request.getVehiculoId(),request.getHora_llegada());
        if (disponibilidad){
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
            
            return Map.of("data",Map.of("codigo",codigo), "msg", "Cupo reservado con exito");
        }
        return Map.of("data","", "msg", "Sin disponibilidad"); 
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/ocuparCupo")
    public Map<String, Object> ocuparCupo(@RequestBody OcuparRequest request) throws MessagingException{
        boolean ocupado = cupoService.ocuparCupo(request.getCodigo());
        if (ocupado) {
            EmailCupo emailCupo = new EmailCupo();
            emailCupo.setAsunto("Confirmación de Reserva de Parqueadero y Código de Acceso");
            emailCupo.setDestinatario(usuarioService.getPorId(cupoService.buscarCodigo(request.getCodigo()).getUsuario_fk()).get().getCorreo());
            emailCupo.setCodigo(request.getCodigo());
            emailCupo.setHoraLlegada(ManejarFechas.obtenerFechaActual());
            emailService.enviarCorreoConfirmacionCupo(emailCupo);
            return Map.of("data", Map.of("ocupado", true), "msg", "Cupo ocupado con exito"); 
        } else {
            return Map.of("data","", "msg", "No se encontraron cupos con reserva"); 
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/finalizarCupoOnline")
    public Map<String, Object> finalizarCupoOn(@RequestBody OcuparRequest request) {
        FacturaModel factura = cupoService.finalizarCupoOnline(request.getCodigo());
        return Map.of("data",Map.of("valor_ordinario",factura.getValorOrdinario(), "valor_extraordinario",factura.getValorExtraordinario(), "valor_total",factura.getValorTotal()), "msg", "Error al finalizar el cupo");  
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/finalizarCupoOffline")
    public Map<String, Object> finalizarCupoOff(@RequestBody OcuparRequest request) {
        FacturaOfflineModel factura = cupoService.finalizarCupoOffline(request.getCodigo());
        return Map.of("data",Map.of("valor_total",factura.getValorPagado()), "msg", "Error al finalizar el cupo");  
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/cancelarCupo")
    public Map<String, Object> cancelarCupo(@RequestBody CancelReservationRequest request) {
        boolean cancelado = cupoService.cancelarReserva(request.getCupoId());
        if (cancelado) {
            return Map.of("data",Map.of("cancelado",true), "msg", "Cancelado con exito");
        } else {
            return Map.of("data",Map.of("cancelado",false), "msg", "Error al cancelar el cupo");
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/verificarDisponibilidad")
    public Map<String, Object>verificarDisponibilidad(@RequestBody VerificarDisponibilidadRequest verificar) {
        boolean cupoDisponible = cupoService.verificarDisponibilidadCupo(verificar.getParqueaderoId(), verificar.getVehiculoId(),verificar.getHora_llegada());
        return Map.of("data",cupoDisponible, "msg", "Disponibilidad");
        
    }

}
