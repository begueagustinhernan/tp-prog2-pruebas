import { Tarifa } from "../tarifa/tarifa";
import Mantenimiento from "../mantenimiento";
// import { IEstadoVehiculo } from "./estadoVehiculo"; este es para cuando definamos el estado del vehiculo

export abstract class Vehiculo {
    protected matricula: string;
    protected marca: string;
    protected modelo: string;
    //protected estado: IEstadoVehiculo;
    // protected mantenimiento: Map<Date, Mantenimiento> = new Map();
    protected tarifa: Tarifa;

    constructor(
        matricula: string,
        marca: string,
        modelo: string,
        //estado: IEstadoVehiculo,
        tarifa: Tarifa
    ) {
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        //this.estado = estado;
        this.tarifa = tarifa;
    }

    public getMatricula(): string {
        return this.matricula;
    }

    public getMarca(): string {
        return this.marca;
    }

    public getModelo(): string {
        return this.modelo;
    }

    // public getEstado(): IEstadoVehiculo {
    //     return this.estado;
    // }

    // public getMantenimiento(): Map<number, Mantenimiento> {
    //     return this.mantenimiento;
    // }

    public getTarifa(): Tarifa {
        return this.tarifa;
    }

    // public setEstado(estado: IEstadoVehiculo): void {
    //     this.estado = estado;
    // }

    // public setMantenimiento(mantenimiento: Mantenimiento): void {
    //     this.mantenimiento = mantenimiento;
    // }

    // public programarMantenimiento(mantenimiento: Mantenimiento): void {
    //     this.mantenimiento = mantenimiento;
    //     this.estado.iniciarMantenimiento(this);
    // }

    // public finalizarMantenimiento(fechaFin: Date): void {
    //     if (this.mantenimiento) {
    //         this.mantenimiento.fechaFin = fechaFin;
    //     }
    //     this.estado.finalizarMantenimiento(fechaFin);
    // }
}