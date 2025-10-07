import { Tarifa } from "../../src/tarifa/tarifa";
import TarifaCompacto from "../../src/tarifa/tarifaCompacto";
import Kilometraje from "../../src/kilometraje";
import SinRegistrosDeKmsError from "../../src/excepciones/kilometraje/sinRegistrosDeKmsError";

describe("Tests Clase TarifaCompacto", () => {
    let tarifa: TarifaCompacto;
    let kilometraje: Kilometraje

    beforeEach(() => {
        tarifa = new TarifaCompacto();
        kilometraje = new Kilometraje();

    });

    it("El constructor de la clase 'TarifaCompacto' debe instanciar un objeto de tipo 'TarifaCompacto'", () => {

        expect(tarifa).toBeInstanceOf(TarifaCompacto);
    })

    it("El constructor de la clase 'TarifaCompacto' debe instanciar un objeto de tipo 'Tarifa' ", () => {

        expect(tarifa).toBeInstanceOf(Tarifa);
    })

    it("calcularCosto debe calcular el costo base correctamente sin excedente de kilometraje", () => {

        const duracionReserva = 3;

        kilometraje["kmsRecorridosPorDia"].set(1, 50);
        kilometraje["kmsRecorridosPorDia"].set(2, 77);
        kilometraje["kmsRecorridosPorDia"].set(3, 90);

        const costoEsperado = 90;
        const costoActual = tarifa.calcularCosto(duracionReserva, kilometraje);

        expect(costoActual).toBe(costoEsperado);
    });

    it("calcularCosto debe calcular el costo total con excedentes de kilometraje", () => {

        const duracionReserva = 2;

        kilometraje["kmsRecorridosPorDia"].set(1, 110);
        kilometraje["kmsRecorridosPorDia"].set(2, 150);

        // costo fijo = 2 dias * 30 = 60
        // costo variable:
        // Dia 1: (110 - 100) * 0.15 = 10 * 0.15 = 1.5
        // Dia 2: (150 - 100) * 0.15 = 50 * 0.15 = 7.5
        // costo esperado: 60 + 1.5 + 7.5 = 69.0

        const costoEsperado = 69.0;
        const costoActual = tarifa.calcularCosto(duracionReserva, kilometraje);

        expect(costoActual).toBe(costoEsperado);
    });

    // Test 3: calculo del costo con dias con y sin excedentes de kilometros:
    it("calcularCosto debe calcular el costo correctamente con dias con y sin excedente de kilometros", () => {

        const duracionReserva = 4;

        kilometraje["kmsRecorridosPorDia"].set(1, 50);
        kilometraje["kmsRecorridosPorDia"].set(2, 100);
        kilometraje["kmsRecorridosPorDia"].set(3, 120);
        kilometraje["kmsRecorridosPorDia"].set(4, 80);

        const costoEsperado = 123.0;
        const costoActual = tarifa.calcularCosto(duracionReserva, kilometraje);

        expect(costoActual).toBe(costoEsperado);
    });

    // Test 4: excepciones:
    it("calcularCosto debe arrojar excepción 'SinRegistrosDeKmsError' si el mapa de kilometros esta vacio", () => {

        const duracionReserva = 1;

        expect(() => {
            tarifa.calcularCosto(duracionReserva, kilometraje);
        }).toThrow(SinRegistrosDeKmsError);

    });
});