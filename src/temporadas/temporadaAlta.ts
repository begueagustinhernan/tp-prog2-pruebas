import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";

const AJUSTE_TEMPORADA_ALTA = 0.20;

/**
 * Implementación de la estrategia de tarifa para temporada alta.
 *
 * Aumenta la tarifa base en un porcentaje fijo debido a la mayor demanda.
 */
export default class TemporadaAlta implements IEstrategiaTarifaTemporada {

    /**
     * Ajusta la tarifa base aplicando el aumento correspondiente
     * a la temporada alta.
     *
     * @param {number} tarifaBase - Tarifa original sin ajustes.
     * @returns {number} Tarifa ajustada con el aumento de temporada alta.
     */
    public ajustarTarifaBase(tarifaBase: number): number {
        return tarifaBase * (1 + AJUSTE_TEMPORADA_ALTA);
    }

}