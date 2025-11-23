/**
 * Clase de excepción personalizada que se lanza cuando se intenta registrar
 * el kilometraje recorrido para un día específico (claveDia) y ya existe un
 * registro previo para esa misma clave dentro de una instancia de Kilometraje.
 */
export default class KmsRecorridosPorDiaRepetidoError extends Error {

    /**
     * Código de error específico asociado a esta excepción.
     * Por defecto es 40901 (Generalmente indica un conflicto/duplicación).
     * @public
     * @type {number}
     */
    public errorCode: number;

    /**
     * Clave numérica del día para el cual se intentó
     * registrar el kilometraje repetidamente.
     * @private
     * @type {number}
     */
    private claveDia: number

/**
     * Crea una nueva instancia de KmsRecorridosPorDiaRepetidoError.
     *
     * @param claveDia - La clave del día que generó el conflicto.
     * @param mensaje - Mensaje descriptivo del error que ocurrió.
     * @param errorCode - Código numérico para el error. Por defecto es 40901.
     */
    constructor(claveDia: number, mensaje: string, errorCode = 40901) {
        super(mensaje);

        this.name = "KmsRecorridosPorDiaRepetidoError";
        this.claveDia = claveDia;
        this.message = `Ya existen kilometros recorridos registrados para el dia con clave ${claveDia}`;
        this.errorCode = errorCode;
    }

    /**
     * Devuelve un string formateado que incluye el nombre, el mensaje y el código
     * de error para facilitar el logging y la depuración.
     *
     * @returns {string} Mensaje de error formateado.
     */
    public getMessage(): string {
        return `Error '${this.name}': ${this.message} - Codigo: ${this.errorCode}`
    }
}
