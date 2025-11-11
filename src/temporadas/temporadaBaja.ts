import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";

const AJUSTE_TEMPORADA_BAJA = 0.10;

export default class TemporadaBaja implements IEstrategiaTarifaTemporada {

    public ajustarTarifaBase(tarifaBase: number): number {

        return tarifaBase * (1 - AJUSTE_TEMPORADA_BAJA);

    }

}