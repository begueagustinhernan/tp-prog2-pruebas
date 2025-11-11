import GestorTemporadas from "../../src/temporadas/gestorTemporadas";
import TemporadaAlta from "../../src/temporadas/temporadaAlta";
import TemporadaBaja from "../../src/temporadas/temporadaBaja";
import TemporadaMedia from "../../src/temporadas/temporadaMedia";
import { IEstrategiaTarifaTemporada } from "../../src/temporadas/iEstrategiaTarifaTemporada";

describe("Tests Clase GestorTemporadas", () => {

  it("debería retornar una instancia de TemporadaAlta para meses 1, 2, 7 y 12", () => {
    const mesesAlta = [1, 2, 7, 12];

    mesesAlta.forEach((mes) => {
      const fecha = new Date(2024, mes - 1, 15);
      const estrategia = GestorTemporadas.obtenerEstrategia(fecha);
      expect(estrategia).toBeInstanceOf(TemporadaAlta);
    });
  });

  it("debería retornar una instancia de TemporadaMedia para meses 3, 4, 5, 9, 10 y 11", () => {
    const mesesMedia = [3, 4, 5, 9, 10, 11];

    mesesMedia.forEach((mes) => {
      const fecha = new Date(2024, mes - 1, 15);
      const estrategia = GestorTemporadas.obtenerEstrategia(fecha);
      expect(estrategia).toBeInstanceOf(TemporadaMedia);
    });
  });

  it("debería retornar una instancia de TemporadaBaja para meses 6 y 8", () => {
    const mesesBaja = [6, 8];

    mesesBaja.forEach((mes) => {
      const fecha = new Date(2024, mes - 1, 15);
      const estrategia = GestorTemporadas.obtenerEstrategia(fecha);
      expect(estrategia).toBeInstanceOf(TemporadaBaja);
    });
  });

  it("debería retornar un objeto que implemente IEstrategiaTarifaTemporada", () => {
    const fecha = new Date(2024, 6, 10); // julio, temporada alta
    const estrategia: IEstrategiaTarifaTemporada = GestorTemporadas.obtenerEstrategia(fecha);
    expect(typeof estrategia.ajustarTarifaBase).toBe("function");
  });

});