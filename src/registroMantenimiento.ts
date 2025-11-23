/**
 * Clase que representa un registro de un servicio de mantenimiento
 * completado para un vehículo específico.
 *
 * Almacena toda la información relevante sobre el costo y el
 * alcance del servicio de mantenimiento.
 */
export class RegistroMantenimiento {

    /**
     * Kilometraje del vehículo al finalizar el servicio de mantenimiento.
     * @private
     * @type {number}
     */
    private kmFinal: number;

    /**
     * Fecha y hora en la que se inició el servicio de mantenimiento.
     * @private
     * @type {Date}
     */
    private fechaInicio: Date;

    /**
     * Fecha y hora en la que se completó el servicio de mantenimiento.
     * @private
     * @type {Date}
     */
    private fechaFin: Date;

    /**
     * Costo total del servicio de mantenimiento.
     * @private
     * @type {number}
     */
    private costo: number;

    /**
     * Breve descripción del tipo o alcance del mantenimiento realizado.
     * @private
     * @type {string}
     */
    private descripcion: string;

    /**
     * Crea una nueva instancia de un Registro de Mantenimiento.
     *
     * @param kmFinal - Kilometraje al finalizar el mantenimiento.
     * @param fechaInicio - Fecha de inicio del servicio.
     * @param fechaFin - Fecha de finalización del servicio.
     * @param costo - Costo total del servicio.
     * @param descripcion - Descripción del tipo de mantenimiento.
     */
    constructor(
        kmFinal: number,
        fechaInicio: Date,
        fechaFin: Date,
        costo: number,
        descripcion: string
    ) {
        this.kmFinal = kmFinal;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.costo = costo;
        this.descripcion = descripcion;
    }

    /**
     * Obtiene el kilometraje registrado al finalizar el mantenimiento.
     * @returns {number} Kilometraje final.
     */
    public getKmFinal(): number {
        return this.kmFinal;
    }

    /**
     * Obtiene la fecha en que se inició el mantenimiento.
     * @returns {Date} Fecha de inicio.
     */
    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    /**
     * Obtiene la fecha en que se completó el mantenimiento.
     * @returns {Date} Fecha de finalización.
     */
    public getFechaFin(): Date {
        return this.fechaFin;
    }

    /**
     * Obtiene el costo total del servicio de mantenimiento.
     * @returns {number} Costo.
     */
    public getCosto(): number {
        return this.costo;
    }

    /**
     * Obtiene la descripción del servicio de mantenimiento realizado.
     * @returns {string} Descripción del mantenimiento.
     */
    public getDescripcion(): string {
        return this.descripcion;
    }
}