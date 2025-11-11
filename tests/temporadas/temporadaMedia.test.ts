import { IEstrategiaTarifaTemporada } from "../../src/temporadas/iEstrategiaTarifaTemporada";
import TemporadaMedia from "../../src/temporadas/temporadaMedia";

describe("Test estrategia de temporada media", () => {

    it("debería implementar IEstrategiaTarifaTemporada", () => {
    const estrategia: IEstrategiaTarifaTemporada = new TemporadaMedia();
    expect(typeof estrategia.ajustarTarifaBase).toBe("function");
    });

    it("deberia mantenerse la tarifa base sin cambios", () => {
    const estrategia = new TemporadaMedia();
    expect(estrategia.ajustarTarifaBase(50)).toBe(50);
    expect(estrategia.ajustarTarifaBase(200)).toBe(200);
    expect(estrategia.ajustarTarifaBase(0)).toBe(0);
    });

});