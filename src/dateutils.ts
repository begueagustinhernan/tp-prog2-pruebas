/**
 * Utilidad para operaciones relacionadas con fechas.
 * Proporciona métodos estáticos para calcular diferencias entre días.
 */
export default class DateUtils {

    /**
     * Calcula la cantidad de días completos entre dos fechas.
     *
     * Normaliza ambas fechas a medianoche (UTC) para evitar errores por
     * diferencias horarias o zonas horarias.
     *
     * @param {Date} fechaInicio - Fecha de inicio.
     * @param {Date} fechaFin - Fecha de finalización.
     * @returns {number} Número de días entre ambas fechas.
     */
    static obtenerDiasDuracion(fechaInicio: Date, fechaFin: Date): number {
        const inicioNormalizadoMs: number = Date.UTC(
            fechaInicio.getFullYear(),
            fechaInicio.getMonth(),
            fechaInicio.getDate()
        );

        const finNormalizadoMs: number = Date.UTC(
            fechaFin.getFullYear(),
            fechaFin.getMonth(),
            fechaFin.getDate()
        );

        const milisegundos_por_dia = 86400000;
        const diferenciaDiasEnMilisegundos = finNormalizadoMs - inicioNormalizadoMs;
        return diferenciaDiasEnMilisegundos / milisegundos_por_dia;
    }

}