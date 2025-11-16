import { EstadoEnAlquiler } from '../../src/vehiculo/estados/estadoEnAlquiler';
import { EstadoEnMantenimiento } from '../../src/vehiculo/estados/estadoEnMantenimiento';
import { EstadoDisponible } from '../../src/vehiculo/estados/estadoDisponible';

describe('EstadoMantenimiento Tests', () => {

    let vehiculoMock: any;
    let mantenimientoMock: any;
    let estadoEnMantenimiento: EstadoEnMantenimiento;

    beforeEach(() => {
        mantenimientoMock = {
            puedeFinalizar: jest.fn(),
            finalizarRegistroMantenimiento: jest.fn()
        };

        vehiculoMock = {
            getMantenimiento: jest.fn(() => mantenimientoMock),
            getKilometrajeTotal: jest.fn(() => 12345),
            setEstado: jest.fn(),
            getMatricula: jest.fn(() => "ABC123")
        };

        estadoEnMantenimiento = new EstadoEnMantenimiento();
    });

    describe('Método finalizarMantenimiento()', () => {

        test('Debe lanzar error si no se cumplió el tiempo mínimo de mantenimiento', () => {
            mantenimientoMock.puedeFinalizar.mockReturnValue(false);

            expect(() =>
                estadoEnMantenimiento.finalizarMantenimiento(
                    vehiculoMock,
                    5000,
                    new Date()
                )
            ).toThrow(
                "No se puede finalizar. Aún no se ha cumplido el tiempo mínimo de 24 horas de mantenimiento."
            );

            expect(mantenimientoMock.puedeFinalizar).toHaveBeenCalled();
            expect(mantenimientoMock.finalizarRegistroMantenimiento).not.toHaveBeenCalled();
            expect(vehiculoMock.setEstado).not.toHaveBeenCalled();
        });

        test('Debe finalizar el mantenimiento, registrar datos y cambiar estado a Disponible', () => {
            mantenimientoMock.puedeFinalizar.mockReturnValue(true);

            const fechaFin = new Date();
            const costo = 8000;

            const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

            estadoEnMantenimiento.finalizarMantenimiento(
                vehiculoMock,
                costo,
                fechaFin
            );

            expect(mantenimientoMock.puedeFinalizar).toHaveBeenCalledWith(fechaFin);
            expect(vehiculoMock.getKilometrajeTotal).toHaveBeenCalled();

            expect(mantenimientoMock.finalizarRegistroMantenimiento)
                .toHaveBeenCalledWith(costo, fechaFin, 12345);

            expect(vehiculoMock.setEstado).toHaveBeenCalled();
            const nuevoEstado = vehiculoMock.setEstado.mock.calls[0][0];
            expect(nuevoEstado).toBeInstanceOf(EstadoDisponible);

            expect(logSpy).toHaveBeenCalledWith(
                "Vehículo ABC123 se encuentra nuevamente disponible."
            );

            logSpy.mockRestore();
        });

    });

});