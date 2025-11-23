import KmsRecorridosPorDiaRepetidoError from "./excepciones/kilometraje/kmsRecorridosPorDiaRepetidos";
import SinRegistrosDeKmsError from "./excepciones/kilometraje/sinRegistrosDeKmsError";

/**
 * Clase que gestiona y almacena los kilómetros recorridos por un vehículo
 * a lo largo de los días de una reserva.
 *
 * Utiliza un mapa para asociar una clave de día con la distancia en kilómetros recorrida ese día.
 */
export default class Kilometraje {

    /**
     * Mapa que almacena los kilómetros recorridos.
     * La clave es el identificador del día y el valor son los kilómetros recorridos.
     * @private
     * @type {Map<number, number>}
     */
    private kmsRecorridosPorDia: Map<number, number> = new Map;

    /**
     * Registra los kilómetros recorridos para un día específico.
     * Garantiza que no se puedan registrar kilómetros dos veces para la misma clave de día.
     *
     * @param {number} claveDia - Identificador numérico del día (ej: 1 para el primer día).
     * @param {number} kmsRecorridos - Cantidad de kilómetros recorridos durante ese día.
     * @throws {KmsRecorridosPorDiaRepetidoError} Si ya existe un registro de kilómetros para la clave de día especificada.
     */
    public setKmsRecorridosPorDia(claveDia: number, kmsRecorridos: number): void {
        if (this.kmsRecorridosPorDia.has(claveDia)) {
            throw new KmsRecorridosPorDiaRepetidoError(claveDia, `Ya existen kilometros recorridos registrados para el dia con clave ${claveDia}`);
        }
        else {
            this.kmsRecorridosPorDia.set(claveDia, kmsRecorridos);
        }
    }

    /**
     * Obtiene el mapa completo de kilómetros registrados por día.
     *
     * @returns {Map<number, number>} Mapa con los días como clave y los kilómetros como valor.
     */
    public getKmsRecorridosPorDia(): Map<number, number> {
        return this.kmsRecorridosPorDia;
    }

    /**
     * Calcula la suma total de todos los kilómetros registrados en el mapa.
     *
     * @returns {number} El total acumulado de kilómetros recorridos.
     * @throws {SinRegistrosDeKmsError} Si el mapa de registros está vacío y no se pueden calcular los totales.
     */
    public calcularKmsTotalesRecorridos(): number {
        let kmsTotales = 0;
        if (this.kmsRecorridosPorDia.size > 0) {
            for (const kmsRecorridos of this.kmsRecorridosPorDia.values()) {
                kmsTotales += kmsRecorridos;
            }
            return kmsTotales;
        }
        else {
            throw new SinRegistrosDeKmsError("No hay kilometros registrados: el mapa de kilometros recorridos esta vacio")
        }

    }
}


