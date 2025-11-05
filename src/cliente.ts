
import Reserva from "./reserva";
export default class Cliente {

    private idCliente: number;
    private nombre: string;
    private apellido: string;
    private mail: string;
    private telefono: number;
    private reserva?: Reserva | null;

    constructor(idCliente: number, nombre: string, apellido: string, mail: string, telefono: number, reserva: Reserva) {
        this.idCliente = idCliente;
        this.apellido = apellido;
        this.nombre = nombre;
        this.mail = mail;
        this.telefono = telefono;
        this.reserva = reserva;

    }

    public getIdCliente(): number {
        return this.idCliente;
    }
    public getApellido(): string {
        return this.apellido;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getMail(): string {
        return this.mail;
    }
    public getTelefono(): number {
        return this.telefono;
    }
    public getReserva(): Reserva | void {
        if (this.reserva)
            return this.reserva;
        else {
            throw new Error(`Acción inválida: No existen reservas asociadas al cliente ${this.getNombre()} ${this.getApellido()} con ID: ${this.getIdCliente()}`);
        }
    }

    public setReserva(reserva: Reserva) {
        this.reserva = reserva
    }

    public desasociarReserva(): void {
        this.reserva = null;
    }

}
