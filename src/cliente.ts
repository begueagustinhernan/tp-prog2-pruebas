
import Reserva from "./reserva";
export default class Cliente {

    private idCliente: number;
    private nombre: string;
    private apellido: string;
    private mail: string;
    private telefono: number;
    private reserva: Reserva;
    static getIdCliente: any;

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
    public getReserva(): Reserva {
        return this.reserva;
    }


}
