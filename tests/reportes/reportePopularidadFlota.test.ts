import { ReportePopularidadFlota } from "../../src/reportes/reportePopularidadFlota";
import { GestorFlota } from "../../src/reportes/gestorFlota";

describe("ReportePopularidadFlota", () => {

    let mockGestorFlota: any;
    let mockVehiculo1: any;
    let mockVehiculo2: any;

    let mockReserva1: any;
    let mockReserva2: any;
    let mockReserva3: any;

    const fechaInicio = new Date(2024, 0, 1);
    const fechaFin = new Date(2024, 11, 31);

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock reservas ----------------------------------
        mockReserva1 = { getFechaFin: jest.fn().mockReturnValue(new Date(2024, 6, 10)) };
        mockReserva2 = { getFechaFin: jest.fn().mockReturnValue(new Date(2024, 8, 5)) };
        mockReserva3 = { getFechaFin: jest.fn().mockReturnValue(new Date(2024, 2, 20)) };

        // Mock vehículos ----------------------------------
        mockVehiculo1 = {
            getHistorialReservas: jest.fn().mockReturnValue([mockReserva1, mockReserva2, mockReserva3]),
            getMatricula: jest.fn().mockReturnValue("AAA111")
        };

        mockVehiculo2 = {
            getHistorialReservas: jest.fn().mockReturnValue([]),
            getMatricula: jest.fn().mockReturnValue("BBB222")
        };

        // Mock del GestorFlota (singleton)
        mockGestorFlota = {
            getVehiculos: jest.fn().mockReturnValue([mockVehiculo1, mockVehiculo2])
        };

        jest.spyOn(GestorFlota, "getInstance").mockReturnValue(mockGestorFlota as any);

        // Mock general de console.log
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    test("debe calcular correctamente el vehiculo mas y menos alquilado", () => {

        const reporte = new ReportePopularidadFlota(fechaInicio, fechaFin);

        // Ejecutar cálculo directamente
        reporte["ejecutarCalculoReporte"]();

        // Debe consultar los vehículos
        expect(mockGestorFlota.getVehiculos).toHaveBeenCalled();

        // Debe leer historial de cada vehículo
        expect(mockVehiculo1.getHistorialReservas).toHaveBeenCalled();
        expect(mockVehiculo2.getHistorialReservas).toHaveBeenCalled();

        // Verifica que al menos haya impreso info del vehículo más alquilado
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("Vehículo Mas Alquilado")
        );

        // Verifica que haya impreso info del vehículo menos alquilado
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("Vehículo Menos Alquilado")
        );
    });
});