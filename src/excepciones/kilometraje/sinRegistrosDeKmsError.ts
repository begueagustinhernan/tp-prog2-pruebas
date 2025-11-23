/**
 *  Clase de excepción personalizada que se lanza cuando se intenta realizar
 * un cálculo de kilometraje (ej: calcular kms recorridos de una reserva) y
 * se determina que no hay datos válidos de kilometraje registrados.
 *
 * Hereda de la clase base Error.
 */
export default class SinRegistrosDeKmsError extends Error {

    /**
     * Código de error específico asociado a esta excepción.
     * Por defecto es 40402.
     * @public
     * @type {number}
     */
    public errorCode: number;

    /**
     * Crea una nueva instancia de SinRegistrosDeKmsError.
     *
     * @param message - Mensaje descriptivo del error que ocurrió.
     * @param errorCode - Código numérico para el error. Por defecto es 40402.
     */
    constructor(message: string, errorCode = 40402) {
        super(message);
        this.name = "SinRegistrosDeKmsError";
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
