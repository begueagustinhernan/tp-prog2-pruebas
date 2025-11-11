import { Tarifa } from "../../src/tarifa/tarifa";
import TarifaSUV from "../../src/tarifa/tarifaSuv";
import Kilometraje from "../../src/kilometraje";


describe("Tests Clase TarifaSUV", () => {
    let tarifa: TarifaSUV;
    let kilometraje: Kilometraje

    beforeEach(() => {

        const estrategiaMock = {
            ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase) // no modifica la base
            };

        tarifa = new TarifaSUV(estrategiaMock);
        kilometraje = new Kilometraje();

    });

    it("El constructor de la clase 'TarifaSUV' debe instanciar un objeto de tipo 'TarifaSUV'", () => {

        expect(tarifa).toBeInstanceOf(TarifaSUV);
    })

    it("El constructor de la clase 'TarifaSUV' debe instanciar un objeto de tipo 'Tarifa' ", () => {

        expect(tarifa).toBeInstanceOf(Tarifa);
    })

    //completar
})