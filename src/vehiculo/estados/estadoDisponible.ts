import { Vehiculo } from '../vehiculo';
import Kilometraje from '../../kilometraje';
import Cliente from '../../cliente';
import Reserva from '../../reserva';
import { EstadoBase } from './estadoBase';
import { EstadoEnAlquiler } from './estadoEnAlquiler';
import { EstadoEnMantenimiento } from './estadoEnMantenimiento';

export class EstadoDisponible extends EstadoBase {

    constructor() {
        super()
        this.nombreEstado = "Disponible";
    }

    public alquilar(vehiculo: Vehiculo, cliente: Cliente, fechaInicio: Date, fechaFin: Date): void {

        console.log(`Alquilando vehiculo con matricula: (${vehiculo.getMatricula()})`);

        const nuevaReserva = new Reserva(
            fechaInicio,
            fechaFin,
            new Kilometraje(),
            vehiculo,
            cliente
        );

        cliente.setReserva(nuevaReserva);
        vehiculo.setEstado(new EstadoEnAlquiler(nuevaReserva));
        console.log(`Vehiculo '${vehiculo.getMatricula()}' alquilado con exito.`);
    }

    public iniciarMantenimiento(vehiculo: Vehiculo, fechaInicio: Date): void {
        vehiculo.getMantenimiento().iniciarRegistroMantenimiento(fechaInicio);
        vehiculo.setEstado(new EstadoEnMantenimiento());
        console.log(`Vehiculo '${vehiculo.getMatricula()}' enviado a mantenimiento.`);
    }
}

