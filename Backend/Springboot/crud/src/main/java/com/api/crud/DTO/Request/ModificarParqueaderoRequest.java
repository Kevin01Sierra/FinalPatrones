package com.api.crud.DTO.Request;


public class ModificarParqueaderoRequest {
    private Long id;
    private String nombre;
    private int cupo_bici_total;
    private int cupo_carro_total;
    private int cupo_moto_total;
    private int precio_normal_carro;
    private int precio_normal_moto;
    private int precio_normal_ciclas;
    private int precio_mora_carro;
    private int precio_mora_moto;
    private int precio_mora_bici;
    private double longitud;
    private double latitud;

    /**
     * @return String return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return String return the nombre
     */
    public String getNombre() {
        return nombre;
    }

    /**
     * @param nombre the nombre to set
     */
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    /**
     * @return int return the cupo_bici_total
     */
    public int getCupo_bici_total() {
        return cupo_bici_total;
    }

    /**
     * @param cupo_bici_total the cupo_bici_total to set
     */
    public void setCupo_bici_total(int cupo_bici_total) {
        this.cupo_bici_total = cupo_bici_total;
    }

    /**
     * @return int return the cupo_carro_total
     */
    public int getCupo_carro_total() {
        return cupo_carro_total;
    }

    /**
     * @param cupo_carro_total the cupo_carro_total to set
     */
    public void setCupo_carro_total(int cupo_carro_total) {
        this.cupo_carro_total = cupo_carro_total;
    }

    /**
     * @return int return the cupo_moto_total
     */
    public int getCupo_moto_total() {
        return cupo_moto_total;
    }

    /**
     * @param cupo_moto_total the cupo_moto_total to set
     */
    public void setCupo_moto_total(int cupo_moto_total) {
        this.cupo_moto_total = cupo_moto_total;
    }

    /**
     * @return int return the precio_normal_carro
     */
    public int getPrecio_normal_carro() {
        return precio_normal_carro;
    }

    /**
     * @param precio_normal_carro the precio_normal_carro to set
     */
    public void setPrecio_normal_carro(int precio_normal_carro) {
        this.precio_normal_carro = precio_normal_carro;
    }

    /**
     * @return int return the precio_normal_moto
     */
    public int getPrecio_normal_moto() {
        return precio_normal_moto;
    }

    /**
     * @param precio_normal_moto the precio_normal_moto to set
     */
    public void setPrecio_normal_moto(int precio_normal_moto) {
        this.precio_normal_moto = precio_normal_moto;
    }

    /**
     * @return int return the precio_normal_ciclas
     */
    public int getPrecio_normal_ciclas() {
        return precio_normal_ciclas;
    }

    /**
     * @param precio_normal_ciclas the precio_normal_ciclas to set
     */
    public void setPrecio_normal_ciclas(int precio_normal_ciclas) {
        this.precio_normal_ciclas = precio_normal_ciclas;
    }

    /**
     * @return int return the precio_mora_carro
     */
    public int getPrecio_mora_carro() {
        return precio_mora_carro;
    }

    /**
     * @param precio_mora_carro the precio_mora_carro to set
     */
    public void setPrecio_mora_carro(int precio_mora_carro) {
        this.precio_mora_carro = precio_mora_carro;
    }

    /**
     * @return int return the precio_mora_moto
     */
    public int getPrecio_mora_moto() {
        return precio_mora_moto;
    }

    /**
     * @param precio_mora_moto the precio_mora_moto to set
     */
    public void setPrecio_mora_moto(int precio_mora_moto) {
        this.precio_mora_moto = precio_mora_moto;
    }

    /**
     * @return int return the precio_mora_bici
     */
    public int getPrecio_mora_bici() {
        return precio_mora_bici;
    }

    /**
     * @param precio_mora_bici the precio_mora_bici to set
     */
    public void setPrecio_mora_bici(int precio_mora_bici) {
        this.precio_mora_bici = precio_mora_bici;
    }


    /**
     * @return double return the longitud
     */
    public double getLongitud() {
        return longitud;
    }

    /**
     * @param longitud the longitud to set
     */
    public void setLongitud(double longitud) {
        this.longitud = longitud;
    }

    /**
     * @return double return the latitud
     */
    public double getLatitud() {
        return latitud;
    }

    /**
     * @param latitud the latitud to set
     */
    public void setLatitud(double latitud) {
        this.latitud = latitud;
    }

}
