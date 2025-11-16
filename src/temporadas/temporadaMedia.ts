import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";

/**
 * Estrategia de tarifa para temporada media.
 *
 * En esta temporada no se realizan aumentos ni descuentos,
 * por lo que la tarifa base se mantiene igual.
 */
export default class TemporadaMedia implements IEstrategiaTarifaTemporada {

    /**
     * Devuelve la tarifa base sin aplicar ningún ajuste,
     * ya que en temporada media no hay variaciones.
     *
     * @param {number} tarifaBase - Tarifa original.
     * @returns {number} Tarifa sin modificaciones.
     */
    public ajustarTarifaBase(tarifaBase: number): number {
        return tarifaBase;
    }

}