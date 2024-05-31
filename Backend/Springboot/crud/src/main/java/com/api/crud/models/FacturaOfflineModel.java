package com.api.crud.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "factura_offline")
public class FacturaOfflineModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor_pagado", nullable = false)
    private BigDecimal valorPagado;

    @Column(name = "cupo_offline_fk", nullable = false)
    private long cupoOfflineId;

    @Column(name = "vehiculo_fk", nullable = false)
    private long vehiculoId;

    @Column(name = "parqueadero_fk", nullable = false)
    private long parqueaderoId;

    @Column(name = "fecha_creacion", nullable = false, updatable = false, insertable = false)
    private Date fechaCreacion;

    @Column(name = "activo")
    private Boolean activo;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValorPagado() {
        return valorPagado;
    }

    public void setValorPagado(BigDecimal valorPagado) {
        this.valorPagado = valorPagado;
    }

    public long getCupoOfflineId() {
        return cupoOfflineId;
    }

    public void setCupoOfflineId(long cupoOfflineId) {
        this.cupoOfflineId = cupoOfflineId;
    }

    public long getVehiculoId() {
        return vehiculoId;
    }

    public void setVehiculoId(long vehiculoId) {
        this.vehiculoId = vehiculoId;
    }

    public long getParqueaderoId() {
        return parqueaderoId;
    }

    public void setParqueaderoId(long parqueaderoId) {
        this.parqueaderoId = parqueaderoId;
    }


    /**
     * @return Date return the fechaCreacion
     */
    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    /**
     * @param fechaCreacion the fechaCreacion to set
     */
    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    /**
     * @return Boolean return the activo
     */
    public Boolean isActivo() {
        return activo;
    }

    /**
     * @param activo the activo to set
     */
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

}