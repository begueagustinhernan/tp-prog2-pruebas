import Kilometraje from "../kilometraje";

export abstract class Tarifa {
    protected tarifaBase: number;
    protected cargoPorKmRecorrido: number;

    constructor() {
        this.tarifaBase = 0;
        this.cargoPorKmRecorrido = 0;
    }

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public getCargoPorKmRecorrido(): number {
        return this.cargoPorKmRecorrido;
    }

    public abstract calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number;
}

