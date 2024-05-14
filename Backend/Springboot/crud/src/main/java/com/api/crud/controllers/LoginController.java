package com.api.crud.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.crud.DTO.LoginCodigoRequest;
import com.api.crud.DTO.LoginRequest;
import com.api.crud.models.UsuarioModel;
import com.api.crud.services.IEmailService;
import com.api.crud.services.UsuarioService;
import com.api.crud.services.models.EmailDTO;
import com.api.crud.services.CodigoLogin;

import jakarta.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("")
public class LoginController {
    @Autowired
    private UsuarioService userService;

    @Autowired
    private IEmailService emailService;

    @Autowired 
    private IpService ipService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest loginRequestm HttpServletRequest request) throws MessagingException {
        String usuario = loginRequest.getUsuario();
        String contrasena = loginRequest.getContrasena();
        EmailDTO email = new EmailDTO();
        Optional<UsuarioModel> usuarioLoggeado = this.userService.login(usuario, contrasena);
        String ipAddress = request.getRemoteAddr();
        
        if (!usuarioLoggeado.isEmpty()) {
                

            if (usuarioLoggeado.get().isEstado()) {
                usuarioLoggeado.get().setNum_intentos(0);
                CodigoLogin lc = new CodigoLogin();
                String codigo = lc.generarCodigo();
                usuarioLoggeado.get().setCod_verificacion(codigo);
                userService.guardarUsuario(usuarioLoggeado.get());
                ipService.saveIpAddress(ipAddress, usuarioLoggeado.get().getId()); // Guardado de la dirección IP
                email.setDestinatario(usuarioLoggeado.get().getCorreo());
                email.setMensaje(codigo);
                email.setAsunto("Código de verificación");
                emailService.enviarCorreoCodigo(email);
                return Map.of("data",
                        Map.of("estado", usuarioLoggeado.get().isEstado(), "id", usuarioLoggeado.get().getId()), "msg",
                        "Usuario habilitado");
            } else {

                return Map.of("data", "", "msg", "Usuario bloqueado");
            }
        } else {
            Optional<UsuarioModel> usuarioExiste = this.userService.buscarUsuario(usuario);
            if (!usuarioExiste.isEmpty()) {
                int intentos = usuarioExiste.get().getNum_intentos();
                intentos += 1;
                usuarioExiste.get().setNum_intentos(intentos);
                userService.guardarUsuario(usuarioExiste.get());
                if (intentos >= 3) {
                    usuarioExiste.get().setEstado(false);
                    userService.guardarUsuario(usuarioExiste.get());
                    ipService.saveIpAddress(ipAddress, usuarioLoggeado.get().getId()); // Guardadio de la dirección IP
                    email.setDestinatario(usuarioExiste.get().getCorreo());
                    email.setMensaje("Su cuenta ha sido bloqueada, por favor comuniquese con administración");
                    email.setAsunto("Bloqueo de cuenta");
                    emailService.enviarCorreoBloqueo(email);
                    return Map.of("data", "", "msg", "El usuario ha sido bloqueado por exceso de intentos");
                } else {
                    return Map.of("data", "", "msg", "Contraseña incorrecta");
                }

            } else {
                return Map.of("data", this.userService.login(usuario, contrasena), "msg",
                        "Usuario o contraseña incorrecta");
            }
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/loginCodigo")
    public Map<String, Object> loginCodigo(@RequestBody LoginCodigoRequest loginCodigoRequest) {
        Long id = loginCodigoRequest.getId();
        String codigo = loginCodigoRequest.getCodigo();
        String codigoUsuario = this.userService.codigoUsuario(id);

        if (codigo.equals(codigoUsuario)) {
            Optional<UsuarioModel> cliente = this.userService.getPorId(id);
            String nombre = cliente.get().getNombre();
            String correo = cliente.get().getCorreo();
            String identificacion = cliente.get().getIdentificacion();
            Boolean estado = cliente.get().isEstado();
            String usuario = cliente.get().getUsuario();
            return Map.of("data", Map.of("id",id,"nombre", nombre, "correo", correo, "identificacion", identificacion, "estado",
                    estado, "usuario", usuario), "msg", "Codigo correcto");
        } else {
            return Map.of("msg", "Codigo incorrecto");
        }

    }
}
