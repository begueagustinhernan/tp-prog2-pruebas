import Kilometraje from "./kilometraje";
import { Vehiculo } from "./vehiculo/vehiculo";
import Cliente from "./cliente";
import DateUtils from "./dateutils";
import GestorTemporadas from "./temporadas/gestorTemporadas";
import { IEstrategiaTarifaTemporada } from "./temporadas/iEstrategiaTarifaTemporada";


/**
 * Clase que representa una reserva de un vehículo.
 *
 * Contiene toda la información necesaria del alquiler: fechas, vehículo, cliente
 * y los datos de kilometraje. Es responsable de obtener el costo total de la reserva
 * aplicando la estrategia de tarifa de temporada adecuada.
 */
export default class Reserva {

    /**
     * Fecha en la que comienza la reserva.
     * @private
     * @type {Date}
     */
    private fechaInicio: Date;

    /**
     * Fecha en la que finaliza la reserva.
     * @private
     * @type {Date}
     */
    private fechaFin: Date;

    /**
     * Objeto que registra los kilómetros recorridos día a día durante la reserva.
     * @private
     * @type {Kilometraje}
     */
    private kilometraje: Kilometraje;

    /**
     * El vehículo que ha sido alquilado en esta reserva.
     * @private
     * @type {Vehiculo}
     */
    private vehiculo: Vehiculo;

    /**
     * El cliente asociado a esta reserva.
     * @private
     * @type {Cliente}
     */
    private cliente: Cliente;

    /**
     * Crea una nueva instancia de la clase Reserva.
     *
     * @param {Date} fechaInicio - La fecha y hora de inicio de la reserva.
     * @param {Date} fechaFin - La fecha y hora de finalización de la reserva.
     * @param {Kilometraje} kilometraje - Objeto que contendrá el registro de kilómetros durante el alquiler.
     * @param {Vehiculo} vehiculo - El vehículo específico que se está reservando.
     * @param {Cliente} cliente - El cliente que realiza la reserva.
     */
    constructor(fechaInicio: Date, fechaFin: Date, kilometraje: Kilometraje, vehiculo: Vehiculo, cliente: Cliente) {
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.kilometraje = kilometraje;
        this.vehiculo = vehiculo;
        this.cliente = cliente;
    }

    /**
     * Obtiene la fecha de inicio de la reserva.
     * @returns {Date} La fecha de inicio.
     */
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /**
     * Obtiene la fecha de finalización de la reserva.
     * @returns {Date} La fecha de fin.
     */
    public getFechaFin(): Date {
        return this.fechaFin;
    }

    /**
     * Obtiene el objeto Kilometraje asociado a la reserva.
     * @returns {Kilometraje} El objeto que gestiona los kilómetros recorridos.
     */
    public getKilometraje(): Kilometraje {
        return this.kilometraje;
    }

    /**
     * Obtiene el vehículo asociado a esta reserva.
     * @returns {Vehiculo} El objeto Vehiculo.
     */
    public getVehiculo(): Vehiculo {
        return this.vehiculo;
    }

    /**
     * Obtiene el cliente asociado a esta reserva.
     * @returns {Cliente} El objeto Cliente.
     */
    public getCliente(): Cliente {
        return this.cliente;
    }

    /**
     * Calcula y obtiene el costo total de la reserva.
     *
     * 1. Determina la duración total en días.
     * 2. Obtiene la estrategia de tarifa de temporada basada en la fecha de inicio.
     * 3. Aplica la estrategia de temporada a la tarifa del vehículo.
     * 4. Llama al método `calcularCosto` de la tarifa del vehículo para obtener el total.
     *
     * @returns {number} El costo final total de la reserva.
     */
    public obtenerCostoTotal(): number {
        const duracion = DateUtils.obtenerDiasDuracion(this.getFechaInicio(), this.getFechaFin());
        const kilometraje = this.getKilometraje();
        const estrategia: IEstrategiaTarifaTemporada = GestorTemporadas.obtenerEstrategia(this.getFechaInicio());

        this.getVehiculo().getTarifa().setEstrategiaTemporada(estrategia);

        const costoTotal = this.getVehiculo().getTarifa().calcularCosto(duracion, kilometraje);
        return costoTotal;
    }
}

