export default class KmsRecorridosPorDiaRepetidoError extends Error {

    public errorCode: number;
    private claveDia: number

    // constructor(claveDia: number, errorCode = 40901) {
    constructor(claveDia: number, mensaje: string, errorCode = 40901) {
        super(mensaje);
        // const message = `Ya existen kilómetros registrados para el día con clave ${claveDia}.`;
        this.name = "KmsRecorridosPorDiaRepetidoError";
        this.claveDia = claveDia;
        this.message = `Ya existen kilometros recorridos registrados para el dia con clave ${claveDia}`;
        this.errorCode = errorCode;
    }

    public getMessage(): string {
        return `Error '${this.name}': ${this.message} - Codigo: ${this.errorCode}`
    }
}
