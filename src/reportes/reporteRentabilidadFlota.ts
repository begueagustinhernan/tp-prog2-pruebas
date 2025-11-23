import { ReporteBase } from "./reporteBase";
import { Vehiculo } from "../vehiculo/vehiculo";

/**
 * Reporte concreto que calcula la **rentabilidad neta** de cada vehículo
 * de la flota (Patrón Template Method).
 *
 * La rentabilidad se define como: (Ingresos Totales por Alquiler) - (Costos Totales de Mantenimiento).
 * Identifica y muestra el vehículo con la mayor y la menor rentabilidad neta.
 */
export class ReporteRentabilidadFlota extends ReporteBase {

    /**
     * Crea una nueva instancia del reporte de Rentabilidad de la Flota.
     * El título se inicializa para reflejar el objetivo del reporte.
     */
    constructor() {
        super();
        this.titulo = "Rentabilidad de la Flota - Vehiculo con mayor y menor rentabilidad";
    }

    /**
     * Sobrescribe el método base: Contiene la lógica para calcular y mostrar
     * la rentabilidad neta de la flota.
     *
     * 1. Suma el costo total de todas las reservas en el historial (Ingresos).
     * 2. Suma el costo de todos los registros de mantenimiento (Costos).
     * 3. Calcula la Rentabilidad Neta = Ingresos - Costos.
     * 4. Identifica los vehículos con la rentabilidad máxima y mínima.
     *
     * @protected
     * @throws {Error} Si la flota de vehículos está vacía.
     */
    protected ejecutarCalculoReporte(): void {
        const vehiculos = this.gestorFlota.getVehiculos();

        if (vehiculos.length === 0) {
            throw new Error(`Acción inválida: La flota esta vacia.`);
        }

        const rentabilidad = new Map<Vehiculo, number>();
        let mayorRentabilidad: Vehiculo | null = null;
        let menorRentabilidad: Vehiculo | null = null;

        let maxRentabilidad = -Infinity;
        let minRentabilidad = Infinity;

        for (const vehiculo of vehiculos) {
            const ingresosTotales = vehiculo.getHistorialReservas().reduce((sum, reserva) => sum + reserva.obtenerCostoTotal(), 0);

            const costosMantenimiento = vehiculo.getMantenimiento().getHistorialMantenimientos().reduce((sum, registro) => sum + registro.getCosto(), 0);

            const rentabilidadNeta = ingresosTotales - costosMantenimiento;
            rentabilidad.set(vehiculo, rentabilidadNeta);

            if (rentabilidadNeta > maxRentabilidad) {
                maxRentabilidad = rentabilidadNeta;
                mayorRentabilidad = vehiculo;
            }
            if (rentabilidadNeta < minRentabilidad) {
                minRentabilidad = rentabilidadNeta;
                menorRentabilidad = vehiculo;
            }
        }

        console.log(`--- Vehículo con Mayor Rentabilidad: Matricula '${mayorRentabilidad?.getMatricula() ?? ''}' con $${maxRentabilidad.toFixed(2)} ---`);
        console.log(`--- Vehículo con Menor Rentabilidad: Matricula '${menorRentabilidad?.getMatricula() ?? ''}' con $${minRentabilidad.toFixed(2)} ---`);
    }

}