import { EstadoBase } from '../../src/vehiculo/estados/estadoBase';
import { Vehiculo } from '../../src/vehiculo/vehiculo';
import { Compacto } from '../../src/vehiculo/compacto';
import TarifaCompacto from '../../src/tarifa/tarifaCompacto';
import { Mantenimiento } from '../../src/mantenimiento';
import { EstadoDisponible } from '../../src/vehiculo/estados/estadoDisponible';
import Cliente from '../../src/cliente';

// Clase concreta de prueba para testear EstadoBase
class EstadoBasePrueba extends EstadoBase {
  constructor(nombreEstado: string) {
    super();
    this.nombreEstado = nombreEstado;
  }
}

describe("Tests Clase EstadoBase", () => {
  
  let estadoBase: EstadoBase;
  let vehiculo: Vehiculo;
  let cliente: Cliente;

  beforeEach(() => {
    const estrategiaMock = {
      ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
    };
    const estado = new EstadoDisponible();
    const mantenimiento = new Mantenimiento();
    const tarifa = new TarifaCompacto(estrategiaMock);
    
    vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
    cliente = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
    estadoBase = new EstadoBasePrueba('Estado de Prueba');
  });

  it("getNombreEstado debe devolver correctamente el nombre del estado", () => {
    const resultado = estadoBase.getNombreEstado();
    const resultadoEsperado = 'Estado de Prueba';
    
    expect(resultado).toBe(resultadoEsperado);
    expect(typeof resultado).toBe('string');
  });

  it("alquilar debe lanzar error con mensaje descriptivo", () => {
    const fechaInicio = new Date();
    const fechaFin = new Date();
    
    expect(() => {
      estadoBase.alquilar(vehiculo, cliente, fechaInicio, fechaFin);
    }).toThrow('Acción inválida: No se puede Alquilar un vehículo en estado "Estado de Prueba".');
  });

  it("devolver debe lanzar error con mensaje descriptivo", () => {
    expect(() => {
      estadoBase.devolver(vehiculo);
    }).toThrow('Acción inválida: No se puede Devolver un vehículo en estado "Estado de Prueba".');
  });

  it("iniciarMantenimiento debe lanzar error con mensaje descriptivo", () => {
    const fechaInicio = new Date();
    
    expect(() => {
      estadoBase.iniciarMantenimiento(vehiculo, fechaInicio);
    }).toThrow('Acción inválida: No se puede Iniciar Mantenimiento un vehículo en estado "Estado de Prueba".');
  });

  it("finalizarMantenimiento debe lanzar error con mensaje descriptivo", () => {
    const costo = 1500;
    const fechaFin = new Date();
    
    expect(() => {
      estadoBase.finalizarMantenimiento(vehiculo, costo, fechaFin);
    }).toThrow('Acción inválida: No se puede Finalizar Mantenimiento un vehículo en estado "Estado de Prueba".');
  });
});