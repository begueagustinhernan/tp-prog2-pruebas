import { Tarifa } from "./tarifa";
import Kilometraje from "../kilometraje";
import { IEstrategiaTarifaTemporada } from "../temporadas/iEstrategiaTarifaTemporada";

const TARIFA_BASE_DIA = 50;
const CARGO_ADICIONAL = 0.20;

export default class TarifaSedan extends Tarifa {

    constructor(estrategiaTemporada: IEstrategiaTarifaTemporada) {
        super(estrategiaTemporada);
        this.tarifaBase = TARIFA_BASE_DIA;
        this.cargoPorKmRecorrido = CARGO_ADICIONAL;
    }

    public calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number {

        let costoBaseTotal: number = duracionReserva * this.getTarifaBaseAjustada();
        let costoVariableTotal: number = this.getCargoPorKmRecorrido() * kilometrosRecorridos.calcularKmsTotalesRecorridos();

        const costoTotal = costoBaseTotal + costoVariableTotal;
        return costoTotal;
    }
}