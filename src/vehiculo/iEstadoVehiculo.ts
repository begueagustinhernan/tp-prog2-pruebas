import { Vehiculo } from "./vehiculo";
import Cliente from "../cliente";

export interface IEstadoVehiculo {
    alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void;
    devolver(vehiculo: Vehiculo): void;
    iniciarMantenimiento(vehiculo: Vehiculo, descripcion: string, fechaInicio: Date): void;
    finalziarProceso(vehiculo: Vehiculo, costo: number, fechaFin: Date): void;
    iniciarLimpieza(vehiculo: Vehiculo):void;


}