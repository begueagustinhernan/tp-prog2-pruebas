import { EstadoDisponible } from "../../src/vehiculo/estados/estadoDisponible";
import { EstadoEnAlquiler } from "../../src/vehiculo/estados/estadoEnAlquiler";
import { EstadoEnMantenimiento } from "../../src/vehiculo/estados/estadoEnMantenimiento";
import Reserva from "../../src/reserva";
import Kilometraje from "../../src/kilometraje";

// ===== MOCKS =====

// Mock simple de Cliente
const ClienteMock = jest.fn(() => ({
    setReserva: jest.fn(),
}));

// Mock de Mantenimiento
const MantenimientoMock = jest.fn(() => ({
    iniciarRegistroMantenimiento: jest.fn(),
}));

// Mock de Vehiculo
const VehiculoMock = jest.fn(() => ({
    getMatricula: jest.fn(),
    setEstado: jest.fn(),
    getMantenimiento: jest.fn(),
}));

describe("EstadoDisponible", () => {

    let estadoDisponible: EstadoDisponible;
    let vehiculoMock: any;
    let clienteMock: any;
    let mantenimientoMock: any;

    let fechaInicio: Date;
    let fechaFin: Date;

    beforeEach(() => {
        jest.clearAllMocks();

        estadoDisponible = new EstadoDisponible();

        vehiculoMock = new VehiculoMock();
        clienteMock = new ClienteMock();
        mantenimientoMock = new MantenimientoMock();

        // Ajusto referencias internas:
        vehiculoMock.getMantenimiento.mockReturnValue(mantenimientoMock);

        // Fechas de prueba
        fechaInicio = new Date("2024-01-10");
        fechaFin = new Date("2024-01-20");

        // Valores simulados
        vehiculoMock.getMatricula.mockReturnValue("ABC123");
    });

    // ========================================================
    // 1) Test: Propiedad nombreEstado heredada
    // ========================================================

    test("Debería tener el nombre de estado 'Disponible'", () => {
        expect(estadoDisponible.getNombreEstado()).toBe("Disponible");
    });

    // ========================================================
    // 2) Test: alquilar()
    // ========================================================

    test("alquilar() debe crear una Reserva, asignarla al cliente y cambiar el estado del vehículo a EstadoEnAlquiler", () => {

        // Espiar console.log
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        estadoDisponible.alquilar(vehiculoMock, clienteMock, fechaInicio, fechaFin);

        // Verifica que se imprimió la matricula
        expect(consoleSpy).toHaveBeenCalledWith(`Alquilando vehiculo con matricula: (${vehiculoMock.getMatricula()})`);

        // Verifico que se llame setReserva() con una Reserva real
        expect(clienteMock.setReserva).toHaveBeenCalledTimes(1);

        const reservaCreada = clienteMock.setReserva.mock.calls[0][0];
        expect(reservaCreada).toBeInstanceOf(Reserva);

        // Compruebo que el nuevo estado del vehículo sea EstadoEnAlquiler
        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);

        const nuevoEstado = vehiculoMock.setEstado.mock.calls[0][0];
        expect(nuevoEstado).toBeInstanceOf(EstadoEnAlquiler);

        // Console final
        expect(consoleSpy).toHaveBeenCalledWith(
            `Vehiculo '${vehiculoMock.getMatricula()}' alquilado con exito.`
        );

        consoleSpy.mockRestore();
    });

    // ========================================================
    // 3) Test: iniciarMantenimiento()
    // ========================================================

    test("iniciarMantenimiento() debe llamar al mantenimiento del vehículo e instalar EstadoEnMantenimiento", () => {
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        estadoDisponible.iniciarMantenimiento(vehiculoMock, fechaInicio);

        expect(mantenimientoMock.iniciarRegistroMantenimiento).toHaveBeenCalledWith(fechaInicio);

        expect(vehiculoMock.setEstado).toHaveBeenCalledTimes(1);

        const estadoAsignado = vehiculoMock.setEstado.mock.calls[0][0];
        expect(estadoAsignado).toBeInstanceOf(EstadoEnMantenimiento);

        expect(consoleSpy).toHaveBeenCalledWith(
            `Vehiculo '${vehiculoMock.getMatricula()}' enviado a mantenimiento.`
        );

        consoleSpy.mockRestore();
    });

    // ========================================================
    // 4) Test: Métodos inválidos heredados desde EstadoBase
    // ========================================================

    test("devolver() debe lanzar error porque no está permitido en estado Disponible", () => {
        expect(() => estadoDisponible.devolver(vehiculoMock))
            .toThrow(`Acción inválida: No se puede Devolver un vehículo en estado "Disponible".`);
    });

    test("finalizarMantenimiento() debe lanzar error porque no aplica a estado Disponible", () => {
        expect(() =>
            estadoDisponible.finalizarMantenimiento(vehiculoMock, 100, fechaFin)
        ).toThrow(`Acción inválida: No se puede Finalizar Mantenimiento un vehículo en estado "Disponible".`);
    });

});
