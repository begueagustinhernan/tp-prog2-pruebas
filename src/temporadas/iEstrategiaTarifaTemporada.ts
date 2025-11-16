/**
 * Interfaz que define una estrategia para ajustar la tarifa base
 * según la temporada del año.
 *
 * Forma parte del patrón Strategy, permitiendo que distintas
 * temporadas apliquen reglas diferentes sobre la tarifa.
 */
export interface IEstrategiaTarifaTemporada {

    /**
     * Aplica un ajuste a la tarifa base según la temporada.
     *
     * @param {number} tarifaBase - Tarifa original antes del ajuste.
     * @returns {number} Tarifa ajustada.
     */
    ajustarTarifaBase(tarifaBase: number): number;

}