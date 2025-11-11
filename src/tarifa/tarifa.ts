import Kilometraje from "../kilometraje";
import { IEstrategiaTarifaTemporada } from "../temporadas/iEstrategiaTarifaTemporada";

export abstract class Tarifa {
    protected tarifaBase: number;
    protected cargoPorKmRecorrido: number;
    private estrategiaTemporada: IEstrategiaTarifaTemporada;

    constructor(estrategiaTemporada: IEstrategiaTarifaTemporada) {
        this.tarifaBase = 0;
        this.cargoPorKmRecorrido = 0;
        this.estrategiaTemporada = estrategiaTemporada;
    }

    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    public getTarifaBaseAjustada(): number {
        return this.estrategiaTemporada.ajustarTarifaBase(this.tarifaBase);
    }

    public getCargoPorKmRecorrido(): number {
        return this.cargoPorKmRecorrido;
    }

    public setEstrategiaTemporada(estrategia: IEstrategiaTarifaTemporada): void {
        this.estrategiaTemporada = estrategia;
    }

    public abstract calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number;
}

