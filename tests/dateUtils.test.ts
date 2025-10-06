import DateUtils from "../src/dateutils";

describe('Tests Clase DateUtils', () => {

    it('obtenerDiasDuracion debe devolver correctamente la duracion en dias entre dos fechas de tipo Date.', () => {

        const fechaInicio: Date = new Date(2024, 2, 1);
        const fechaFin: Date = new Date(2024, 2, 11);
        const resultadoDiasEsperados = 10;

        expect(DateUtils.obtenerDiasDuracion(fechaInicio, fechaFin)).toEqual(resultadoDiasEsperados);
    });

    test('debe manejar correctamente fechas que acarcan un mes', () => {

        const fechaInicio = new Date(2024, 1, 20);
        const fechaFin = new Date(2024, 2, 5);

        const diasEsperados = 14;

        const diasActuales = DateUtils.obtenerDiasDuracion(fechaInicio, fechaFin);
        expect(diasActuales).toBe(diasEsperados);

    });

    test('debe retornar 0 para la misma fecha', () => {
        const hoy = new Date();
        expect(DateUtils.obtenerDiasDuracion(hoy, hoy)).toBe(0);

    });

});