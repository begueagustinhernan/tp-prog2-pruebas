import { EstadoEnAlquiler } from '../../src/vehiculo/estados/estadoEnAlquiler';
import { EstadoDisponible } from '../../src/vehiculo/estados/estadoDisponible';
import { EstadoEnMantenimiento } from '../../src/vehiculo/estados/estadoEnMantenimiento';

describe("Tests Clase EstadoEnAlquiler", () => {
    let estadoEnAlquiler: EstadoEnAlquiler;
    let vehiculoMock: any;
    let mantenimientoMock: any;
    let clienteMock: any;
    let kilometrajeMock: any;
    let reservaMock: any;

    beforeEach(() => {
        clienteMock = {
            desasociarReserva: jest.fn()
        };

        kilometrajeMock = {
            calcularKmsTotalesRecorridos: jest.fn(() => 150)
        };

        mantenimientoMock = {
            registrarAlquilerCompletado: jest.fn(),
            verificarNecesidadMantenimiento: jest.fn(() => false),
            iniciarRegistroMantenimiento: jest.fn()
        };

       let kmTotal = 10000;

        vehiculoMock = {
            getKilometrajeTotal: jest.fn(() => kmTotal),
            setKilometrajeTotal: jest.fn((nuevo) => {
                kmTotal = nuevo;
            }),
            setHistorialReservas: jest.fn(),
            getMantenimiento: jest.fn(() => mantenimientoMock),
            setEstado: jest.fn(),
            getMatricula: jest.fn(() => "XYZ987"),
            iniciarMantenimiento: jest.fn()
        };
        
        reservaMock = {
            obtenerCostoTotal: jest.fn(() => 5000),
            getKilometraje: jest.fn(() => kilometrajeMock),
            getCliente: jest.fn(() => clienteMock)
        };

        estadoEnAlquiler = new EstadoEnAlquiler(reservaMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    it("El constructor de la clase 'EstadoEnAlquiler' debe instanciar un objeto de tipo 'EstadoEnAlquiler'", () => {
        expect(estadoEnAlquiler).toBeInstanceOf(EstadoEnAlquiler);
    });

    it("devolver() debe procesar la devolución sin activar mantenimiento y actualizar kilometraje, desasociar reserva y cambiar estado a Disponible", () => {
        mantenimientoMock.verificarNecesidadMantenimiento.mockReturnValue(false);

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        estadoEnAlquiler.devolver(vehiculoMock);

        // costo total obtenido y km calculados
        expect(reservaMock.obtenerCostoTotal).toHaveBeenCalled();
        expect(kilometrajeMock.calcularKmsTotalesRecorridos).toHaveBeenCalled();

        // km total actualizado correctamente
        expect(vehiculoMock.setKilometrajeTotal).toHaveBeenCalledWith(10000 + 150);

        // reserva desasociada del cliente
        expect(clienteMock.desasociarReserva).toHaveBeenCalled();

        // se registró el alquiler completado en mantenimiento
        expect(mantenimientoMock.registrarAlquilerCompletado).toHaveBeenCalled();

        // se verificó necesidad de mantenimiento pero no se activó
        expect(mantenimientoMock.verificarNecesidadMantenimiento).toHaveBeenCalledWith(10000 + 150);
        expect(vehiculoMock.iniciarMantenimiento).not.toHaveBeenCalled();

        // cambio de estado a Disponible
        expect(vehiculoMock.setEstado).toHaveBeenCalled();
        const estadoAsignado = vehiculoMock.setEstado.mock.calls[0][0];
        expect(estadoAsignado).toBeInstanceOf(EstadoDisponible);

        // mensaje final
        expect(consoleSpy).toHaveBeenCalledWith(`Vehiculo '${vehiculoMock.getMatricula()}' devuelto con exito.`);

        consoleSpy.mockRestore();
    });

    it("devolver() debe activar mantenimiento cuando el disparador lo indique", () => {
        mantenimientoMock.verificarNecesidadMantenimiento.mockReturnValue(true);

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        estadoEnAlquiler.devolver(vehiculoMock);

        // disparador -> iniciar mantenimiento invocado
        expect(mantenimientoMock.verificarNecesidadMantenimiento).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith("Disparador de mantenimiento activado.");
        expect(vehiculoMock.iniciarMantenimiento).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it("iniciarMantenimiento() debe delegar en mantenimiento y cambiar el estado a EstadoEnMantenimiento", () => {
        const fecha = new Date();
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });

        estadoEnAlquiler.iniciarMantenimiento(vehiculoMock, fecha);

        expect(mantenimientoMock.iniciarRegistroMantenimiento).toHaveBeenCalledWith(fecha);
        expect(vehiculoMock.setEstado).toHaveBeenCalled();
        const nuevoEstado = vehiculoMock.setEstado.mock.calls[0][0];
        expect(nuevoEstado).toBeInstanceOf(EstadoEnMantenimiento);

        expect(consoleSpy).toHaveBeenCalledWith(
            `Vehiculo '${vehiculoMock.getMatricula()}' enviado a mantenimiento.`
        );

        consoleSpy.mockRestore();
    });
});