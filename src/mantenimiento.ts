import { RegistroMantenimiento } from "./registroMantenimiento";

const KM_DISPARADOR: number = 10000;
const MESES_DISPARADOR: number = 12;
const ALQUILERES_DISPARADOR: number = 5;
const HORAS_MANTENIMIENTO: number = 24;

export class Mantenimiento {

    private kmUltimoMantenimiento: number;
    private fechaUltimoMantenimiento: Date;
    private fechaInicioMantenimientoActual: Date | null;
    private fechaEstimadaFin: Date | null;
    private cantidadAlquileres: number;
    private historialMantenimientos: RegistroMantenimiento[];

    constructor() {
        this.kmUltimoMantenimiento = 0;
        this.fechaUltimoMantenimiento = new Date();
        this.fechaInicioMantenimientoActual = null;
        this.fechaEstimadaFin = null;
        this.cantidadAlquileres = 0;
        this.historialMantenimientos = [];
    }

    public getKmUltimoMantenimiento(): number {
        return this.kmUltimoMantenimiento;
    }

    public getFechaUltimoMantenimiento(): Date {
        return this.fechaUltimoMantenimiento;
    }

    public getFechaInicioMantenimientoActual(): Date | null {
        return this.fechaInicioMantenimientoActual;
    }

    public getFechaEstimadaFin(): Date | null {
        return this.fechaEstimadaFin;
    }

    public getCantidadAlquileres(): number {
        return this.cantidadAlquileres;
    }

    public getHistorialMantenimientos(): RegistroMantenimiento[] {
        return this.historialMantenimientos;
    }

    public setKmUltimoMantenimiento(kms: number) {
        this.kmUltimoMantenimiento = kms;
    }

    public setFechaUltimoMantenimiento(fecha: Date) {
        this.fechaUltimoMantenimiento = fecha;
    }

    public setFechaInicioMantenimiento(fecha: Date) {
        this.fechaInicioMantenimientoActual = fecha;
    }

    public setFechaEstimadaFin(fecha: Date) {
        this.fechaEstimadaFin = fecha;
    }

    public setCantidadAlquileres(alquileres: number) {
        this.cantidadAlquileres = alquileres;
    }

    public registrarAlquilerCompletado(): void {
        this.cantidadAlquileres++;;
    }

    public verificarNecesidadMantenimiento(kmActual: number): boolean {
        const kmsRecorridos = kmActual - this.getKmUltimoMantenimiento();

        if (kmsRecorridos > KM_DISPARADOR) {
            console.log(`Disparador por Kilometraje! Kilometros recorridos: ${kmsRecorridos}km`);
            return true;
        }

        if (this.getCantidadAlquileres() > ALQUILERES_DISPARADOR) {
            console.log(`Disparador por Alquileres! Cantidad alquileres: ${this.getCantidadAlquileres()}`);
            return true;
        }

        const diferenciaMilisegundos = new Date().getTime() - this.getFechaUltimoMantenimiento().getTime();
        const diferenciaMeses = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 30.4375);

        if (diferenciaMeses >= MESES_DISPARADOR) {
            console.log(`Disparador por Tiempo! Cantidad de meses sin mantenimiento: ${diferenciaMeses}`);
            return true;
        }

        return false;
    }

    public iniciarRegistroMantenimiento(fechaInicio: Date): void {
        this.setFechaInicioMantenimiento(fechaInicio);

        const fechaFinMilisegundos = fechaInicio.getTime() + (HORAS_MANTENIMIENTO * 60 * 60 * 1000);
        this.setFechaEstimadaFin(new Date(fechaFinMilisegundos));
    }

    public puedeFinalizar(fechaActual: Date): boolean {
        const fechaFin = this.getFechaEstimadaFin();
        if (!fechaFin) {
            return false;
        }
        else {
            return fechaActual.getTime() >= fechaFin.getTime();
        }
    }

    public finalizarRegistroMantenimiento(costo: number, fechaFin: Date, kmFinal: number): void {
        if (!this.fechaInicioMantenimientoActual) {
            throw new Error("No se puede finalizar el mantenimiento sin un registro de inicio.");
        }

        const nuevoRegistro = new RegistroMantenimiento(
            kmFinal,
            this.fechaInicioMantenimientoActual,
            fechaFin,
            costo,
            "Mantenimiento Programado"
        );

        this.historialMantenimientos.push(nuevoRegistro);

        this.setKmUltimoMantenimiento(kmFinal);
        this.setFechaUltimoMantenimiento(fechaFin);
        this.setCantidadAlquileres(0);

        this.fechaInicioMantenimientoActual = null;

        console.log(`Mantenimiento finalizado. Nuevo punto de referencia: ${kmFinal}km`);
    }
}