import { Tarifa } from "./tarifa";

export default class tarifaCompacto extends Tarifa {
    private cargoSeguro: number;

    constructor() {
        super(80, 0.25);
        this.cargoSeguro = 15;
    }

    public setCargoSeguro(cargoSeguro: number): void {
        this.tarifaBase = this.cargoSeguro;
    }

    public getCargoSeguro(): number {
        return this.cargoSeguro;
    }

    //calcularCosto()
}