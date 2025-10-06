import Kilometraje from "../kilometraje";
import { Tarifa } from "./tarifa";

const TARIFA_BASE_DIA = 80;
const CARGO_ADICIONAL = 0.25;
const CARGO_SEGURO_DIA = 15;
const LIMITE_KM_TOTAL = 500;


export default class TarifaSUV extends Tarifa {
    private cargoPorSeguro: number;

    constructor() {
        super();
        this.tarifaBase = TARIFA_BASE_DIA;
        this.cargoPorKmRecorrido = CARGO_ADICIONAL;
        this.cargoPorSeguro = CARGO_SEGURO_DIA;
    }

    public calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number {
        const totalKmsRecorridos = kilometrosRecorridos.calcularKmsTotalesRecorridos();

        let costoBaseTotal: number = duracionReserva * TARIFA_BASE_DIA;
        let costoSeguroTotal: number = duracionReserva * CARGO_SEGURO_DIA;
        let costoVariableTotal = 0;

        if (totalKmsRecorridos > LIMITE_KM_TOTAL) {
            const kmExcedidos = totalKmsRecorridos - LIMITE_KM_TOTAL;
            costoVariableTotal = kmExcedidos * CARGO_ADICIONAL;
        }

        const costoTotal = costoBaseTotal + costoSeguroTotal + costoVariableTotal;
        return costoTotal;
    }
}