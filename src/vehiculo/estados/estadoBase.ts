import { Vehiculo } from "../vehiculo";
import { IEstadoVehiculo } from "./iEstadoVehiculo";
import Cliente from "../../cliente";

export abstract class EstadoBase implements IEstadoVehiculo {

    protected nombreEstado: string = "";

    public getNombreEstado(): string {
        return this.nombreEstado;
    }

    private lanzarErrorAccionInvalida(accion: string): void {
        throw new Error(`Acción inválida: No se puede ${accion} un vehículo en estado "${this.getNombreEstado()}".`);
    }

    public alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        this.lanzarErrorAccionInvalida("Alquilar");
    }

    public devolver(vehiculo: Vehiculo): void {
        this.lanzarErrorAccionInvalida("Devolver");
    }

    public iniciarMantenimiento(vehiculo: Vehiculo, fechaInicio: Date): void {
        this.lanzarErrorAccionInvalida("Iniciar Mantenimiento");
    }

    public finalizarMantenimiento(vehiculo: Vehiculo, costo: number, fechaFin: Date): void {
        this.lanzarErrorAccionInvalida("Finalizar Mantenimiento");
    }

}