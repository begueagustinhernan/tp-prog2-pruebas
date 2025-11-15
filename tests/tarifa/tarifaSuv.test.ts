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
    });

    it("El constructor de la clase 'TarifaSUV' debe instanciar un objeto de tipo 'Tarifa'", () => {
        expect(tarifa).toBeInstanceOf(Tarifa);
    });

    it("getTarifaBase debe tener una tarifa base de $80", () => {
        expect(tarifa.getTarifaBase()).toBe(80);

    });

    it("getCargoKmRecorrido debe tener un cargo adicional por km de $0.25", () => {
        expect(tarifa.getCargoPorKmRecorrido()).toBe(0.25);

    });

    it("getCargoPorSeguro debe tener un seguro diario de $15", () => {
        expect(tarifa.getCargoPorSeguro()).toBe(15);
    });

    it("Debe calcular correctamente el costo total sin superar los 500 km", () => {
        kilometraje.setKmsRecorridosPorDia(1, 200);
        kilometraje.setKmsRecorridosPorDia(2, 150);
        kilometraje.setKmsRecorridosPorDia(3, 100);

        const costo = tarifa.calcularCosto(3, kilometraje);
        // Base: 80 * 3 = 240
        // Seguro: 15 * 3 = 45
        // Total: 285
        expect(costo).toBe(285);
    });

    it("Debe calcular correctamente el costo total cuando se superan los 500 km", () => {
        kilometraje.setKmsRecorridosPorDia(1, 400);
        kilometraje.setKmsRecorridosPorDia(2, 200);

        const costo = tarifa.calcularCosto(2, kilometraje);
        // Base: 80 * 2 = 160
        // Seguro: 15 * 2 = 30
        // Excedente: (600 - 500) * 0.25 = 25
        // Total: 160 + 30 + 25 = 215
        expect(costo).toBe(215);
    });

    it("Debe devolver 0 si la duración de la reserva es 0", () => {
        kilometraje.setKmsRecorridosPorDia(1, 100);
        const costo = tarifa.calcularCosto(0, kilometraje);
        expect(costo).toBe(0);
    });


})