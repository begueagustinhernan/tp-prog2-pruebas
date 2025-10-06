import { Tarifa } from "./tarifa";
import Kilometraje from "../kilometraje";

const TARIFA_BASE_DIA = 50;
const CARGO_ADICIONAL = 0.20;

export default class TarifaSedan extends Tarifa {

    constructor() {
        super();
        this.tarifaBase = TARIFA_BASE_DIA;
        this.cargoPorKmRecorrido = CARGO_ADICIONAL;
    }

    public calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number {

        let costoBaseTotal: number = duracionReserva * TARIFA_BASE_DIA;
        let costoVariableTotal: number = CARGO_ADICIONAL * kilometrosRecorridos.calcularKmsTotalesRecorridos();

        const costoTotal = costoBaseTotal + costoVariableTotal;
        return costoTotal;
    }
}