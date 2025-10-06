export default class SinRegistrosDeKmsError extends Error {

    public errorCode: number;

    constructor(message: string, errorCode = 40402) {
        super(message);
        this.name = "SinRegistrosDeKmsError";
        this.errorCode = errorCode;
    }

    public getMessage(): string {
        return `Error '${this.name}': ${this.message} - Codigo: ${this.errorCode}`
    }
}
