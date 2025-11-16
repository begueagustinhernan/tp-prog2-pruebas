import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";

const AJUSTE_TEMPORADA_BAJA = 0.10;

/**
 * Estrategia de tarifa para temporada baja.
 *
 * Disminuye la tarifa base aplicando un descuento fijo debido a la menor demanda.
 */
export default class TemporadaBaja implements IEstrategiaTarifaTemporada {

    /**
     * Ajusta la tarifa base aplicando el descuento correspondiente
     * a la temporada baja.
     *
     * @param {number} tarifaBase - Tarifa original sin ajustes.
     * @returns {number} Tarifa ajustada con el descuento de temporada baja.
     */
    public ajustarTarifaBase(tarifaBase: number): number {
        return tarifaBase * (1 - AJUSTE_TEMPORADA_BAJA);
    }

}