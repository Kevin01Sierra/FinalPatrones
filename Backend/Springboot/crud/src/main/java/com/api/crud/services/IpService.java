package com.api.crud.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

import com.api.crud.DTO.Request.IpCaptureRequest;
import com.api.crud.models.IpModel;
import com.api.crud.repositories.IpRepository;

@Service
public class IpService {

    @Autowired
    private IpRepository ipRepository;

    public void captureIp(IpCaptureRequest request) {
        IpModel ip = new IpModel();
        ip.setDireccionIp(request.getIpAddress());
        ip.setUsuarioFk(request.getUserId());
        ip.setFechaCreacion(new Timestamp(System.currentTimeMillis()));
        ip.setActivo(true);
        ipRepository.save(ip);
    }
}

