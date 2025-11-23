import { Vehiculo } from "../vehiculo";
import { IEstadoVehiculo } from "./iEstadoVehiculo";
import Cliente from "../../cliente";

/**
 * Clase base abstracta que implementa la interfaz IEstadoVehiculo (Patrón State).
 *
 * Provee una implementación por defecto para todos los métodos, lanzando una
 * excepción de "Acción Inválida" si la acción no es permitida en un estado
 * particular.
 *
 * Las clases concretas de estado deben heredar de esta
 * y sobrescribir únicamente los métodos que representan una transición o acción
 * válida.
 * @abstract
 */
export abstract class EstadoBase implements IEstadoVehiculo {

    /**
     * Nombre descriptivo del estado actual del vehículo.
     * @protected
     * @type {string}
     */
    protected nombreEstado: string = "";

    /**
     * Obtiene el nombre descriptivo del estado actual.
     * @returns {string} Nombre del estado.
     */
    public getNombreEstado(): string {
        return this.nombreEstado;
    }

    /**
     * Lanza una excepción genérica indicando que la acción solicitada
     * no es válida para el estado actual del vehículo.
     * @private
     * @param accion - Descripción de la acción que se intentó realizar (ej. "Alquilar").
     */
    private lanzarErrorAccionInvalida(accion: string): void {
        throw new Error(`Acción inválida: No se puede ${accion} un vehículo en estado "${this.getNombreEstado()}".`);
    }

    /**
     * Implementación por defecto: Lanza una excepción.
     */
    public alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {
        this.lanzarErrorAccionInvalida("Alquilar");
    }

    /**
     * Implementación por defecto: Lanza una excepción.
     */
    public devolver(vehiculo: Vehiculo): void {
        this.lanzarErrorAccionInvalida("Devolver");
    }

    /**
     * Implementación por defecto: Lanza una excepción.
     */
    public iniciarMantenimiento(vehiculo: Vehiculo, fechaInicio: Date): void {
        this.lanzarErrorAccionInvalida("Iniciar Mantenimiento");
    }

    /**
     * Implementación por defecto: Lanza una excepción.
     */
    public finalizarMantenimiento(vehiculo: Vehiculo, costo: number, fechaFin: Date): void {
        this.lanzarErrorAccionInvalida("Finalizar Mantenimiento");
    }

}