import { Vehiculo } from "./vehiculo";
import { Tarifa } from "../tarifa/tarifa";
import { IEstadoVehiculo } from "./estados/iEstadoVehiculo";
import { Mantenimiento } from "../mantenimiento";

export class SUV extends Vehiculo {

    constructor(
        matricula: string,
        marca: string,
        modelo: string,
        estado: IEstadoVehiculo,
        mantenimiento: Mantenimiento,
        tarifa: Tarifa
    ) {
        super(matricula, marca, modelo, estado, mantenimiento, tarifa);
    }
}