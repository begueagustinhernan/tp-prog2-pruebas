import { RegistroMantenimiento } from "./registroMantenimiento";

/**
 * Umbrales de disparo para el mantenimiento.
 */
const KM_DISPARADOR: number = 10000;
const MESES_DISPARADOR: number = 12;
const ALQUILERES_DISPARADOR: number = 5;
const HORAS_MANTENIMIENTO: number = 24;

/**
 * Clase responsable de gestionar el ciclo de vida del mantenimiento de un vehículo
 * y aplicar las reglas de negocio para determinar si se necesita un servicio.
 *
 * Mantiene un historial de servicios y el estado actual del último mantenimiento.
 */
export class Mantenimiento {

    /**
     * Kilómetros registrados en el momento del último mantenimiento completado.
     * @private
     * @type {number}
     */
    private kmUltimoMantenimiento: number;

    /**
     * Fecha en la que se completó el último mantenimiento.
     * @private
     * @type {Date}
     */
    private fechaUltimoMantenimiento: Date;

    /**
     * Fecha en la que se inició el mantenimiento actual. Nulo si el vehículo no está en mantenimiento.
     * @private
     * @type {Date | null}
     */
    private fechaInicioMantenimientoActual: Date | null;

    /**
     * Fecha de finalización estimada basada en el tiempo mínimo requerido.
     * @private
     * @type {Date | null}
     */
    private fechaEstimadaFin: Date | null;

    /**
     * Contador de cuántos alquileres se han completado desde el último mantenimiento.
     * @private
     * @type {number}
     */
    private cantidadAlquileres: number;

    /**
     * Lista de registros de mantenimientos históricos completados.
     * @private
     * @type {RegistroMantenimiento[]}
     */
    private historialMantenimientos: RegistroMantenimiento[];

    /**
     * Inicializa los contadores de mantenimiento al estado base (asumiendo un mantenimiento inicial).
     */
    constructor() {
        this.kmUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.fechaInicioMantenimientoActual = null;
        this.fechaEstimadaFin = null;
        this.cantidadAlquileres = 0;
        this.historialMantenimientos = [];
    }

    /**
     * Obtiene el kilometraje registrado en el momento del último servicio de mantenimiento.
     * @returns {number} Kilómetros del último mantenimiento.
     */
    public getKmUltimoMantenimiento(): number {
        return this.kmUltimoMantenimiento;
    }

    /**
     * Obtiene la fecha en la que finalizó el último servicio de mantenimiento.
     * @returns {Date} Fecha del último mantenimiento.
     */
    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    /**
     * Obtiene la fecha de inicio del mantenimiento actual, si el vehículo está en servicio.
     * @returns {Date | null} Fecha de inicio, o null.
     */
    public getFechaInicioMantenimientoActual(): Date | null {
        return this.fechaInicioMantenimientoActual;
    }

    /**
     * Obtiene la fecha estimada de finalización del mantenimiento actual.
     * @returns {Date | null} Fecha estimada de fin, o null.
     */
    public getFechaEstimadaFin(): Date | null {
        return this.fechaEstimadaFin;
    }

    /**
     * Obtiene el número de alquileres completados desde el último servicio.
     * @returns {number} Cantidad de alquileres.
     */
    public getCantidadAlquileres(): number {
        return this.cantidadAlquileres;
    }

    /**
     * Obtiene el historial completo de todos los mantenimientos registrados.
     * @returns {RegistroMantenimiento[]} Array de registros históricos.
     */
    public getHistorialMantenimientos(): RegistroMantenimiento[] {
        return this.historialMantenimientos;
    }

    /**
     * Establece el kilometraje del vehículo al finalizar un mantenimiento.
     * @param kms - Nuevo kilometraje del último mantenimiento.
     */
    public setKmUltimoMantenimiento(kms: number) {
        this.kmUltimoMantenimiento = kms;
    }

    /**
     * Establece la fecha de finalización de un servicio de mantenimiento.
     * @param fecha - Nueva fecha del último mantenimiento.
     */
    public setFechaUltimoMantenimiento(fecha: Date) {
        this.fechaUltimoMantenimiento = fecha;
    }

    /**
     * Establece la fecha de inicio del mantenimiento actual.
     * @param fecha - Fecha de inicio del servicio.
     */
    public setFechaInicioMantenimiento(fecha: Date) {
        this.fechaInicioMantenimientoActual = fecha;
    }

