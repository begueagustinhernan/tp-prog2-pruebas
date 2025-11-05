import { Vehiculo } from "../vehiculo";
import Cliente from "../../cliente";
import Reserva from "../../reserva";

export interface IEstadoVehiculo {
    alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void;
    devolver(vehiculo: Vehiculo): void; 
    iniciarMantenimiento(vehiculo: Vehiculo): void;
    finalizarMantenimiento(vehiculo: Vehiculo): void;

}