import Kilometraje from "../src/kilometraje";
import KmsRecorridosPorDiaRepetidoError from "../src/excepciones/kilometraje/kmsRecorridosPorDiaRepetidos";
import SinRegistrosDeKmsError from "../src/excepciones/kilometraje/sinRegistrosDeKmsError";


describe("Tests Clase Kilometraje", () => {
    let kilometraje: Kilometraje;

    beforeEach(() => {
        kilometraje = new Kilometraje();
    })

    it("El constructor de la clase 'Kilometraje' debe instanciar un objeto de tipo 'Kilometraje'", () => {
        expect(kilometraje).toBeInstanceOf(Kilometraje);
    })

    it("setKmsRecorridosPorDia debe agregar correctamente al mapa 'kmsRecorridosPorDia' los kilometros recorridos en el dia 'claveDia'", () => {
        kilometraje.setKmsRecorridosPorDia(1, 100);

        expect(kilometraje["kmsRecorridosPorDia"].get(1)).toBe(100);
    })

    it("setKmsRecorridosPorDia debe arrojar excepción 'KmsRecorridosPorDiaRepetidoError' si ya existe un registro de kilometros recorridos en el mapa para un dia con 'claveDia'", () => {
        try {
            kilometraje.setKmsRecorridosPorDia(1, 100);
            expect(kilometraje["kmsRecorridosPorDia"].size).toEqual(1);

            kilometraje.setKmsRecorridosPorDia(1, 100);
        }
        catch (error) {
            expect(error).toBeInstanceOf(KmsRecorridosPorDiaRepetidoError);

            if (error instanceof KmsRecorridosPorDiaRepetidoError) {
                expect(error.getMessage()).toEqual("Error 'KmsRecorridosPorDiaRepetidoError': Ya existen kilometros recorridos registrados para el dia con clave 1 - Codigo: 40901");
                expect(kilometraje["kmsRecorridosPorDia"].size).toEqual(1);
            }
        }
    })

    it("getKmsRecorridosPorDia debe devolver el mapa 'kmsRecorridosPorDia' vacío al crear una nueva instancia.", () => {
        const resultado = kilometraje.getKmsRecorridosPorDia();

        expect(resultado).toBeInstanceOf(Map);
        expect(resultado.size).toBe(0);
    })

    it("getKmsRecorridosPorDia debe devolver correctamente al mapa 'kmsRecorridosPorDia'", () => {
        const mapaKmsRecorridosPorDia = kilometraje["kmsRecorridosPorDia"];

        mapaKmsRecorridosPorDia.set(1, 100);
        mapaKmsRecorridosPorDia.set(2, 250);

        const resultado = kilometraje.getKmsRecorridosPorDia();

        expect(resultado).toBeInstanceOf(Map);
        expect(resultado.size).toBe(2);
        expect(resultado.get(1)).toBe(100);
        expect(resultado.get(2)).toBe(250);
    })

    it("calcularKmsTotalesRecorridos debe devolver correctamente la suma de todos los kilometros recorridos por dia en el mapa.", () => {
        const mapaKmsRecorridosPorDia = kilometraje["kmsRecorridosPorDia"];

        mapaKmsRecorridosPorDia.set(1, 100);
        mapaKmsRecorridosPorDia.set(2, 250);

        const resultado = kilometraje.calcularKmsTotalesRecorridos();
        const resultadoEsperado = 350;

        expect(typeof resultado).toBe("number")
        expect(resultado).toEqual(resultadoEsperado);

    })

    it("calcularKmsTotalesRecorridos debe arrojar excepción 'SinRegistrosDeKmsError' si no exiten registros en el mapa para calcular los kilometros totales recorridos.", () => {
        try {
            const mapaKmsRecorridosPorDia = kilometraje["kmsRecorridosPorDia"];
            expect(mapaKmsRecorridosPorDia.size).toEqual(0);

            kilometraje.calcularKmsTotalesRecorridos();
        }
        catch (error) {
            expect(error).toBeInstanceOf(SinRegistrosDeKmsError);
            if (error instanceof SinRegistrosDeKmsError) {

                expect(error.getMessage()).toEqual("Error 'SinRegistrosDeKmsError': No hay kilometros registrados: el mapa de kilometros recorridos esta vacio - Codigo: 40402");
            }
        }
    })
})

