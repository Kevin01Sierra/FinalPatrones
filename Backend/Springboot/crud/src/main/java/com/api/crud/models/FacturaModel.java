package com.api.crud.models;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import java.math.BigDecimal;
import java.util.Date;


@Entity
@Table(name = "factura")
public class FacturaModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor_ordinario", nullable = false)
    private BigDecimal valorOrdinario;

    @Column(name = "valor_extraordinario", nullable = false)
    private BigDecimal valorExtraordinario;

    @Column(name = "valor_total", nullable = false)
    private BigDecimal valorTotal;

    @Column(name = "cupo_fk", nullable = false)
    private Long cupoId;

    @Column(name = "vehiculo_fk", nullable = false)
    private Long vehiculoId;

    @Column(name = "parqueadero_fk", nullable = false)
    private Long parqueaderoId;

    @Column(name = "usuario_fk", nullable = false)
    private Long usuarioId;

    @Column(name = "tarjeta_credito_fk", nullable = false)
    private Long tarjetaCreditoId;

    @Column(name = "fecha_creacion", nullable = false, updatable = false, insertable = false)
    private Date fechaCreacion;

    @Column(name = "activo")
    private Boolean activo;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public long getCupoId() {
        return cupoId;
    }

    public void setCupoId(long cupoId) {
        this.cupoId = cupoId;
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

    public long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public long getTarjetaCreditoId() {
        return tarjetaCreditoId;
    }

    public void setTarjetaCreditoId(long tarjetaCreditoId) {
        this.tarjetaCreditoId = tarjetaCreditoId;
    }


    /**
     * @return BigDecimal return the valorOrdinario
     */
    public BigDecimal getValorOrdinario() {
        return valorOrdinario;
    }

    /**
     * @param valorOrdinario the valorOrdinario to set
     */
    public void setValorOrdinario(BigDecimal valorOrdinario) {
        this.valorOrdinario = valorOrdinario;
    }

    /**
     * @return BigDecimal return the valorExtraordinario
     */
    public BigDecimal getValorExtraordinario() {
        return valorExtraordinario;
    }

    /**
     * @param valorExtraordinario the valorExtraordinario to set
     */
    public void setValorExtraordinario(BigDecimal valorExtraordinario) {
        this.valorExtraordinario = valorExtraordinario;
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


    /**
     * @return BigDecimal return the valorTotal
     */
    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    /**
     * @param valorTotal the valorTotal to set
     */
    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

}