    /**
     * Establece la fecha estimada de finalización del mantenimiento actual.
     * @param fecha - Fecha estimada de finalización.
     */
    public setFechaEstimadaFin(fecha: Date) {
        this.fechaEstimadaFin = fecha;
    }

    /**
     * Establece manualmente el contador de alquileres.
     * @param alquileres - Nueva cantidad de alquileres completados.
     */
    public setCantidadAlquileres(alquileres: number) {
        this.cantidadAlquileres = alquileres;
    }

    /**
     * Incrementa en uno el contador de alquileres completados.
     */
    public registrarAlquilerCompletado(): void {
        this.cantidadAlquileres++;;
    }

    /**
     * Verifica si el vehículo necesita mantenimiento basándose en los umbrales
     * predefinidos de Kilometraje.
     *
     * @param kmActual - El kilometraje total actual del vehículo.
     * @returns {boolean} True si se cumple alguna de las condiciones de disparo.
     */
    public verificarNecesidadMantenimiento(kmActual: number): boolean {
        const kmsRecorridos = kmActual - this.getKmUltimoMantenimiento();

        if (kmsRecorridos > KM_DISPARADOR) {
            console.log(`Disparador por Kilometraje! Kilometros recorridos: ${kmsRecorridos}km`);
            return true;
        }

        if (this.getCantidadAlquileres() > ALQUILERES_DISPARADOR) {
            console.log(`Disparador por Alquileres! Cantidad alquileres: ${this.getCantidadAlquileres()}`);
            return true;
        }

        const diferenciaMilisegundos = new Date().getTime() - this.getFechaUltimoMantenimiento().getTime();
        const diferenciaMeses = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 30.4375);

        if (diferenciaMeses >= MESES_DISPARADOR) {
            console.log(`Disparador por Tiempo! Cantidad de meses sin mantenimiento: ${diferenciaMeses}`);
            return true;
        }

        return false;
    }

    /**
     * Inicia el registro de un nuevo ciclo de mantenimiento.
     *
     * Establece la fecha de inicio del mantenimiento actual y calcula la fecha
     * estimada de finalización (24 horas después).
     *
     * @param fechaInicio - La fecha en la que se inicia el servicio de mantenimiento.
     */
    public iniciarRegistroMantenimiento(fechaInicio: Date): void {
        this.setFechaInicioMantenimiento(fechaInicio);

        const fechaFinMilisegundos = fechaInicio.getTime() + (HORAS_MANTENIMIENTO * 60 * 60 * 1000);
        this.setFechaEstimadaFin(new Date(fechaFinMilisegundos));
    }

    /**
     * Verifica si se puede finalizar el mantenimiento, asegurando que se haya
     * cumplido el tiempo mínimo de servicio (24 horas) desde la hora de inicio.
     *
     * @param fechaActual - La fecha y hora actual que se está comparando.
     * @returns {boolean} True si la fecha actual es igual o posterior a la fecha estimada de fin.
     */
    public puedeFinalizar(fechaActual: Date): boolean {
        const fechaFin = this.getFechaEstimadaFin();
        if (!fechaFin) {
            return false;
        }
        else {
            return fechaActual.getTime() >= fechaFin.getTime();
        }
    }

    /**
     * Finaliza el mantenimiento actual, crea un nuevo RegistroMantenimiento en el historial
     * y reinicia los contadores de mantenimiento.
     *
     * @param costo - El costo total del servicio de mantenimiento.
     * @param fechaFin - La fecha en la que se completa el servicio.
     * @param kmFinal - El kilometraje del vehículo al finalizar el mantenimiento.
     * @throws {Error} Si se intenta finalizar sin haber iniciado el registro previamente.
     */
    public finalizarRegistroMantenimiento(costo: number, fechaFin: Date, kmFinal: number): void {
        if (!this.fechaInicioMantenimientoActual) {
            throw new Error("No se puede finalizar el mantenimiento sin un registro de inicio.");
        }

        const nuevoRegistro = new RegistroMantenimiento(
            kmFinal,
            this.fechaInicioMantenimientoActual,
            fechaFin,
            costo,
            "Mantenimiento Programado"
        );

        this.historialMantenimientos.push(nuevoRegistro);

        this.setKmUltimoMantenimiento(kmFinal);
        this.setFechaUltimoMantenimiento(fechaFin);
        this.setCantidadAlquileres(0);

        this.fechaInicioMantenimientoActual = null;

        console.log(`Mantenimiento finalizado. Nuevo punto de referencia: ${kmFinal}km`);
    }
}