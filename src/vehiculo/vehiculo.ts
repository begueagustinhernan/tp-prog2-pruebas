import { Tarifa } from "../tarifa/tarifa";
import { Mantenimiento } from "../mantenimiento";
import { IEstadoVehiculo } from "./estados/iEstadoVehiculo";
import Cliente from "../cliente";
import Reserva from "../reserva";
import { GestorFlota } from "../reportes/gestorFlota";

/**
 * Clase abstracta que representa la base de cualquier vehículo de la flota de alquiler.
 *
 * Implementa el patrón State (Estado) mediante la interfaz IEstadoVehiculo para
 * delegar las acciones de negocio (alquilar, devolver, mantenimiento) al estado actual
 * del vehículo.
 *
 * Este vehículo se auto-registra en el GestorFlota al ser instanciado (Patrón Singleton).
 * Las clases concretas deben heredar de esta clase para definir la tarifa específica.
 * @abstract
 */
export abstract class Vehiculo {

    /**
     * Historial de las reservas finalizadas de este vehículo.
     * @protected
     * @type {Reserva[]}
     */
    protected historialReservas: Reserva[] = [];

    /**
     * Identificador único del vehículo.
     * @protected
     * @type {string}
     */
    protected matricula: string;

    /**
     * Marca del vehículo.
     * @protected
     * @type {string}
     */
    protected marca: string;

    /**
     * Modelo específico del vehículo.
     * @protected
     * @type {string}
     */
    protected modelo: string;

    /**
     * El estado actual del vehículo (ej. Disponible, EnAlquiler, EnMantenimiento).
     * Implementa el Patrón State.
     * @protected
     * @type {IEstadoVehiculo}
     */
    protected estado: IEstadoVehiculo;

    /**
     * Kilometraje total acumulado del vehículo.
     * @protected
     * @type {number}
     */
    protected kilometrajeTotal: number = 0;

    /**
     * Objeto que gestiona el historial y los detalles del mantenimiento del vehículo.
     * @protected
     * @type {Mantenimiento}
     */
    protected mantenimiento: Mantenimiento;

    /**
         * Objeto de la Estrategia de Tarifa.
         * Define el algoritmo específico para calcular el costo de la reserva segun el tipo de vehiculo instanciado
         * 
         * @protected
         * @type {Tarifa}
         */
    protected tarifa: Tarifa;

    /**
     * Crea una nueva instancia de un Vehículo e inmediatamente lo añade al GestorFlota.
     *
     * @param matricula - Matrícula única del vehículo.
     * @param marca - La marca del vehículo.
     * @param modelo - El modelo específico del vehículo.
     * @param estado - El estado inicial en el que se encuentra el vehículo.
     * @param mantenimiento - El gestor de mantenimiento asociado al vehículo.
     * @param tarifa - **(Estrategia)** El objeto Tarifa que contiene la lógica para calcular el costo de la reserva.
     */
    constructor(
        matricula: string,
        marca: string,
        modelo: string,
        estado: IEstadoVehiculo,
        mantenimiento: Mantenimiento,
        tarifa: Tarifa
    ) {
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        this.estado = estado;
        this.mantenimiento = mantenimiento;
        this.tarifa = tarifa;

        const gestorFlota = GestorFlota.getInstance();
        gestorFlota.agregarVehiculo(this);
    }

    /**
     * Obtiene el historial completo de reservas finalizadas del vehículo.
     * @returns {Reserva[]} Un array de objetos Reserva.
     */
    public getHistorialReservas(): Array<Reserva> {
        return this.historialReservas;
    }

    /**
     * Obtiene la matrícula del vehículo.
     * @returns {string} La matrícula.
     */
    public getMatricula(): string {
        return this.matricula;
    }

    /**
     * Obtiene la marca del vehículo.
     * @returns {string} La marca.
     */
    public getMarca(): string {
        return this.marca;
    }

    /**
     * Obtiene el modelo del vehículo.
     * @returns {string} El modelo.
     */
    public getModelo(): string {
        return this.modelo;
    }

    /**
     * Obtiene el objeto que representa el estado actual del vehículo.
     * @returns {IEstadoVehiculo} La instancia del estado actual.
     */
    public getEstado(): IEstadoVehiculo {
        return this.estado;
    }

    /**
     * Obtiene el kilometraje total acumulado del vehículo.
     * @returns {number} El kilometraje total.
     */
    public getKilometrajeTotal(): number {
        return this.kilometrajeTotal;
    }

    /**
     * Obtiene el gestor de mantenimiento asociado al vehículo.
     * @returns {Mantenimiento} El objeto Mantenimiento.
     */
    public getMantenimiento(): Mantenimiento {
        return this.mantenimiento;
    }

    /**
     * Obtiene la tarifa asociada al vehículo.
     * @returns {Tarifa} El objeto Tarifa.
     */
    public getTarifa(): Tarifa {
        return this.tarifa;
    }

    /**
     * Agrega una nueva reserva al historial del vehículo.
     * @param reserva - La reserva que se añade al historial.
     */
    public setHistorialReservas(reserva: Reserva): void {
        this.historialReservas.push(reserva);
    }

    /**
     * Cambia el objeto de estado actual del vehículo.
     * @param estado - La nueva instancia de estado del vehículo.
     */
    public setEstado(estado: IEstadoVehiculo): void {
        this.estado = estado;
    }

    /**
     * Actualiza el kilometraje total acumulado del vehículo.
     * @param kmTotal - El nuevo valor del kilometraje total.
     */
    public setKilometrajeTotal(kmTotal: number) {
        this.kilometrajeTotal = kmTotal;
    }

    /**
     * Intenta iniciar el proceso de alquiler del vehículo.
     *
     * La lógica de si la operación es válida (si el estado es 'Disponible')
     * es delegada al objeto IEstadoVehiculo actual.
     *
     * @param cliente - El cliente que realiza el alquiler.
     * @param fechaInicio - Fecha de inicio de la reserva.
     * @param fechaFin - Fecha de fin de la reserva.
     */
    public alquilar(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        this.getEstado().alquilar(this, cliente, fechaInicio, fechaFin);
    }

    /**
     * Intenta finalizar una reserva y devolver el vehículo.
     *
     * La lógica de la devolución (si el estado es 'EnAlquiler')
     * es delegada al objeto IEstadoVehiculo actual.
     */
    public devolver() {
        this.getEstado().devolver(this);
    }

    /**
     * Intenta enviar el vehículo a mantenimiento.
     *
     * La lógica de la transición (si el estado es 'Disponible' o 'EnAlquiler')
     * es delegada al objeto IEstadoVehiculo actual.
     *
     * @param fechaInicio - Fecha en la que comienza el mantenimiento.
     */
    public iniciarMantenimiento(fechaInicio: Date) {
        this.getEstado().iniciarMantenimiento(this, fechaInicio);
    }

    /**
     * Intenta finalizar el mantenimiento del vehículo.
     *
     * La lógica de la transición (si el estado es 'EnMantenimiento')
     * es delegada al objeto IEstadoVehiculo actual.
     *
     * @param costo - El costo total del mantenimiento realizado.
     * @param fechaFin - La fecha en la que finaliza el mantenimiento.
     */
    public finalizarMantenimiento(costo: number, fechaFin: Date) {
        this.getEstado().finalizarMantenimiento(this, costo, fechaFin);
    }
}