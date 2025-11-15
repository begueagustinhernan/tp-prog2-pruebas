import { ReporteBase } from "./reporteBase";
import { Vehiculo } from "../vehiculo/vehiculo";

export class ReporteRentabilidadFlora extends ReporteBase {

    constructor() {
        super();
        this.titulo = "Rentabilidad de la Flota - Vehiculo con mayor y menor rentabilidad";
    }

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