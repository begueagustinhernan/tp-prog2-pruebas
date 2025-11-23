import Reserva from "./reserva";

/**
 * Clase que representa a un cliente del servicio de alquiler de vehículos.
 *
 * Contiene la información personal del cliente y mantiene una asociación
 * con una reserva activa (si existe).
 */
export default class Cliente {

    /**
     * Identificador único del cliente.
     * @private
     * @type {number}
     */
    private idCliente: number;

    /**
     * Nombre del cliente.
     * @private
     * @type {string}
     */
    private nombre: string;

    /**
     * Apellido del cliente.
     * @private
     * @type {string}
     */
    private apellido: string;

    /**
     * Dirección de correo electrónico del cliente.
     * @private
     * @type {string}
     */
    private mail: string;

    /**
     * Número de teléfono de contacto.
     * @private
     * @type {number}
     */
    private telefono: number;

    /**
     * Reserva asociada actualmente a este cliente. Puede ser nula si no tiene una reserva activa.
     * @private
     * @type {(Reserva | null | undefined)}
     */
    private reserva?: Reserva | null;

    /**
     * Crea una nueva instancia de la clase Cliente.
     * * @param {number} idCliente - El identificador único del cliente.
     * @param {string} nombre - El nombre del cliente.
     * @param {string} apellido - El apellido del cliente.
     * @param {string} mail - El correo electrónico de contacto.
     * @param {number} telefono - El número de teléfono.
     * @param {Reserva} reserva - La reserva inicial asociada al cliente.
     */
    constructor(idCliente: number, nombre: string, apellido: string, mail: string, telefono: number, reserva: Reserva) {
        this.idCliente = idCliente;
        this.apellido = apellido;
        this.nombre = nombre;
        this.mail = mail;
        this.telefono = telefono;
        this.reserva = reserva;
    }

    /**
     * Obtiene el identificador único del cliente.
     * @returns {number} El ID del cliente.
     */
    public getIdCliente(): number {
        return this.idCliente;
    }

    /**
     * Obtiene el nombre del cliente.
     * @returns {string} El nombre.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Obtiene el apellido del cliente.
     * @returns {string} El apellido.
     */
    public getApellido(): string {
        return this.apellido;
    }

    /**
     * Obtiene el correo electrónico del cliente.
     * @returns {string} El mail.
     */
    public getMail(): string {
        return this.mail;
    }

    /**
     * Obtiene el número de teléfono del cliente.
     * @returns {number} El teléfono.
     */
    public getTelefono(): number {
        return this.telefono;
    }

    /**
     * Obtiene la reserva asociada al cliente.
     * @returns {Reserva} La reserva activa.
     * @throws {Error} Si no existe ninguna reserva asociada al cliente.
     */
    public getReserva(): Reserva | void {
        if (this.reserva)
            return this.reserva;
        else {
            throw new Error(`Acción inválida: No existen reservas asociadas al cliente ${this.getNombre()} ${this.getApellido()} con ID: ${this.getIdCliente()}`);
        }
    }

    /**
     * Asocia una nueva reserva al cliente, reemplazando cualquier reserva anterior.
     *
     * @param reserva - La nueva reserva a asociar.
     * @returns {void}
     */
    public setReserva(reserva: Reserva) {
        this.reserva = reserva
    }

    /**
     * Elimina la asociación de la reserva actual con este cliente (establece la reserva a `null`).
     */
    public desasociarReserva(): void {
        this.reserva = null;
    }
}
