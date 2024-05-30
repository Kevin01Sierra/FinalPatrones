package com.api.crud.controllers;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.Optional;
import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletRequest;

import com.api.crud.DTO.Request.LoginRequest;
import com.api.crud.DTO.Response.LoginResponse;
import com.api.crud.DTO.Request.LoginCodigoRequest;
import com.api.crud.DTO.Request.IpCaptureRequest;
import com.api.crud.models.TipoUsuarioModel;
import com.api.crud.models.TipoUsuarioUsuarioModel;
import com.api.crud.models.UsuarioModel;
import com.api.crud.services.IEmailService;
import com.api.crud.services.IpService;
import com.api.crud.services.TipoUsuarioService;
import com.api.crud.services.TipoUsuarioUsuarioService;
import com.api.crud.services.UsuarioService;
import com.api.crud.services.models.EmailDTO;
import com.api.crud.services.Codigos;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("")
public class LoginController {
    @Autowired
    private UsuarioService userService;

    @Autowired
    private IEmailService emailService;

    @Autowired
    private IpService ipService;

    @CrossOrigin(origins = "https://backend-parqueadero-production.up.railway.app")
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody LoginRequest loginRequest) throws MessagingException {
        String usuario = loginRequest.getUsuario();
        String contrasena = loginRequest.getContrasena();
        EmailDTO email = new EmailDTO();
        Optional<UsuarioModel> usuarioLoggeado = this.userService.buscarUsuario(usuario);
        if (usuarioLoggeado.isPresent()) {
            String contrasenaAlmacenada = usuarioLoggeado.get().getContrasena();

            if (encriptarContrasena(contrasena).equals(contrasenaAlmacenada)) {
                if (usuarioLoggeado.get().isEstado()) {
                    usuarioLoggeado.get().setNum_intentos(0);
                    String codigo = Codigos.generarCodigoLogin();
                    usuarioLoggeado.get().setCod_verificacion(codigo);
                    userService.guardarUsuario(usuarioLoggeado.get());
                    email.setDestinatario(usuarioLoggeado.get().getCorreo());
                    email.setMensaje(codigo);
                    email.setAsunto("Código de verificación");
                    emailService.enviarCorreoCodigo(email);
                    return Map.of("data",
                            Map.of("estado", usuarioLoggeado.get().isEstado(), "id", usuarioLoggeado.get().getId()),
                            "msg",
                            "Usuario habilitado");
                } else {
                    return Map.of("data", "", "msg", "Usuario bloqueado");
                }
            } else {
                // Contraseña incorrecta
                Optional<UsuarioModel> usuarioExiste = this.userService.buscarUsuario(usuario);
                if (!usuarioExiste.isEmpty()) {
                    int intentos = usuarioExiste.get().getNum_intentos();
                    intentos += 1;
                    usuarioExiste.get().setNum_intentos(intentos);
                    userService.guardarUsuario(usuarioExiste.get());
                    if (intentos >= 3) {
                        usuarioExiste.get().setEstado(false);
                        userService.guardarUsuario(usuarioExiste.get());
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
        } else {
            // Usuario no encontrado
            return Map.of("data", "", "msg", "Usuario o contraseña incorrecta");
        }
    }

    private String encriptarContrasena(String contrasena) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(contrasena.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : messageDigest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error encriptando la contra", e);
        }
    }

    @Autowired
    private TipoUsuarioService tipoUsuarioService;

    @Autowired
    private TipoUsuarioUsuarioService tipoUsuarioUsuarioService;

    @CrossOrigin(origins = "https://backend-parqueadero-production.up.railway.app")
    @PostMapping("/loginCodigo")
    public Map<String, Object> loginCodigo(@RequestBody LoginCodigoRequest loginCodigoRequest,
            HttpServletRequest request) {
        Long id = loginCodigoRequest.getId();
        String codigo = loginCodigoRequest.getCodigo();
        String codigoUsuario = this.userService.codigoUsuario(id);

        if (codigo.equals(codigoUsuario)) {
            Optional<UsuarioModel> cliente = this.userService.getPorId(id);
            LoginResponse respuestaLogin = new LoginResponse();
            respuestaLogin.setNombre(cliente.get().getNombre());
            respuestaLogin.setCorreo(cliente.get().getCorreo());
            respuestaLogin.setIdentificacion(cliente.get().getIdentificacion());
            respuestaLogin.setEstado(cliente.get().isEstado());
            respuestaLogin.setUsuario(cliente.get().getUsuario());
            Vector<TipoUsuarioUsuarioModel> rompimiento = tipoUsuarioUsuarioService
                    .obtenerTipoUsuario(cliente.get().getId());
            Vector<TipoUsuarioModel> tipos = new Vector<>();
            for (int i = 0; i < rompimiento.size(); i++) {
                Optional<TipoUsuarioModel> tipo = tipoUsuarioService
                        .obtenerTipo(rompimiento.get(i).getTipo_usuario_fk());
                if (!tipo.isEmpty()) {
                    tipos.add(tipo.get());
                }
            }
            respuestaLogin.setTipo(tipos);
            respuestaLogin.setId(cliente.get().getId());
            IpCaptureRequest ipCaptureRequest = new IpCaptureRequest();
            ipCaptureRequest.setIpAddress(request.getRemoteAddr());
            ipCaptureRequest.setUserId(cliente.get().getId());
            ipService.captureIp(ipCaptureRequest);
            return Map.of("data", respuestaLogin, "msg", "Codigo correcto");
        } else {
            IpCaptureRequest ipCaptureRequest = new IpCaptureRequest();
            ipCaptureRequest.setIpAddress(request.getRemoteAddr());
            ipService.captureIp(ipCaptureRequest);
            return Map.of("msg", "Codigo incorrecto");
        }

    }
}
