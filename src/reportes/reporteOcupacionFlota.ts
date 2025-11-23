import DateUtils from "../dateutils";
import { ReporteBase } from "./reporteBase";

/**
 * Reporte concreto que calcula el porcentaje de **ocupación de la flota**
 * dentro de un período de tiempo especificado.
 *
 * El cálculo se basa en la proporción entre los días totales en que los vehículos
 * estuvieron alquilados y los días totales en que pudieron haber estado disponibles
 * (número de vehículos * días del período).
 */
export class ReporteOcupacionFlota extends ReporteBase {

    /**
     * Fecha de inicio del período de tiempo a analizar para el reporte.
     * @private
     * @type {Date}
     */
    private fechaInicio: Date;

    /**
     * Fecha de finalización del período de tiempo a analizar para el reporte.
     * @private
     * @type {Date}
     */
    private fechaFin: Date;

    /**
     * Crea una nueva instancia del reporte de Ocupación de la Flota.
     *
     * @param fechaInicio - El límite inferior del rango de fechas.
     * @param fechaFin - El límite superior del rango de fechas.
     */
    constructor(fechaInicio: Date, fechaFin: Date) {
        super();
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.titulo = "Ocupación de la Flota"
    }

    /**
     * Sobrescribe el método base: Contiene la lógica para calcular y mostrar la
     * ocupación de la flota en el período especificado.
     *
     * @protected
     * @throws {Error} Si no hay vehículos en la flota o si el período de días es inválido o negativo.
     */
    protected ejecutarCalculoReporte(): void {
        const vehiculos = this.gestorFlota.getVehiculos();
        const totalVehiculos = vehiculos.length;
        const periodoDias = DateUtils.obtenerDiasDuracion(this.fechaInicio, this.fechaFin);

        if (totalVehiculos === 0 || periodoDias <= 0) {
            throw new Error(`Acción inválida: No hay vehículos o el período es inválido.`);
        }

        let sumaDiasAlquiladoFlota = 0;
        console.log(`--- Periodo Analizado: [${this.fechaInicio.toLocaleDateString} - ${this.fechaInicio.toLocaleDateString}] - Dias: ${periodoDias} ---`);

        for (const vehiculo of vehiculos) {
            let diasAlquiladosVehiculo = 0;

            for (const reserva of vehiculo.getHistorialReservas()) {
                const inicio = reserva.getFechaInicio() > this.fechaInicio ? reserva.getFechaInicio() : this.fechaInicio;
                const fin = reserva.getFechaFin() < this.fechaFin ? reserva.getFechaFin() : this.fechaFin;

                if (inicio < fin) {
                    diasAlquiladosVehiculo += DateUtils.obtenerDiasDuracion(inicio, fin);
                }
            }

            sumaDiasAlquiladoFlota += diasAlquiladosVehiculo;
        }
        const totalDiasDisponibles = totalVehiculos * periodoDias;
        const ocupacionFlota = (sumaDiasAlquiladoFlota / totalDiasDisponibles) * 100;

        console.log(`--- Ocupacion de Flota: El **${ocupacionFlota.toFixed(2)}% de la flota estaba En Alquiler ---`);
    }
}

