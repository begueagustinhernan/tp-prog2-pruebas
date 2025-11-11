import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";

export default class TemporadaMedia implements IEstrategiaTarifaTemporada {

    public ajustarTarifaBase(tarifaBase: number): number {

        return tarifaBase;

    }

}