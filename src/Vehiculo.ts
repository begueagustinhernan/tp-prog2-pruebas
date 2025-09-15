import Mantenimiento from "./mantenimiento";
import { Tarifa } from "./tarifa";

export abstract class Vehiculo {
    protected matricula: string;
    protected marca: string;
    protected modelo: string;
    protected estado: string;
    protected mantenimiento: Mantenimiento;
    protected tarifa: Tarifa;

    constructor(matricula: string, marca: string, modelo: string, estado: string, mantenimiento: Mantenimiento, tarifa: Tarifa) {
        this.matricula = matricula ?? "";
        this.marca = marca ?? "";
        this.modelo = modelo ?? "";
        this.estado = estado ?? "";
        this.mantenimiento = mantenimiento ?? "";
        this.tarifa = tarifa ?? 0;
    }

    public setMatricula(matricula: string): void {
        this.matricula = matricula;
    }
    public setMarca(marca: string): void {
        this.marca = marca;
    }
    public setModelo(modelo: string): void {
        this.modelo = modelo;
    }
    public setEstado(estado: string): void {
        this.estado = estado;
    }
    public setMantenimiento(mantenimiento: Mantenimiento): void {
        this.mantenimiento = mantenimiento;
    }
    public setTarifa(tarifa: Tarifa): void {
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
    public getEstado(): string {
        return this.estado;
    }
    public getMantenimiento() {
        return this.matricula
    }
    public getTarifa() {
        return this.tarifa
    }


}