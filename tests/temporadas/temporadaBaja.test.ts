import { IEstrategiaTarifaTemporada } from "../../src/temporadas/iEstrategiaTarifaTemporada";
import TemporadaBaja from "../../src/temporadas/temporadaBaja";

describe("Test estrategia de temporada baja", () => {

    it("debería implementar IEstrategiaTarifaTemporada", () => {
    const estrategia: IEstrategiaTarifaTemporada = new TemporadaBaja();
    expect(typeof estrategia.ajustarTarifaBase).toBe("function");
    });

    it("deberia reducir la tarifa base en un 10%", () => {
    const estrategia = new TemporadaBaja();
    expect(estrategia.ajustarTarifaBase(50)).toBe(45);
    expect(estrategia.ajustarTarifaBase(200)).toBe(180);
    expect(estrategia.ajustarTarifaBase(0)).toBe(0);
    });

});