import { Tarifa } from "../tarifa/tarifa";
import { Mantenimiento } from "../mantenimiento";
import { IEstadoVehiculo } from "./estados/iEstadoVehiculo";
import Cliente from "../cliente";

export abstract class Vehiculo {
    protected matricula: string;
    protected marca: string;
    protected modelo: string;
    protected estado: IEstadoVehiculo;
    protected kilometrajeTotal: number = 0;
    protected mantenimiento: Mantenimiento;
    protected tarifa: Tarifa;

    constructor(
        matricula: string,
        marca: string,
        modelo: string,
        estado: IEstadoVehiculo,
        mantenimiento: Mantenimiento,
        tarifa: Tarifa
    ) {
        this.matricula = matricula;
        this.marca = marca;
        this.modelo = modelo;
        this.estado = estado;
        this.mantenimiento = mantenimiento;
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

    public getEstado(): IEstadoVehiculo {
        return this.estado;
    }

    public getKilometrajeTotal(): number {
        return this.kilometrajeTotal;
    }

    public getMantenimiento(): Mantenimiento {
        return this.mantenimiento;
    }

    public getTarifa(): Tarifa {
        return this.tarifa;
    }

    public setEstado(estado: IEstadoVehiculo): void {
        this.estado = estado;
    }

    public setKilometrajeTotal(kmTotal: number) {
        this.kilometrajeTotal = kmTotal;
    }

    public alquilar(cliente: Cliente, fechaInicio: Date, fechaFin: Date) {
        this.getEstado().alquilar(this, cliente, fechaInicio, fechaFin);
    }

    public devolver() {
        this.getEstado().devolver(this);
    }

    public iniciarMantenimiento(fechaInicio: Date) {
        this.getEstado().iniciarMantenimiento(this, fechaInicio);
    }

    public finalizarMantenimiento(costo: number, fechaFin: Date) {
        this.getEstado().finalizarMantenimiento(this, costo, fechaFin);
    }
}