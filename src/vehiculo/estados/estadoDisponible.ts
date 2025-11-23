import { Vehiculo } from '../vehiculo';
import Kilometraje from '../../kilometraje';
import Cliente from '../../cliente';
import Reserva from '../../reserva';
import { EstadoBase } from './estadoBase';
import { EstadoEnAlquiler } from './estadoEnAlquiler';
import { EstadoEnMantenimiento } from './estadoEnMantenimiento';

/**
 * Implementación del estado que indica que el vehículo está **Disponible** para ser alquilado.
 *
 * En este estado, el vehículo permite las transiciones a:
 * 1. EstadoEnAlquiler (a través de alquilar).
 * 2. EstadoEnMantenimiento (a través de iniciarMantenimiento).
 *
 * Las acciones de 'devolver' y 'finalizarMantenimiento' no son válidas y heredan
 * el comportamiento de lanzar excepción de la clase EstadoBase.
 */
export class EstadoDisponible extends EstadoBase {

    /**
     * Crea una nueva instancia del estado Disponible y establece su nombre.
     */
    constructor() {
        super()
        this.nombreEstado = "Disponible";
    }

    /**
     * Sobrescribe el método base: Permite que el vehículo sea alquilado.
     *
     * 1. Crea una nueva instancia de Reserva y Kilometraje.
     * 2. Asocia la nueva reserva al Cliente.
     * 3. Cambia el estado del Vehículo a 'EstadoEnAlquiler'.
     *
     * @param vehiculo - El vehículo que está siendo alquilado.
     * @param cliente - El cliente que realiza la reserva.
     * @param fechaInicio - Fecha de inicio de la reserva.
     * @param fechaFin - Fecha de fin de la reserva.
     */
    public alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {

        console.log(`Alquilando vehiculo con matricula: (${vehiculo.getMatricula()})`);

        const nuevaReserva = new Reserva(
            fechaInicio,
            fechaFin,
            new Kilometraje(),
            vehiculo,
            cliente
        );

        cliente.setReserva(nuevaReserva);
        vehiculo.setEstado(new EstadoEnAlquiler(nuevaReserva));
        console.log(`Vehiculo '${vehiculo.getMatricula()}' alquilado con exito.`);
    }

    /**
     * Sobrescribe el método base: Permite que el vehículo inicie el mantenimiento.
     *
     * 1. Registra el inicio del mantenimiento en el objeto Mantenimiento del vehículo.
     * 2. Cambia el estado del Vehículo a 'EstadoEnMantenimiento'.
     *
     * @param vehiculo - El vehículo que va a mantenimiento.
     * @param fechaInicio - Fecha en la que comienza el mantenimiento.
     */
    public iniciarMantenimiento(vehiculo: Vehiculo, fechaInicio: Date): void {
        vehiculo.getMantenimiento().iniciarRegistroMantenimiento(fechaInicio);
        vehiculo.setEstado(new EstadoEnMantenimiento());
        console.log(`Vehiculo '${vehiculo.getMatricula()}' enviado a mantenimiento.`);
    }
}

