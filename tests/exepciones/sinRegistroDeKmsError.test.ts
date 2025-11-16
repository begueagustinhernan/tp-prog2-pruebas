import KmsRecorridosPorDiaRepetidoError from "../../src/excepciones/kilometraje/kmsRecorridosPorDiaRepetidos";

describe("KmsRecorridosPorDiaRepetidoError Tests", () => {

    test("Debe crear correctamente la excepción con todos los campos", () => {

        const claveDia = 15;
        const mensaje = "mensaje ignorado por el constructor";
        const codigo = 40901;

        const error = new KmsRecorridosPorDiaRepetidoError(claveDia, mensaje, codigo);

        expect(error).toBeInstanceOf(KmsRecorridosPorDiaRepetidoError);
        expect(error.name).toBe("KmsRecorridosPorDiaRepetidoError");

        expect(error.errorCode).toBe(codigo);

        expect(error.message)
            .toBe(`Ya existen kilometros recorridos registrados para el dia con clave ${claveDia}`);
    });

    test("getMessage() debe devolver el mensaje formateado correctamente", () => {

        const error = new KmsRecorridosPorDiaRepetidoError(7, "x");

        const resultado = error.getMessage();

        expect(resultado)
            .toBe(
                `Error 'KmsRecorridosPorDiaRepetidoError': Ya existen kilometros recorridos registrados para el dia con clave 7 - Codigo: 40901`
            );
    });

})