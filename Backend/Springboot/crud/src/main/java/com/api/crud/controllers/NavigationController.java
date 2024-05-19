package com.api.crud.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.api.crud.dto.IpCaptureRequest;
import com.api.crud.services.IpService;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/navigation")
public class NavigationController {

    @Autowired
    private IpService ipService;

    @GetMapping("/track")
    public void trackVisitor(HttpServletRequest request) {
        String clientIp = request.getRemoteAddr();
        IpCaptureRequest ipCaptureRequest = new IpCaptureRequest();
        ipCaptureRequest.setIpAddress(clientIp);
        ipService.captureIp(ipCaptureRequest);
    }
}
