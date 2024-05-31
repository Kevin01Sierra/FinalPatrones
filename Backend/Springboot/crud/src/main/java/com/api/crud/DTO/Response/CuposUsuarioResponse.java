package com.api.crud.DTO.Response;


public class CuposUsuarioResponse {
    private Long cupoId;
    private String ciudad;
    private String vehiculo;
    private String parqueadero;
    private String codigo;
    private int montoPagar;
    private String estado;
        
    /**
     * @return Long return the cupoId
     */
    public Long getCupoId() {
        return cupoId;
    }

    /**
     * @param cupoId the cupoId to set
     */
    public void setCupoId(Long cupoId) {
        this.cupoId = cupoId;
    }

    /**
     * @return String return the ciudad
     */
    public String getCiudad() {
        return ciudad;
    }

    /**
     * @param ciudad the ciudad to set
     */
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    /**
     * @return String return the vehiculo
     */
    public String getVehiculo() {
        return vehiculo;
    }

    /**
     * @param vehiculo the vehiculo to set
     */
    public void setVehiculo(String vehiculo) {
        this.vehiculo = vehiculo;
    }

    /**
     * @return String return the codigo
     */
    public String getCodigo() {
        return codigo;
    }

    /**
     * @param codigo the codigo to set
     */
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    /**
     * @return BigDecimal return the montoPagar
     */
    public int getMontoPagar() {
        return montoPagar;
    }

    /**
     * @param montoPagar the montoPagar to set
     */
    public void setMontoPagar(int montoPagar) {
        this.montoPagar = montoPagar;
    }

    /**
     * @return String return the estado
     */
    public String getEstado() {
        return estado;
    }

    /**
     * @param estado the estado to set
     */
    public void setEstado(String estado) {
        this.estado = estado;
    }


    /**
     * @return String return the parqueadero
     */
    public String getParqueadero() {
        return parqueadero;
    }

    /**
     * @param parqueadero the parqueadero to set
     */
    public void setParqueadero(String parqueadero) {
        this.parqueadero = parqueadero;
    }

}
