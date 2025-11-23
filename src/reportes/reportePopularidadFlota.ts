import { ReporteBase } from "./reporteBase";
import { Vehiculo } from "../vehiculo/vehiculo";

/**
 * Reporte concreto que calcula la **popularidad de los vehículos**
 * de la flota basándose en el número de reservas registradas.
 */
export class ReportePopularidadFlota extends ReporteBase {

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
     * Crea una nueva instancia del reporte de Popularidad de la Flota.
     * El título se inicializa para reflejar el objetivo del reporte.
     *
     * @param fechaInicio - El límite inferior del rango de fechas.
     * @param fechaFin - El límite superior del rango de fechas.
     */
    constructor(fechaInicio: Date, fechaFin: Date) {
        super();
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.titulo = "Popularidad de la Flota - Vehiculo mas y menos alquilado";
    }

    /**
     * Sobrescribe el método base: Contiene la lógica para calcular la popularidad
     * de los vehículos y mostrar los resultados.
     *
     * 1. Recorre la flota.
     * 2. Filtra el historial de reservas de cada vehículo, contando solo aquellas
     * cuya fecha de finalización está dentro del rango [`fechaInicio`, `fechaFin`].
     * 3. Mantiene un seguimiento del vehículo con el conteo máximo y mínimo de alquileres.
     *
     * @protected
     * @throws {Error} Si la flota de vehículos está vacía.
     */
    protected ejecutarCalculoReporte(): void {
        const vehiculos = this.gestorFlota.getVehiculos();

        if (vehiculos.length === 0) {
            throw new Error(`Acción inválida: La flota esta vacia.`);
        }

        const conteoAlquileres = new Map<Vehiculo, number>();
        let masAlquilado: { vehiculo: Vehiculo | null, conteo: number } = { vehiculo: null, conteo: -1 };
        let menosAlquilado: { vehiculo: Vehiculo | null, conteo: number } = { vehiculo: null, conteo: 999 };

        console.log(`--- Periodo Analizado: [${this.fechaInicio.toLocaleDateString} - ${this.fechaInicio.toLocaleDateString}] ---`);

        for (const vehiculo of vehiculos) {

            const cuentaAlquileres = vehiculo.getHistorialReservas().filter(reserva => {
                return reserva.getFechaFin() >= this.fechaInicio && reserva.getFechaFin() <= this.fechaFin;
            }).length;

            conteoAlquileres.set(vehiculo, cuentaAlquileres);

            if (cuentaAlquileres > masAlquilado.conteo) {
                masAlquilado = { vehiculo, conteo: cuentaAlquileres };
            }

            if (cuentaAlquileres < menosAlquilado.conteo) {
                menosAlquilado = { vehiculo, conteo: cuentaAlquileres };
            }
        }

        console.log(`--- Vehículo Mas Alquilado: Matricula '${masAlquilado.vehiculo?.getMatricula() ?? ''}' con ${masAlquilado.conteo} alquileres ---`);
        console.log(`--- Vehículo Menos Alquilado: Matricula '${menosAlquilado.vehiculo?.getMatricula() ?? ''}' con ${menosAlquilado.conteo} alquileres ---`);
    }
}