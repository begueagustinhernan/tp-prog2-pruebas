import { ReporteRentabilidadFlora } from '../../src/reportes/reporteRentabilidadFlota';
import { ReporteBase } from '../../src/reportes/reporteBase';
import { GestorFlota } from '../../src/reportes/gestorFlota';
import { Compacto } from '../../src/vehiculo/compacto';
import TarifaCompacto from '../../src/tarifa/tarifaCompacto';
import { Mantenimiento } from '../../src/mantenimiento';
import { RegistroMantenimiento } from '../../src/registroMantenimiento';
import { EstadoDisponible } from '../../src/vehiculo/estados/estadoDisponible';
import Cliente from '../../src/cliente';
import Reserva from '../../src/reserva';
import Kilometraje from '../../src/kilometraje';

describe("Tests Clase ReporteRentabilidadFlora", () => {

  let reporte: ReporteRentabilidadFlora;
  let gestorFlota: GestorFlota;

  beforeEach(() => {
    gestorFlota = GestorFlota.getInstance();
    // Limpiamos los vehículos del singleton para cada test
    gestorFlota['vehiculos'] = [];
    
    reporte = new ReporteRentabilidadFlora();
  });

  it("El constructor de la clase 'ReporteRentabilidadFlora' debe instanciar un objeto de tipo 'ReporteRentabilidadFlora'", () => {
    expect(reporte).toBeInstanceOf(ReporteRentabilidadFlora);
  });

  it("El constructor de la clase 'ReporteRentabilidadFlora' debe instanciar un objeto de tipo 'ReporteBase'", () => {
    expect(reporte).toBeInstanceOf(ReporteBase);
  });

  it("getTitulo debe devolver correctamente el titulo del reporte", () => {
    const resultado = reporte.getTitulo();
    const resultadoEsperado = "Rentabilidad de la Flota - Vehiculo con mayor y menor rentabilidad";
    
    expect(resultado).toBe(resultadoEsperado);
    expect(typeof resultado).toBe('string');
  });

  it("generarReporte debe lanzar error si la flota esta vacia", () => {
    expect(() => {
      reporte.generarReporte();
    }).toThrow("Acción inválida: La flota esta vacia.");
  });

  it("generarReporte debe ejecutarse correctamente con un solo vehiculo sin reservas ni mantenimientos", () => {
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
    const fechaInicio = new Date('2024-01-10');
    const fechaFin = new Date('2024-01-15');
    const kilometraje = new Kilometraje();
    kilometraje.setKmsRecorridosPorDia(1, 50);
    const reserva = new Reserva(fechaInicio, fechaFin, kilometraje, vehiculo, cliente);
    
    vehiculo.getHistorialReservas().push(reserva);
    gestorFlota.agregarVehiculo(vehiculo);
    
    expect(() => {
      reporte.generarReporte();
    }).not.toThrow();
  });

  it("generarReporte debe ejecutarse correctamente con vehiculos que tienen mantenimientos", () => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    const estado = new EstadoDisponible();
    const mantenimiento = new Mantenimiento();
    const tarifa = new TarifaCompacto(estrategiaMock);
    const vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
    
    const registroMantenimiento = new RegistroMantenimiento(
      5000,
      new Date('2024-01-01'),
      new Date('2024-01-02'),
      1500,
      "Mantenimiento preventivo"
    );
    
    vehiculo.getMantenimiento().getHistorialMantenimientos().push(registroMantenimiento);
    gestorFlota.agregarVehiculo(vehiculo);
    
    expect(() => {
      reporte.generarReporte();
    }).not.toThrow();
  });

  it("generarReporte debe ejecutarse correctamente con vehiculos que tienen reservas y mantenimientos", () => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    const estado = new EstadoDisponible();
    const mantenimiento = new Mantenimiento();
    const tarifa = new TarifaCompacto(estrategiaMock);
    const vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
    
    // Agregar reserva
    const cliente = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
    const fechaInicio = new Date('2024-01-10');
    const fechaFin = new Date('2024-01-15');
    const kilometraje = new Kilometraje();
    kilometraje.setKmsRecorridosPorDia(1, 50);
    const reserva = new Reserva(fechaInicio, fechaFin, kilometraje, vehiculo, cliente);
    vehiculo.getHistorialReservas().push(reserva);
    
    // Agregar mantenimiento
    const registroMantenimiento = new RegistroMantenimiento(
      5000,
      new Date('2024-01-01'),
      new Date('2024-01-02'),
      1500,
      "Mantenimiento preventivo"
    );
    vehiculo.getMantenimiento().getHistorialMantenimientos().push(registroMantenimiento);
    
    gestorFlota.agregarVehiculo(vehiculo);
    
    expect(() => {
      reporte.generarReporte();
    }).not.toThrow();
  });

  it("generarReporte debe ejecutarse correctamente con multiples vehiculos con diferentes rentabilidades", () => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    
    // Vehículo 1: Alta rentabilidad (muchas reservas, poco mantenimiento)
    const vehiculo1 = new Compacto('ABC123', 'Toyota', 'Corolla', new EstadoDisponible(), new Mantenimiento(), new TarifaCompacto(estrategiaMock));
    const cliente1 = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
    const kilometraje1 = new Kilometraje();
    kilometraje1.setKmsRecorridosPorDia(1, 50);
    const reserva1 = new Reserva(new Date('2024-01-10'), new Date('2024-01-20'), kilometraje1, vehiculo1, cliente1);
    vehiculo1.getHistorialReservas().push(reserva1);
    
    // Vehículo 2: Baja rentabilidad (pocas reservas, mucho mantenimiento)
    const vehiculo2 = new Compacto('DEF456', 'Ford', 'Fusion', new EstadoDisponible(), new Mantenimiento(), new TarifaCompacto(estrategiaMock));
    const registroMantenimiento2 = new RegistroMantenimiento(5000, new Date('2024-01-01'), new Date('2024-01-02'), 5000, "Reparación mayor");
    vehiculo2.getMantenimiento().getHistorialMantenimientos().push(registroMantenimiento2);
    
    // Vehículo 3: Rentabilidad media
    const vehiculo3 = new Compacto('GHI789', 'Honda', 'Civic', new EstadoDisponible(), new Mantenimiento(), new TarifaCompacto(estrategiaMock));
    
    gestorFlota.agregarVehiculo(vehiculo1);
    gestorFlota.agregarVehiculo(vehiculo2);
    gestorFlota.agregarVehiculo(vehiculo3);
    
    expect(() => {
      reporte.generarReporte();
    }).not.toThrow();
  });
});