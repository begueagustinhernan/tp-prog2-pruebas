import { Vehiculo } from "../vehiculo";
import Cliente from "../../cliente";

/**
 * Interfaz que define el comportamiento que debe tener un vehículo
 * en función de su estado actual (Patrón State).
 *
* Cada clase concreta que implemente esta interfaz define la lógica de negocio
* y las posibles transiciones de estado para las acciones de alquiler, devolución y mantenimiento.
 */
export interface IEstadoVehiculo {

    /**
     * Define la lógica para el alquiler de un vehículo en un estado específico.
     *
     * @param vehiculo - La instancia del vehículo cuyo estado se intenta cambiar.
     * @param cliente - El cliente que realiza el alquiler.
     * @param fechaInicio - Fecha de inicio de la reserva.
     * @param fechaFin - Fecha de fin de la reserva.
     */
    alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void;

    /**
     * Define la lógica para la devolución de un vehículo en un estado específico.
     *
     * @param vehiculo - La instancia del vehículo cuyo estado se intenta cambiar.
     */
    devolver(vehiculo: Vehiculo): void;

    /**
     * Define la lógica para enviar el vehículo a mantenimiento en un estado específico.
     *
     * @param vehiculo - La instancia del vehículo cuyo estado se intenta cambiar.
     * @param fechaInicio - Fecha en la que comienza el mantenimiento.
     */
    iniciarMantenimiento(vehiculo: Vehiculo, fechaInicio: Date): void;

    /**
     * Define la lógica para finalizar el mantenimiento de un vehículo en un estado específico.
     *
     * @param vehiculo - La instancia del vehículo cuyo estado se intenta cambiar.
     * @param costo - El costo total del mantenimiento.
     * @param fechaFin - La fecha en la que finaliza el mantenimiento.
     */
    finalizarMantenimiento(vehiculo: Vehiculo, costo: number, fechaFin: Date): void;

}