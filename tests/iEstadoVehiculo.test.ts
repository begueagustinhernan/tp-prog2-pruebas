import { IEstadoVehiculo } from '../src/vehiculo/estados/iEstadoVehiculo';
import { EstadoDisponible } from '../src/vehiculo/estados/estadoDisponible';
import { EstadoEnAlquiler } from '../src/vehiculo/estados/estadoEnAlquiler';
import { EstadoEnMantenimiento } from '../src/vehiculo/estados/estadoEnMantenimiento';
import Reserva from '../src/reserva';
import { Compacto } from '../src/vehiculo/compacto';
import TarifaCompacto from '../src/tarifa/tarifaCompacto';
import { Mantenimiento } from '../src/mantenimiento';
import Cliente from '../src/cliente';
import Kilometraje from '../src/kilometraje';

describe("Tests Interfaz IEstadoVehiculo", () => {

  describe.each([
    { 
      Clase: EstadoDisponible, 
      tipo: 'EstadoDisponible',
      requiereReserva: false
    },
    { 
      Clase: EstadoEnMantenimiento, 
      tipo: 'EstadoEnMantenimiento',
      requiereReserva: false
    }
  ])("Implementación de IEstadoVehiculo en $tipo", ({ Clase, tipo, requiereReserva }) => {
    
    let estado: IEstadoVehiculo;

    beforeEach(() => {
      if (requiereReserva) {
        // EstadoEnAlquiler requiere una reserva en el constructor
        const estrategiaMock = {
          ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
        };
        const estadoDisponible = new EstadoDisponible();
        const mantenimiento = new Mantenimiento();
        const tarifa = new TarifaCompacto(estrategiaMock);
        const vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estadoDisponible, mantenimiento, tarifa);
        const cliente = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
        const reserva = new Reserva(new Date(), new Date(), new Kilometraje(), vehiculo, cliente);
        
        estado = new EstadoEnAlquiler(reserva);
      } else {
        estado = new Clase();
      }
    });

    it(`La clase '${tipo}' debe implementar la interfaz IEstadoVehiculo`, () => {
      expect(estado).toBeDefined();
      expect(typeof estado.alquilar).toBe('function');
      expect(typeof estado.devolver).toBe('function');
      expect(typeof estado.iniciarMantenimiento).toBe('function');
      expect(typeof estado.finalizarMantenimiento).toBe('function');
    });
  });

  describe("EstadoEnAlquiler implementa IEstadoVehiculo", () => {
    let estado: IEstadoVehiculo;

    beforeEach(() => {
      const estrategiaMock = {
        ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
      };
      const estadoDisponible = new EstadoDisponible();
      const mantenimiento = new Mantenimiento();
      const tarifa = new TarifaCompacto(estrategiaMock);
      const vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estadoDisponible, mantenimiento, tarifa);
      const cliente = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
      const reserva = new Reserva(new Date(), new Date(), new Kilometraje(), vehiculo, cliente);
      
      estado = new EstadoEnAlquiler(reserva);
    });

    it("La clase 'EstadoEnAlquiler' debe implementar la interfaz IEstadoVehiculo", () => {
      expect(estado).toBeDefined();
      expect(typeof estado.alquilar).toBe('function');
      expect(typeof estado.devolver).toBe('function');
      expect(typeof estado.iniciarMantenimiento).toBe('function');
      expect(typeof estado.finalizarMantenimiento).toBe('function');
    });
  });
});