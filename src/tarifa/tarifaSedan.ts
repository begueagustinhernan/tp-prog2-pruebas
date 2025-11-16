import { Tarifa } from "./tarifa";
import Kilometraje from "../kilometraje";
import { IEstrategiaTarifaTemporada } from "../temporadas/iEstrategiaTarifaTemporada";

const TARIFA_BASE_DIA = 50;
const CARGO_ADICIONAL = 0.20;

export default class TarifaSedan extends Tarifa {

    /**
     * Crea una tarifa para vehículos tipo sedán.
     * @param {IEstrategiaTarifaTemporada} estrategiaTemporada Estrategia usada para ajustar la tarifa según la temporada.
     */
    constructor(estrategiaTemporada: IEstrategiaTarifaTemporada) {
        super(estrategiaTemporada);
        this.tarifaBase = TARIFA_BASE_DIA;
        this.cargoPorKmRecorrido = CARGO_ADICIONAL;
    }

    /**
     * Calcula el costo total de la reserva para un sedán.
     * El costo se compone de:
     * - costo base ajustado por temporada
     * - cargo por todos los kilómetros recorridos
     *
     * @param {number} duracionReserva Duración de la reserva (en días u horas según el modelo).
     * @param {Kilometraje} kilometrosRecorridos Datos de kilómetros recorridos.
     * @returns {number} Costo total de la reserva.
     */
    public calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number {

        let costoBaseTotal: number = duracionReserva * this.getTarifaBaseAjustada();
        let costoVariableTotal: number =
            this.getCargoPorKmRecorrido() * kilometrosRecorridos.calcularKmsTotalesRecorridos();

        const costoTotal = costoBaseTotal + costoVariableTotal;
        return costoTotal;
    }
}