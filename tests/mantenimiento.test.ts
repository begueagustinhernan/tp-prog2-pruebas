import { Mantenimiento } from "../src/mantenimiento";
import { RegistroMantenimiento } from "../src/registroMantenimiento";

describe("Tests Clase Mantenimiento", () => {
    let mantenimiento: Mantenimiento;
    let dateNowSpy: jest.SpyInstance;
    const FECHA_ACTUAL_MOCK = new Date('2025-10-25T12:00:00.000Z');

    beforeEach(() => {
        mantenimiento = new Mantenimiento()
        dateNowSpy = jest.spyOn(global.Date, 'now').mockReturnValue(FECHA_ACTUAL_MOCK.getTime());
        jest.spyOn(console, 'log').mockImplementation(() => { });
    })

    afterEach(() => {
        dateNowSpy.mockRestore();
        jest.restoreAllMocks();
    });

    it("El constructor de la clase 'Mantenimiento' debe instanciar un objeto de tipo 'Mantenimiento'", () => {
        expect(mantenimiento).toBeInstanceOf(Mantenimiento);
    });

    it("getKmUltimoMantenimiento debe devolver el valor actual del atributo 'kmUltimoMantenimiento' correctamente", () => {
        mantenimiento["kmUltimoMantenimiento"] = 150;

        expect(typeof (mantenimiento.getKmUltimoMantenimiento())).toBe("number");
        expect(mantenimiento.getKmUltimoMantenimiento()).toEqual(150);
    });

    it("getFechaUltimoMantenimiento debe devolver el valor actual del atributo 'fechaUltimoMantenimiento' correctamente", () => {
        mantenimiento["fechaUltimoMantenimiento"] = new Date(2025, 9, 4);

        expect(mantenimiento.getFechaUltimoMantenimiento()).toBeInstanceOf(Date);
        expect(mantenimiento.getFechaUltimoMantenimiento()).toEqual(new Date(2025, 9, 4));
    });

    it("getFechaInicioMantenimientoActual debe devolver el valor actual del atributo 'fechaInicioMantenimientoActual', si se lo asignó del tipo Date, correctamente", () => {
        mantenimiento["fechaInicioMantenimientoActual"] = new Date(2025, 10, 4);

        expect(mantenimiento.getFechaInicioMantenimientoActual()).toBeInstanceOf(Date);
        expect(mantenimiento.getFechaInicioMantenimientoActual()).toEqual(new Date(2025, 10, 4));
    });

    it("getFechaInicioMantenimientoActual debe devolver el valor actual del atributo 'fechaInicioMantenimientoActual', si se lo asignó del tipo Null, correctamente", () => {
        mantenimiento["fechaInicioMantenimientoActual"] = null

        expect(mantenimiento.getFechaInicioMantenimientoActual()).toBeNull();
    });

    it("getFechaEstimadaFin debe devolver el valor actual del atributo 'fechaEstimadaFin', si se lo asignó del tipo Date, correctamente", () => {
        mantenimiento["fechaEstimadaFin"] = new Date(2025, 10, 5)

        expect(mantenimiento.getFechaEstimadaFin()).toBeInstanceOf(Date);
        expect(mantenimiento.getFechaEstimadaFin()).toEqual(new Date(2025, 10, 5));
    });

    it("getFechaEstimadaFin debe devolver el valor actual del atributo 'fechaEstimadaFin', si se lo asignó del tipo Null, correctamente", () => {
        mantenimiento["fechaInicioMantenimientoActual"] = null

        expect(mantenimiento.getFechaEstimadaFin()).toBeNull();
    });

    it("getCantidadAlquileres debe devolver el valor actual del atributo 'cantidadAlquileres' correctamente", () => {
        mantenimiento["cantidadAlquileres"] = 7;

        expect(typeof (mantenimiento.getCantidadAlquileres())).toBe("number");
        expect(mantenimiento.getCantidadAlquileres()).toEqual(7);
    });

    it("getHistorialMantenimientos debe devolver el array vacío al inicio", () => {
        expect(mantenimiento.getHistorialMantenimientos()).toBeInstanceOf(Array);
        expect(mantenimiento.getHistorialMantenimientos()).toHaveLength(0);
    });

    it("getHistorialMantenimientos debe devolver el array con registros si se le agregaron correctamente", () => {
        const registroMock: RegistroMantenimiento = {} as RegistroMantenimiento;

        mantenimiento["historialMantenimientos"].push(registroMock);
        mantenimiento["historialMantenimientos"].push(registroMock);

        expect(mantenimiento.getHistorialMantenimientos()).toBeInstanceOf(Array);
        expect(mantenimiento.getHistorialMantenimientos()).toHaveLength(2);
    });

    it("setKmUltimoMantenimiento debe actualizar el valor del atributo 'kmUltimoMantenimiento' correctamente", () => {
        mantenimiento.setKmUltimoMantenimiento(30000);

        expect(typeof (mantenimiento.getKmUltimoMantenimiento())).toBe("number");
        expect(mantenimiento["kmUltimoMantenimiento"]).toEqual(30000);
    });

    it("setFechaUltimoMantenimiento debe actualizar el valor del atributo 'fechaUltimoMantenimiento' correctamente", () => {
        const nuevaFecha = new Date(2024, 5, 15);
        mantenimiento.setFechaUltimoMantenimiento(nuevaFecha);

        expect(mantenimiento["fechaUltimoMantenimiento"]).toBeInstanceOf(Date);
        expect(mantenimiento["fechaUltimoMantenimiento"]).toEqual(nuevaFecha);
    });

    it("setFechaInicioMantenimiento debe actualizar el valor del atributo 'fechaInicioMantenimientoActual' correctamente", () => {
        const fechaInicio = new Date(2025, 11, 10);
        mantenimiento.setFechaInicioMantenimiento(fechaInicio);

        expect(mantenimiento["fechaInicioMantenimientoActual"]).toBeInstanceOf(Date);
        expect(mantenimiento["fechaInicioMantenimientoActual"]).toEqual(fechaInicio);
    });

    it("setFechaEstimadaFin debe actualizar el valor del atributo 'fechaEstimadaFin' correctamente", () => {
        const fechaEstimada = new Date(2025, 11, 11);
        mantenimiento.setFechaEstimadaFin(fechaEstimada);

        expect(mantenimiento["fechaEstimadaFin"]).toBeInstanceOf(Date);
        expect(mantenimiento["fechaEstimadaFin"]).toEqual(fechaEstimada);
    });

    it("setCantidadAlquileres debe actualizar el valor del atributo 'cantidadAlquileres' correctamente", () => {
        mantenimiento.setCantidadAlquileres(10);

        expect(typeof (mantenimiento["cantidadAlquileres"])).toBe("number");
        expect(mantenimiento["cantidadAlquileres"]).toEqual(10);
    });

    it("registrarAlquilerCompletado debe incrementar en uno el valor del atributo 'cantidadAlquileres' correctamente", () => {
        mantenimiento["cantidadAlquileres"] = 4

        mantenimiento.registrarAlquilerCompletado();

        expect(typeof (mantenimiento["cantidadAlquileres"])).toBe("number");
        expect(mantenimiento["cantidadAlquileres"]).toEqual(5);
    });

    it("verificarNecesidadMantenimiento debe retornar true correctamente si excede el kilometraje del disparador", () => {

        mantenimiento["kmUltimoMantenimiento"] = 50000;
        const KM_ULTIMO = mantenimiento["kmUltimoMantenimiento"];
        const KM_ACTUAL = KM_ULTIMO + 11000;

        mantenimiento["cantidadAlquileres"] = 0;

        expect(mantenimiento.verificarNecesidadMantenimiento(KM_ACTUAL)).toBe(true);
    });

    it("verificarNecesidadMantenimiento debe retornar false correctamente si NO alcanza el kilometraje del disparador", () => {

        mantenimiento["kmUltimoMantenimiento"] = 5000;
        const KM_ULTIMO = mantenimiento["kmUltimoMantenimiento"];
        const KM_ACTUAL = KM_ULTIMO + 3500;

        mantenimiento["cantidadAlquileres"] = 0;

        expect(mantenimiento.verificarNecesidadMantenimiento(KM_ACTUAL)).toBe(false);
    });

    it("verificarNecesidadMantenimiento debe retornar true correctamente si excede la cantidad de alquileres del disparador", () => {

        mantenimiento["cantidadAlquileres"] = 6;
        mantenimiento["kmUltimoMantenimiento"] = 0;

        expect(mantenimiento.verificarNecesidadMantenimiento(1)).toBe(true);

    });

    it("verificarNecesidadMantenimiento debe retornar false correctamente si la cantidad de alquileres es cuanto mucho 5", () => {

        mantenimiento["cantidadAlquileres"] = 5;
        mantenimiento["kmUltimoMantenimiento"] = 0;

        expect(mantenimiento.verificarNecesidadMantenimiento(1)).toBe(false);

        mantenimiento["cantidadAlquileres"] = 4;
        expect(mantenimiento.verificarNecesidadMantenimiento(1)).toBe(false);

    });

    it("verificarNecesidadMantenimiento debe retornar true si han pasado 12 meses o más desde el último mantenimiento", () => {
        const DOCE_MESES_MS = 1000 * 60 * 60 * 24 * 30.4375 * 12;
        const FECHA_VIEJA = new Date(FECHA_ACTUAL_MOCK.getTime() - DOCE_MESES_MS);

        mantenimiento["fechaUltimoMantenimiento"] = FECHA_VIEJA;
        mantenimiento["kmUltimoMantenimiento"] = 0;
        mantenimiento["cantidadAlquileres"] = 4;

        expect(mantenimiento.verificarNecesidadMantenimiento(1)).toBe(true);
    });

    it("verificarNecesidadMantenimiento debe retornar false si NO han pasado 12 meses desde el último mantenimiento", () => {
        const ONCE_MESES_MS = 1000 * 60 * 60 * 24 * 30.4375 * 11;
        const FECHA_RECIENTE = new Date(FECHA_ACTUAL_MOCK.getTime() - ONCE_MESES_MS);

        mantenimiento["fechaUltimoMantenimiento"] = FECHA_RECIENTE;
        mantenimiento["kmUltimoMantenimiento"] = 0;
        mantenimiento["cantidadAlquileres"] = 4;

        expect(mantenimiento.verificarNecesidadMantenimiento(1)).toBe(false);
    });

    it("verificarNecesidadMantenimiento debe retornar false si NINGUNA disparador de mantenimiento se cumple", () => {

        mantenimiento["kmUltimoMantenimiento"] = 0;
        mantenimiento["cantidadAlquileres"] = 2;

        expect(mantenimiento.verificarNecesidadMantenimiento(5000)).toBe(false);
    });

    it("iniciarRegistroMantenimiento debe establecer la fecha de inicio y la fecha estimada de fin del mantenimiento correctamente", () => {
        const FECHA_INICIO = new Date('2025-12-01T10:00:00.000Z');

        mantenimiento.iniciarRegistroMantenimiento(FECHA_INICIO);

        const FECHA_FIN = new Date(FECHA_INICIO.getTime() + (24 * 60 * 60 * 1000));

        expect(mantenimiento["fechaEstimadaFin"]).toBeInstanceOf(Date);
        expect(mantenimiento["fechaEstimadaFin"]).toEqual(FECHA_FIN)
    });

    it("puedeFinalizar debe retornar true si la fecha actual es IGUAL a la fecha estimada de fin", () => {
        const FECHA_FIN_ESTIMADA = new Date('2025-12-02T10:00:00.000Z');

        mantenimiento["fechaEstimadaFin"] = FECHA_FIN_ESTIMADA;
        const FECHA_ACTUAL = new Date('2025-12-02T10:00:00.000Z');
        expect(mantenimiento.puedeFinalizar(FECHA_ACTUAL)).toBe(true);
    });

    it("puedeFinalizar debe retornar true si la fecha actual es POSTERIOR a la fecha estimada de fin", () => {
        const FECHA_FIN_ESTIMADA = new Date('2025-12-02T10:00:00.000Z');

        mantenimiento["fechaEstimadaFin"] = FECHA_FIN_ESTIMADA;
        const FECHA_ACTUAL_POSTERIOR = new Date('2025-12-02T10:00:01.000Z');
        expect(mantenimiento.puedeFinalizar(FECHA_ACTUAL_POSTERIOR)).toBe(true);
    });

    it("puedeFinalizar debe retornar false si la fecha actual es ANTERIOR a la fecha estimada de fin", () => {
        const FECHA_FIN_ESTIMADA = new Date('2025-12-02T10:00:00.000Z');

        mantenimiento["fechaEstimadaFin"] = FECHA_FIN_ESTIMADA;
        const FECHA_ACTUAL_ANTERIOR = new Date('2025-12-02T09:59:59.000Z');
        expect(mantenimiento.puedeFinalizar(FECHA_ACTUAL_ANTERIOR)).toBe(false);
    });

    it("puedeFinalizar debe retornar false si no existe una fecha estimada de fin, es decir es de tipo Null", () => {
        mantenimiento["fechaEstimadaFin"] = null;

        expect(mantenimiento.getFechaEstimadaFin()).toBeNull();
        expect(mantenimiento.puedeFinalizar(new Date())).toBe(false);
    });

    it("finalizarRegistroMantenimiento debe finalizar el registro, actualizar el estado y agregar un registro al historial", () => {
        const KM_INICIAL = 10000;
        const KM_FINAL = 10500;
        const COSTO = 500;
        const FECHA_INICIO = new Date('2025-11-05T08:00:00.000Z');
        const FECHA_FIN = new Date('2025-11-05T12:00:00.000Z');

        mantenimiento["kmUltimoMantenimiento"] = KM_INICIAL;
        mantenimiento["cantidadAlquileres"] = 3;
        mantenimiento["fechaInicioMantenimientoActual"] = FECHA_INICIO
        mantenimiento["fechaEstimadaFin"] = FECHA_FIN

        mantenimiento.finalizarRegistroMantenimiento(COSTO, mantenimiento["fechaEstimadaFin"], KM_FINAL);

        expect(mantenimiento["historialMantenimientos"]).toHaveLength(1);
        expect(mantenimiento["kmUltimoMantenimiento"]).toEqual(KM_FINAL);
        expect(mantenimiento["fechaUltimoMantenimiento"]).toEqual(FECHA_FIN);
        expect(mantenimiento["cantidadAlquileres"]).toEqual(0);
        expect(mantenimiento["fechaInicioMantenimientoActual"]).toBeNull();

        const registroGuardado = mantenimiento["historialMantenimientos"][0];
        expect(registroGuardado).toBeInstanceOf(RegistroMantenimiento);
    });

    it("finalizarRegistroMantenimiento debe arrojar excepción si no hay un registro de inicio", () => {
        const COSTO = 500;
        const KM_FINAL = 10500;
        const FECHA_FIN = new Date('2025-11-05T12:00:00.000Z');

        expect(mantenimiento["fechaInicioMantenimientoActual"]).toBeNull();

        try {
            mantenimiento.finalizarRegistroMantenimiento(COSTO, FECHA_FIN, KM_FINAL);
            fail("Se esperaba una excepción, pero no fue lanzada.");
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toEqual("No se puede finalizar el mantenimiento sin un registro de inicio.");

            expect(mantenimiento.getHistorialMantenimientos()).toHaveLength(0);
        }
    });
})