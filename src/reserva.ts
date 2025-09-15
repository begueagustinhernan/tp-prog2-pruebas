import { Vehiculo } from "./Vehiculo";
import Cliente from "./cliente";
import Kilometraje from "./kilometraje";

export default class Reserva {
    private fechaInicio: Date;
    private fechaFin: Date;
    private estado: string;
    private kilometraje: Kilometraje;
    private vehiculo: Vehiculo;
    private cliente: Cliente;
    private duracionAlquiler: number;

    constructor(fechaInicio: Date, fechaFin: Date, estado: string, kilometraje: Kilometraje, vehiculo: Vehiculo, cliente: Cliente) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
        this.kilometraje = kilometraje;
        this.vehiculo = vehiculo;
        this.cliente = cliente;
        this.duracionAlquiler = 0;
    }

    // setters y getters

    public obtenerDuracionAlquiler(fechaInicio: Date, fechaFin: Date): void {
        const diferenciaMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
        const diaEnMilisegundos = 1000 * 660 * 60 * 24;

        this.duracionAlquiler = Math.floor(diferenciaMilisegundos / diaEnMilisegundos);
    }

    // metodo 2
}