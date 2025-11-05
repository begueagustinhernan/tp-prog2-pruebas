import { Vehiculo } from "./vehiculo";
import { Tarifa } from "../tarifa/tarifa";
import { IEstadoVehiculo } from "./estados/iEstadoVehiculo";

export class SUV extends Vehiculo {

    constructor(
        matricula: string,
        marca: string,
        modelo: string,
        estado: IEstadoVehiculo,
        tarifa: Tarifa
    ) {
        super(matricula, marca, modelo, estado, tarifa); //aca falta estado y tarifa 
    }
}