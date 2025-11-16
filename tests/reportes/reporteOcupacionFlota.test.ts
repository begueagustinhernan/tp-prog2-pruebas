import { ReporteOcupacionFlota } from '../../src/reportes/reporteOcupacionFlota';
import { ReporteBase } from '../../src/reportes/reporteBase';
import { GestorFlota } from '../../src/reportes/gestorFlota';
import { Compacto } from '../../src/vehiculo/compacto';
import TarifaCompacto from '../../src/tarifa/tarifaCompacto';
import { Mantenimiento } from '../../src/mantenimiento';
import { EstadoDisponible } from '../../src/vehiculo/estados/estadoDisponible';
import Cliente from '../../src/cliente';
import Reserva from '../../src/reserva';
import Kilometraje from '../../src/kilometraje';

describe("Tests Clase ReporteOcupacionFlota", () => {

  let reporte: ReporteOcupacionFlota;
  let gestorFlota: GestorFlota;
  let fechaInicio: Date;
  let fechaFin: Date;

  beforeEach(() => {
    fechaInicio = new Date('2024-01-01');
    fechaFin = new Date('2024-01-31');
    
    gestorFlota = GestorFlota.getInstance();
    // Limpiamos los vehículos del singleton para cada test
    gestorFlota['vehiculos'] = [];
    
    reporte = new ReporteOcupacionFlota(fechaInicio, fechaFin);
  });

  it("El constructor de la clase 'ReporteOcupacionFlota' debe instanciar un objeto de tipo 'ReporteOcupacionFlota'", () => {
    expect(reporte).toBeInstanceOf(ReporteOcupacionFlota);
  });

  it("El constructor de la clase 'ReporteOcupacionFlota' debe instanciar un objeto de tipo 'ReporteBase'", () => {
    expect(reporte).toBeInstanceOf(ReporteBase);
  });

  it("getTitulo debe devolver correctamente el titulo del reporte", () => {
    const resultado = reporte.getTitulo();
    const resultadoEsperado = "Ocupación de la Flota";
    
    expect(resultado).toBe(resultadoEsperado);
    expect(typeof resultado).toBe('string');
  });

  it("generarReporte debe lanzar error si no hay vehiculos en la flota", () => {
    expect(() => {
      reporte.generarReporte();
    }).toThrow("Acción inválida: No hay vehículos o el período es inválido.");
  });

  it("generarReporte debe lanzar error si el periodo es invalido (fechaFin <= fechaInicio)", () => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    const estado = new EstadoDisponible();
    const mantenimiento = new Mantenimiento();
    const tarifa = new TarifaCompacto(estrategiaMock);
    const vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
    
    gestorFlota.agregarVehiculo(vehiculo);
    
    const fechaInicioInvalida = new Date('2024-01-31');
    const fechaFinInvalida = new Date('2024-01-01');
    const reporteInvalido = new ReporteOcupacionFlota(fechaInicioInvalida, fechaFinInvalida);
    
    expect(() => {
      reporteInvalido.generarReporte();
    }).toThrow("Acción inválida: No hay vehículos o el período es inválido.");
  });

  it("generarReporte debe ejecutarse correctamente con vehiculos sin reservas", () => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    const estado = new EstadoDisponible();
    const mantenimiento = new Mantenimiento();
    const tarifa = new TarifaCompacto(estrategiaMock);
    const vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
    
    gestorFlota.agregarVehiculo(vehiculo);
    
    expect(() => {
      reporte.generarReporte();
    }).not.toThrow();
  });

  it("generarReporte debe ejecutarse correctamente con vehiculos que tienen reservas", () => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    const estado = new EstadoDisponible();
    const mantenimiento = new Mantenimiento();
    const tarifa = new TarifaCompacto(estrategiaMock);
    const vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
    
    const cliente = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
    const fechaInicioReserva = new Date('2024-01-10');
    const fechaFinReserva = new Date('2024-01-15');
    const reserva = new Reserva(fechaInicioReserva, fechaFinReserva, new Kilometraje(), vehiculo, cliente);
    
    vehiculo.getHistorialReservas().push(reserva);
    gestorFlota.agregarVehiculo(vehiculo);
    
    expect(() => {
      reporte.generarReporte();
    }).not.toThrow();
  });

  it("generarReporte debe ejecutarse correctamente con multiples vehiculos", () => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    
    for (let i = 1; i <= 3; i++) {
      const estado = new EstadoDisponible();
      const mantenimiento = new Mantenimiento();
      const tarifa = new TarifaCompacto(estrategiaMock);
      const vehiculo = new Compacto(`ABC${i}`, 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
      
      gestorFlota.agregarVehiculo(vehiculo);
    }
    
    expect(() => {
      reporte.generarReporte();
    }).not.toThrow();
  });
});