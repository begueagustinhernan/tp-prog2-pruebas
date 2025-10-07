import Reserva from "../src/reserva";
import * as MOCKS from "./mocks";

describe("Tests Clase Reserva", () => {
    let fechaInicio: Date;
    let fechaFin: Date;
    let kilometrajeMock: MOCKS.KilometrajeMock;
    let vehiculoMock: MOCKS.VehiculoMock;
    let clienteMock: MOCKS.ClienteMock;
    let reserva: Reserva;

    beforeEach(() => {
        fechaInicio = new Date(2025, 8, 1);
        fechaFin = new Date(2025, 8, 10);
        kilometrajeMock = new MOCKS.KilometrajeMock();
        vehiculoMock = new MOCKS.VehiculoMock("Fiat");
        clienteMock = new MOCKS.ClienteMock("Pablo");

        reserva = new Reserva(fechaInicio, fechaFin, kilometrajeMock as any, vehiculoMock as any, clienteMock as any);
    })

    it("El constructor de la clase 'Reserva' debe instanciar un objeto de tipo 'Reserva'", () => {
        expect(reserva).toBeInstanceOf(Reserva);
    })

    it("getFechaInicio debe devolver correctamente la fecha de inicio de la instancia reserva", () => {
        const resultado = reserva.getFechaInicio();

        expect(resultado).toEqual(new Date(2025, 8, 1));
    })

    it("getFechaFin debe devolver correctamente la fecha de fin de la instancia reserva", () => {
        const resultado = reserva.getFechaFin();

        expect(resultado).toEqual(new Date(2025, 8, 10));
    })

    it("getKilometraje debe devolver correctamente la instancia de Kilometraje de la reserva", () => {
        const resultado = reserva.getKilometraje();

        expect(resultado).toBeInstanceOf(MOCKS.KilometrajeMock);
        expect(resultado).toBe(kilometrajeMock);
    })

    it("getVehiculo debe devolver correctamente la instancia de Vehiculo de la reserva", () => {
        const resultado = reserva.getVehiculo();

        expect(resultado).toBeInstanceOf(MOCKS.VehiculoMock);
        expect(resultado).toBe(vehiculoMock);
    })

    it("getCliente debe devolver correctamente la instancia de Cliente de la reserva", () => {
        const resultado = reserva.getCliente();

        expect(resultado).toBeInstanceOf(MOCKS.ClienteMock);
        expect(resultado).toBe(clienteMock);
    })

    it.skip("obtenerCostoTotal debe devolver correctamente el costo de reserva delegando la llamada a calcularCosto (Clase Tarifa)", () => {

    })
})

