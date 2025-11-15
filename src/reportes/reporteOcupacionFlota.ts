import DateUtils from "../dateutils";
import { ReporteBase } from "./reporteBase";

export class ReporteOcupacionFlota extends ReporteBase {

    private fechaInicio: Date;
    private fechaFin: Date;

    constructor(fechaInicio: Date, fechaFin: Date) {
        super();
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.titulo = "Ocupación de la Flota"

    }

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

