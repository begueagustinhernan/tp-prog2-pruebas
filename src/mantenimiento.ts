export default class Mantenimiento {
    private costo: number;
    private fechaInicio: Date;
    private fechaFin: Date;
    private descripcion: string;
    private matriculaVehiculo: string;

    constructor(costo: number, fechaInicio: Date, fechaFin: Date, descripcion: string, matriculaVehiculo: string) {
        this.costo = costo;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.descripcion = descripcion;
        this.matriculaVehiculo = matriculaVehiculo;
    }
}