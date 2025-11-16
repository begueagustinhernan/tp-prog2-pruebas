import { Compacto } from '../src/vehiculo/compacto';
import { Sedan } from '../src/vehiculo/sedan';
import { SUV } from '../src/vehiculo/suv';
import { Vehiculo } from '../src/vehiculo/vehiculo';
import TarifaCompacto from '../src/tarifa/tarifaCompacto';
import TarifaSedan from '../src/tarifa/tarifaSedan';
import TarifaSUV from '../src/tarifa/tarifaSuv';
import { Mantenimiento } from '../src/mantenimiento';
import { EstadoDisponible } from '../src/vehiculo/estados/estadoDisponible';
import { EstadoEnMantenimiento } from '../src/vehiculo/estados/estadoEnMantenimiento';
import TemporadaMedia from '../src/temporadas/temporadaMedia';
import Cliente from '../src/cliente';

describe("Tests Clase Vehiculo", () => {

  // TESTS PARAMETRIZADOS - CREACIÓN DE INSTANCIAS
  
  describe.each([
    { 
      Clase: Compacto, 
      TarifaClase: TarifaCompacto,
      tipo: 'Compacto',
      matricula: 'ABC123',
      marca: 'Toyota',
      modelo: 'Corolla'
    },
    { 
      Clase: Sedan, 
      TarifaClase: TarifaSedan,
      tipo: 'Sedan',
      matricula: 'DEF456',
      marca: 'Ford',
      modelo: 'Fusion'
    },
    { 
      Clase: SUV, 
      TarifaClase: TarifaSUV,
      tipo: 'SUV',
      matricula: 'GHI789',
      marca: 'Jeep',
      modelo: 'Grand Cherokee'
    }
  ])("Creación de vehículo $tipo", ({ Clase, TarifaClase, tipo, matricula, marca, modelo }) => {
    
    let vehiculo: Vehiculo;

    beforeEach(() => {
      const estrategiaMock = {
        ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
      };
      const estado = new EstadoDisponible();
      const mantenimiento = new Mantenimiento();
      const tarifa = new TarifaClase(estrategiaMock);
      
      vehiculo = new Clase(matricula, marca, modelo, estado, mantenimiento, tarifa);
    });

    it(`El constructor de la clase '${tipo}' debe instanciar un objeto de tipo '${tipo}'`, () => {
      expect(vehiculo).toBeInstanceOf(Clase);
    });

    it(`El constructor de la clase '${tipo}' debe instanciar un objeto de tipo 'Vehiculo'`, () => {
      expect(vehiculo).toBeInstanceOf(Vehiculo);
    });
  });

  // TESTS DE MÉTODOS - SOLO CON COMPACTO

  describe("Métodos de Vehiculo (probados con Compacto)", () => {
    
    let vehiculo: Compacto;
    let tarifa: TarifaCompacto;
    let estado: EstadoDisponible;
    let mantenimiento: Mantenimiento;

    beforeEach(() => {
      const estrategiaMock = {
        ajustarTarifaBase: jest.fn((tarifaBase: number) => tarifaBase)
      };
      estado = new EstadoDisponible();
      mantenimiento = new Mantenimiento();
      tarifa = new TarifaCompacto(estrategiaMock);
      
      vehiculo = new Compacto('ABC123', 'Toyota', 'Corolla', estado, mantenimiento, tarifa);
    });

    it("getMatricula debe devolver correctamente la matricula del vehiculo", () => {
      const resultado = vehiculo.getMatricula();
      const resultadoEsperado = 'ABC123';
      
      expect(resultado).toBe(resultadoEsperado);
      expect(typeof resultado).toBe('string');
    });

    it("getMarca debe devolver correctamente la marca del vehiculo", () => {
      const resultado = vehiculo.getMarca();
      const resultadoEsperado = 'Toyota';
      
      expect(resultado).toBe(resultadoEsperado);
      expect(typeof resultado).toBe('string');
    });

    it("getModelo debe devolver correctamente el modelo del vehiculo", () => {
      const resultado = vehiculo.getModelo();
      const resultadoEsperado = 'Corolla';
      
      expect(resultado).toBe(resultadoEsperado);
      expect(typeof resultado).toBe('string');
    });

    it("getEstado debe devolver correctamente el estado del vehiculo", () => {
      const resultado = vehiculo.getEstado();
      
      expect(resultado).toBeInstanceOf(EstadoDisponible);
    });

    it("getKilometrajeTotal debe devolver correctamente el kilometraje total del vehiculo", () => {
      const resultado = vehiculo.getKilometrajeTotal();
      const resultadoEsperado = 0;
      
      expect(resultado).toBe(resultadoEsperado);
      expect(typeof resultado).toBe('number');
    });

    it("getMantenimiento debe devolver correctamente la instancia de Mantenimiento del vehiculo", () => {
      const resultado = vehiculo.getMantenimiento();
      
      expect(resultado).toBeInstanceOf(Mantenimiento);
    });

    it("getTarifa debe devolver correctamente la tarifa del vehiculo", () => {
      const resultado = vehiculo.getTarifa();
      
      expect(resultado).toBeInstanceOf(TarifaCompacto);
    });

    it("setEstado debe cambiar correctamente el estado del vehiculo", () => {
      const nuevoEstado = new EstadoEnMantenimiento();
      vehiculo.setEstado(nuevoEstado);
      
      const resultado = vehiculo.getEstado();
      expect(resultado).toBeInstanceOf(EstadoEnMantenimiento);
    });

    it("setKilometrajeTotal debe actualizar correctamente el kilometraje total del vehiculo", () => {
      vehiculo.setKilometrajeTotal(5000);
      
      const resultado = vehiculo.getKilometrajeTotal();
      expect(resultado).toBe(5000);
    });

    it("iniciarMantenimiento debe cambiar el estado del vehiculo a 'En Mantenimiento'", () => {
      const fechaInicio = new Date();
      
      vehiculo.iniciarMantenimiento(fechaInicio);
      
      expect(vehiculo.getEstado()).toBeInstanceOf(EstadoEnMantenimiento);
    });

    it("iniciarMantenimiento debe lanzar error si el vehiculo ya esta en mantenimiento", () => {
      const fechaInicio = new Date();
      vehiculo.iniciarMantenimiento(fechaInicio);
      
      expect(() => {
        vehiculo.iniciarMantenimiento(fechaInicio);
      }).toThrow();
    });

    it("alquilar debe lanzar error si el vehiculo esta en mantenimiento", () => {
      const fechaInicio = new Date();
      vehiculo.iniciarMantenimiento(fechaInicio);
      
      const cliente = new Cliente(1, 'Juan', 'Pérez', 'juan@mail.com', 123456, null as any);
      const fechaAlquiler = new Date();
      const fechaFin = new Date(fechaAlquiler.getTime() + 3 * 24 * 60 * 60 * 1000);
      
      expect(() => {
        vehiculo.alquilar(cliente, fechaAlquiler, fechaFin);
      }).toThrow();
    });
  });
});