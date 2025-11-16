import { EstadoDisponible } from '../../src/vehiculo/estados/estadoDisponible';
import { EstadoEnAlquiler } from '../../src/vehiculo/estados/estadoEnAlquiler';
import { EstadoEnMantenimiento } from '../../src/vehiculo/estados/estadoEnMantenimiento';
import Reserva from '../../src/reserva';
import { Compacto } from '../../src/vehiculo/compacto';
import TarifaCompacto from '../../src/tarifa/tarifaCompacto';
import { Mantenimiento } from '../../src/mantenimiento';
import Cliente from '../../src/cliente';
import Kilometraje from '../../src/kilometraje';

describe("Tests Clase EstadoDisponible", () => {
  
  let estado: EstadoDisponible;

  beforeEach(() => {
    estado = new EstadoDisponible();
  });

  it("El constructor de la clase 'EstadoDisponible' debe instanciar un objeto de tipo 'EstadoDisponible'", () => {
    expect(estado).toBeInstanceOf(EstadoDisponible);
  });

  it("La clase 'EstadoDisponible' debe implementar el método alquilar", () => {
    expect(typeof estado.alquilar).toBe('function');
  });

  it("La clase 'EstadoDisponible' debe implementar el método devolver", () => {
    expect(typeof estado.devolver).toBe('function');
  });

  it("La clase 'EstadoDisponible' debe implementar el método iniciarMantenimiento", () => {
    expect(typeof estado.iniciarMantenimiento).toBe('function');
  });

  it("La clase 'EstadoDisponible' debe implementar el método finalizarMantenimiento", () => {
    expect(typeof estado.finalizarMantenimiento).toBe('function');
  });
});

describe("Tests Clase EstadoEnMantenimiento", () => {
  
  let estado: EstadoEnMantenimiento;

  beforeEach(() => {
    estado = new EstadoEnMantenimiento();
  });

  it("El constructor de la clase 'EstadoEnMantenimiento' debe instanciar un objeto de tipo 'EstadoEnMantenimiento'", () => {
    expect(estado).toBeInstanceOf(EstadoEnMantenimiento);
  });

  it("La clase 'EstadoEnMantenimiento' debe implementar el método alquilar", () => {
    expect(typeof estado.alquilar).toBe('function');
  });

  it("La clase 'EstadoEnMantenimiento' debe implementar el método devolver", () => {
    expect(typeof estado.devolver).toBe('function');
  });

  it("La clase 'EstadoEnMantenimiento' debe implementar el método iniciarMantenimiento", () => {
    expect(typeof estado.iniciarMantenimiento).toBe('function');
  });

  it("La clase 'EstadoEnMantenimiento' debe implementar el método finalizarMantenimiento", () => {
    expect(typeof estado.finalizarMantenimiento).toBe('function');
  });
});

describe("Tests Clase EstadoEnAlquiler", () => {
  
  let estado: EstadoEnAlquiler;
  let vehiculo: Compacto;
  let cliente: Cliente;
  let reserva: Reserva;

  beforeEach(() => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    const estadoDisponible = new EstadoDisponible();
    const mantenimiento = new Mantenimiento();
    const tarifa = new TarifaCompacto(estrategiaMock);
    
    vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estadoDisponible, mantenimiento, tarifa);
    cliente = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
    reserva = new Reserva(new Date(), new Date(), new Kilometraje(), vehiculo, cliente);
    
    estado = new EstadoEnAlquiler(reserva);
  });

  it("El constructor de la clase 'EstadoEnAlquiler' debe instanciar un objeto de tipo 'EstadoEnAlquiler'", () => {
    expect(estado).toBeInstanceOf(EstadoEnAlquiler);
  });

  it("La clase 'EstadoEnAlquiler' debe implementar el método alquilar", () => {
    expect(typeof estado.alquilar).toBe('function');
  });

  it("La clase 'EstadoEnAlquiler' debe implementar el método devolver", () => {
    expect(typeof estado.devolver).toBe('function');
  });

  it("La clase 'EstadoEnAlquiler' debe implementar el método iniciarMantenimiento", () => {
    expect(typeof estado.iniciarMantenimiento).toBe('function');
  });

  it("La clase 'EstadoEnAlquiler' debe implementar el método finalizarMantenimiento", () => {
    expect(typeof estado.finalizarMantenimiento).toBe('function');
  });
});