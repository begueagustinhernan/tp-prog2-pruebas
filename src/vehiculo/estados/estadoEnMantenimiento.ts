import { Vehiculo } from "../vehiculo";
import { EstadoBase } from "./estadoBase";
import { EstadoDisponible } from "./estadoDisponible";

/**
 * Implementación del estado que indica que el vehículo está **En Mantenimiento**.
 *
 * En este estado, la única acción permitida es `finalizarMantenimiento`.
 *
 * Las acciones de 'alquilar', 'devolver' e 'iniciarMantenimiento' no son válidas y heredan
 * el comportamiento de lanzar excepción de la clase EstadoBase.
 */
export class EstadoEnMantenimiento extends EstadoBase {

    /**
     * Crea una nueva instancia del estado En Mantenimiento y establece su nombre.
     */
    constructor() {
        super()
        this.nombreEstado = "En Mantenimiento";
    }

    /**
     * Sobrescribe el método base: Permite finalizar el mantenimiento del vehículo.
     *
     * 1. Verifica que se haya cumplido el tiempo mínimo de mantenimiento (delegado al objeto Mantenimiento).
     * 2. Registra el fin del mantenimiento en el objeto Mantenimiento, incluyendo el costo y el kilometraje final.
     * 3. Cambia el estado del Vehículo a 'EstadoDisponible'.
     *
     * @param vehiculo - El vehículo al que se le está finalizando el mantenimiento.
     * @param costo - El costo total incurrido por el mantenimiento.
     * @param fechaFin - La fecha en la que finaliza el mantenimiento.
     * @throws {Error} Si no se ha cumplido el tiempo mínimo requerido para la finalización del mantenimiento.
     */
    public finalizarMantenimiento(vehiculo: Vehiculo, costo: number, fechaFin: Date): void {

        if (!vehiculo.getMantenimiento().puedeFinalizar(fechaFin)) {
            throw new Error("No se puede finalizar. Aún no se ha cumplido el tiempo mínimo de 24 horas de mantenimiento.");
        }
        let kmFinal = vehiculo.getKilometrajeTotal()
        vehiculo.getMantenimiento().finalizarRegistroMantenimiento(costo, fechaFin, kmFinal);

        vehiculo.setEstado(new EstadoDisponible());
        console.log(`Vehículo ${vehiculo.getMatricula()} se encuentra nuevamente disponible.`)
    }
}