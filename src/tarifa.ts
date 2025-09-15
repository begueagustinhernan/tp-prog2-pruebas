import Kilometraje from "./kilometraje";
import Reserva from "./reserva";

export abstract class Tarifa {
    protected tarifaBase: number;
    protected cargoPorKm: number;

    constructor(tarifaBase: number, cargoPorKm: number) {
        this.tarifaBase = 0;
        this.cargoPorKm = 0;
    }

    public setTarifaBase(tarifaBase: number): void {
        this.tarifaBase = tarifaBase;
    }

    public getTarifaBase() {
        return this.tarifaBase;
    }

    public setCargoPorKm(cargoPorKm: number): void {
        this.cargoPorKm = cargoPorKm;
    }

    public getCargoPorKm() {
        return this.cargoPorKm;
    }

    // public abstract calcularCosto():number{}
}