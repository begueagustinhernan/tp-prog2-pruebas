export class RegistroMantenimiento {

    private kmFinal: number;
    private fechaInicio: Date;
    private fechaFin: Date;
    private costo: number;
    private descripcion: string;

    constructor(
        kmFinal: number,
        fechaInicio: Date,
        fechaFin: Date,
        costo: number,
        descripcion: string
    ) {
        this.kmFinal = kmFinal;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.costo = costo;
        this.descripcion = descripcion;
    }

    public getKmFinal(): number {
        return this.kmFinal;
    }

    public getFechaInicio(): Date {
        return this.fechaInicio;
    }

    public getFechaFin(): Date {
        return this.fechaFin;
    }

    public getCosto(): number {
        return this.costo;
    }

    public getDescripcion(): string {
        return this.descripcion;
    }
}