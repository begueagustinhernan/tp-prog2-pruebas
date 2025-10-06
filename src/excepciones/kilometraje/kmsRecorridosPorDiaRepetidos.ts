export default class KmsRecorridosPorDiaRepetidoError extends Error {

    public errorCode: number;

    constructor(claveDia: number, errorCode = 40901) {
        super();
        const message = `Ya existen kilómetros registrados para el día con clave ${claveDia}.`;
        this.name = "KmsRecorridosPorDiaRepetidoError";
        this.errorCode = errorCode;
    }

    public getMessage(): string {
        return `Error '${this.name}': ${this.message} - Codigo: ${this.errorCode}`
    }
}
