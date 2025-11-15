import { ReporteBase } from "./reporteBase";
import { Vehiculo } from "../vehiculo/vehiculo";

export class ReportePopularidadFlota extends ReporteBase {

    private fechaInicio: Date;
    private fechaFin: Date;

    constructor(fechaInicio: Date, fechaFin: Date) {
        super();
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.titulo = "Popularidad de la Flota - Vehiculo mas y menos alquilado";
    }

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