import { Tarifa } from "../../src/tarifa/tarifa";
import TarifaSedan from "../../src/tarifa/tarifaSedan";
import Kilometraje from "../../src/kilometraje";
import TemporadaMedia from "../../src/temporadas/temporadaMedia";

describe("Tests Clase TarifaSedan", () => {

    let tarifa: TarifaSedan;
    let kilometraje: Kilometraje

    beforeEach(() => {

        const estrategiaMock = {
            ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase) // no modifica la base
        };

        tarifa = new TarifaSedan(estrategiaMock);
        kilometraje = new Kilometraje();

    });

    it("El constructor de la clase 'TarifaSedan' debe instanciar un objeto de tipo 'TarifaSedan'", () => {

        expect(tarifa).toBeInstanceOf(TarifaSedan);
    })

    it("El constructor de la clase 'TarifaSedan' debe instanciar un objeto de tipo 'Tarifa' ", () => {

        expect(tarifa).toBeInstanceOf(Tarifa);
    })

    // Test 1: calculo de costo fijo y variable:
    it('calcularCosto debe calcular el costo total correctamente sumando costo fijo y costo variable', () => {

        const duracionReserva = 4;

        kilometraje["kmsRecorridosPorDia"].set(1, 75);
        kilometraje["kmsRecorridosPorDia"].set(2, 75);
        kilometraje["kmsRecorridosPorDia"].set(3, 75);
        kilometraje["kmsRecorridosPorDia"].set(4, 75);

        // Calculo esperado:
        // Costo Fijo: 4 días * 50 = 200
        // Costo Variable: 300 km * 0.20 = 60
        // Costo Total: 200 + 60 = 260

        const costoEsperado = 260;
        const costoActual = tarifa.calcularCosto(duracionReserva, kilometraje);

        expect(costoActual).toBe(costoEsperado);

    });

    // Test 2: calculo de costo variable, sin costo fijo:
    it("calcularCosto debe calcular solo el costo variable cuando la duracion es 0", () => {

        const duracionReserva = 0;

        kilometraje["kmsRecorridosPorDia"].set(1, 150);

        // Calculo esperado:
        // Costo Fijo: 0 * 50 = 0
        // Costo Variable: 150 km * 0.20 = 30

        const costoEsperado = 30;
        const costoActual = tarifa.calcularCosto(duracionReserva, kilometraje);

        expect(costoActual).toBe(costoEsperado);

    });

});