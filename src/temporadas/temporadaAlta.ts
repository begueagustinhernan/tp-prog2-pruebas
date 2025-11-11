import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";

const AJUSTE_TEMPORADA_ALTA = 0.20;

export default class TemporadaAlta implements IEstrategiaTarifaTemporada {

    public ajustarTarifaBase(tarifaBase: number): number {

        return tarifaBase * (1 + AJUSTE_TEMPORADA_ALTA);

    }

}