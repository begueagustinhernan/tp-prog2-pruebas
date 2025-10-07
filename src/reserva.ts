import Kilometraje from "./kilometraje";
import { Vehiculo } from "./vehiculo/vehiculo";
import Cliente from "./cliente";
import DateUtils from "./dateutils";

export default class Reserva {
    private fechaInicio: Date;
    private fechaFin: Date;
    private kilometraje: Kilometraje;
    private vehiculo: Vehiculo;
    private cliente: Cliente;

    constructor(fechaInicio: Date, fechaFin: Date, kilometraje: Kilometraje, vehiculo: Vehiculo, cliente: Cliente) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kilometraje = kilometraje;
        this.vehiculo = vehiculo;
        this.cliente = cliente;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public getKilometraje(): Kilometraje {
        return this.kilometraje;
    }

    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public obtenerCostoTotal(): number {
        const duracion = DateUtils.obtenerDiasDuracion(this.getFechaInicio(), this.getFechaFin());
        const kilometraje = this.getKilometraje();

        const costoTotal = this.getVehiculo().getTarifa().calcularCosto(duracion, kilometraje);
        return costoTotal;
    }
}

