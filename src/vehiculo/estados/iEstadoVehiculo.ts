import { Vehiculo } from "../vehiculo";
import Cliente from "../../cliente";

export interface IEstadoVehiculo {
    alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void;
    devolver(vehiculo: Vehiculo): void;
    iniciarMantenimiento(vehiculo: Vehiculo, fechaInicio: Date): void;
    finalizarMantenimiento(vehiculo: Vehiculo, costo: number, fechaFin: Date): void;

}