import { Vehiculo } from "./vehiculo";
import { Tarifa } from "../tarifa/tarifa";

export class SUV extends Vehiculo {

    constructor(
        matricula: string,
        marca: string,
        modelo: string,
        // estado: IEstadoVehiculo,
        tarifa: Tarifa
    ) {
        super(matricula, marca, modelo, tarifa); //aca falta estado y tarifa 
    }
}