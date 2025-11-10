import { Vehiculo } from "../vehiculo";
import { EstadoBase } from "./estadoBase";
import { EstadoDisponible } from "./estadoDisponible";


export class EstadoEnMantenimiento extends EstadoBase {
    constructor() {
        super()
        this.nombreEstado = "En Mantenimiento";
    }

    public finalizarMantenimiento(vehiculo: Vehiculo, costo: number, fechaFin: Date): void {

        if (!vehiculo.getMantenimiento().puedeFinalizar(fechaFin)) {
            throw new Error("No se puede finalizar. Aún no se ha cumplido el tiempo mínimo de 24 horas de mantenimiento.");
        }
        let kmFinal = vehiculo.getKilometrajeTotal()
        vehiculo.getMantenimiento().finalizarRegistroMantenimiento(costo, fechaFin, kmFinal);

        vehiculo.setEstado(new EstadoDisponible());
        console.log(`Vehículo ${vehiculo.getMatricula()} se encuentra nuevamente disponible.`)
    }

}