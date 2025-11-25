import { EstadoBase } from './estadoBase';
import { Vehiculo } from '../vehiculo';
import Reserva from '../../reserva';
import { EstadoDisponible } from './estadoDisponible';
import { EstadoEnMantenimiento } from './estadoEnMantenimiento';

/**
 * Implementación del estado que indica que el vehículo está **En Alquiler**.
 *
 * En este estado, la acción principal permitida `devolver` un vehículo.
 * También se permite la transición directa a 'EstadoEnMantenimiento' en casos excepcionales.
 * 
 * Las acciones de 'alquilar' y 'finalizarMantenimiento' no son válidas y heredan
 * el comportamiento de lanzar excepción de la clase EstadoBase.
 */
export class EstadoEnAlquiler extends EstadoBase {

    /**
     * Referencia a la reserva activa asociada al vehículo mientras está alquilado.
     * Crucial para realizar la devolución y calcular el costo.
     * @private
     * @type {Reserva}
     */
    private reservaActual: Reserva;

    /**
     * Crea una nueva instancia del estado EnAlquiler, asociándola a la reserva actual.
     *
     * @param reserva - La instancia de Reserva que está actualmente activa para este vehículo.
     */
    constructor(reserva: Reserva) {
        super();
        this.reservaActual = reserva;
        this.nombreEstado = "En Alquiler";
    }

    /**
     * Sobrescribe el método base: Permite la devolución del vehículo, finalizando la reserva.
     *
     * **Proceso de Devolución:**
     * 1. Calcula el costo final de la reserva usando la Tarifa.
     * 2. Calcula los kilómetros totales recorridos en la reserva y actualiza el Kilometraje Total del Vehículo.
     * 3. Registra la reserva finalizada en el historial del vehículo.
     * 4. Desasocia la reserva del Cliente.
     * 5. Llama al gestor de Mantenimiento para verificar si se disparan acciones post-alquiler.
     * 6. Si se activa la necesidad de mantenimiento, transiciona directamente a EstadoEnMantenimiento.
     * 7. Finalmente, cambia el estado del Vehículo a 'EstadoDisponible'.
     *
     * @param vehiculo - El vehículo que está siendo devuelto.
     * @throws {Error} Puede lanzar una excepción si no hay Kilometraje registrado en la Reserva.
     */
    public devolver(vehiculo: Vehiculo) {
        const costoTotal = this.reservaActual.obtenerCostoTotal()
        console.log(`Costo Total Reserva: $${costoTotal}`);

        let kilometrajeReserva = this.reservaActual.getKilometraje().calcularKmsTotalesRecorridos();
        console.log(`Kilometros Recorridos: ${kilometrajeReserva}km`);
        let kilometrajeTotal = vehiculo.getKilometrajeTotal();

        kilometrajeTotal += kilometrajeReserva;
        vehiculo.setKilometrajeTotal(kilometrajeTotal);

        vehiculo.setHistorialReservas(this.reservaActual);

        this.reservaActual.getCliente().desasociarReserva();

        const mantenimiento = vehiculo.getMantenimiento();
        mantenimiento.registrarAlquilerCompletado();

        if (mantenimiento.verificarNecesidadMantenimiento(vehiculo.getKilometrajeTotal())) {
            console.log("Disparador de mantenimiento activado.")

            vehiculo.iniciarMantenimiento(new Date());
        } else {
            
            vehiculo.setEstado(new EstadoDisponible());
            console.log(`Vehiculo '${vehiculo.getMatricula()}' devuelto con exito.`);
        }
    }

    /**
     * Sobrescribe el método base: Permite que el vehículo inicie el mantenimiento.
     * Esto puede ocurrir si se detecta un fallo durante el período de alquiler.
     *
     * 1. Registra el inicio del mantenimiento.
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