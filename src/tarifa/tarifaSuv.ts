import Kilometraje from "../kilometraje";
import { IEstrategiaTarifaTemporada } from "../temporadas/iEstrategiaTarifaTemporada";
import { Tarifa } from "./tarifa";

const TARIFA_BASE_DIA = 80;
const CARGO_ADICIONAL = 0.25;
const CARGO_SEGURO_DIA = 15;
const LIMITE_KM_TOTAL = 500;

export default class TarifaSUV extends Tarifa {

    private cargoPorSeguro: number;

    /**
     * Crea una tarifa para vehículos tipo SUV.
     * Incluye un cargo fijo por seguro diario.
     *
     * @param {IEstrategiaTarifaTemporada} estrategiaTemporada Estrategia para ajustar la tarifa según la temporada.
     */
    constructor(estrategiaTemporada: IEstrategiaTarifaTemporada) {
        super(estrategiaTemporada);
        this.tarifaBase = TARIFA_BASE_DIA;
        this.cargoPorKmRecorrido = CARGO_ADICIONAL;
        this.cargoPorSeguro = CARGO_SEGURO_DIA;
    }

    /**
     * Obtiene el cargo fijo diario por seguro.
     * @returns {number} Cargo por seguro por día.
     */
    public getCargoPorSeguro(): number {
        return this.cargoPorSeguro;
    }

    /**
     * Calcula el costo total de la reserva para una SUV.
     * El cálculo incluye:
     * - costo base ajustado por temporada
     * - cargo fijo diario por seguro
     * - costo adicional si se superan los kilómetros permitidos
     *
     * @param {number} duracionReserva Duración de la reserva (días u horas según el modelo).
     * @param {Kilometraje} kilometrosRecorridos Información de kilómetros recorridos.
     * @returns {number} Costo total de la reserva.
     */
    public calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number {

        const totalKmsRecorridos = kilometrosRecorridos.calcularKmsTotalesRecorridos();

        let costoBaseTotal = duracionReserva * this.getTarifaBaseAjustada();
        let costoSeguroTotal = duracionReserva * this.getCargoPorSeguro();
        let costoVariableTotal = 0;

        if (totalKmsRecorridos > LIMITE_KM_TOTAL) {
            const kmExcedidos = totalKmsRecorridos - LIMITE_KM_TOTAL;
            costoVariableTotal = kmExcedidos * this.getCargoPorKmRecorrido();
        }

        const costoTotal = costoBaseTotal + costoSeguroTotal + costoVariableTotal;
        return costoTotal;
    }
}