import { Tarifa } from "../../src/tarifa/tarifa";
import TarifaSUV from "../../src/tarifa/tarifaSuv";
import Kilometraje from "../../src/kilometraje";


describe("Tests Clase TarifaSUV", () => {
    let tarifa: TarifaSUV;
    let kilometraje: Kilometraje

    beforeEach(() => {
        tarifa = new TarifaSUV();
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