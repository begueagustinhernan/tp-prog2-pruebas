import { IEstrategiaTarifaTemporada } from "../../src/temporadas/iEstrategiaTarifaTemporada";
import TemporadaAlta from "../../src/temporadas/temporadaAlta";

describe("Test estrategia de temporada alta", () => {

    it("debería implementar IEstrategiaTarifaTemporada", () => {
    const estrategia: IEstrategiaTarifaTemporada = new TemporadaAlta();
    expect(typeof estrategia.ajustarTarifaBase).toBe("function");
    });

    it("deberia aumentar la tarifa base en un 20%", () => {
    const estrategia = new TemporadaAlta();
    expect(estrategia.ajustarTarifaBase(50)).toBe(60);
    expect(estrategia.ajustarTarifaBase(200)).toBe(240);
    expect(estrategia.ajustarTarifaBase(0)).toBe(0);
    });

});