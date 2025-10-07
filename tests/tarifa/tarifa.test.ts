import TarifaCompacto from "../../src/tarifa/tarifaCompacto";

describe("Tests Clase Tarifa", () => {
    let tarifa: TarifaCompacto;

    beforeEach(() => {
        tarifa = new TarifaCompacto();

        tarifa["tarifaBase"] = 30;
        tarifa["cargoPorKmRecorrido"] = 0.15;
    })

    it("getTarifaBase debe devolver correctamente el valor de la tarifa base de la instancia tarifa", () => {

        const resultado = tarifa.getTarifaBase();
        const resultadoEsperado = 30;

        expect(resultado).toBe(resultadoEsperado);
        expect(resultado).toEqual(resultadoEsperado);
        expect(typeof resultado).toBe("number");
    })

    it("getCargoPorKmRecorrido debe devolver correctamente el valor del cargo adicional por kilometro recorrido de la instancia tarifa", () => {

        const resultado = tarifa.getCargoPorKmRecorrido();
        const resultadoEsperado = 0.15;

        expect(resultado).toBe(resultadoEsperado);
        expect(resultado).toEqual(resultadoEsperado);
        expect(typeof resultado).toBe("number");
    })
})