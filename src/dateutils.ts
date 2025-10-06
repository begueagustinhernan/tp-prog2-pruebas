export default class DateUtils {

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