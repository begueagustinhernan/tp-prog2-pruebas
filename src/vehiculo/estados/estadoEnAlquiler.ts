import { EstadoBase } from './estadoBase';
import { Vehiculo } from '../vehiculo';
import Reserva from '../../reserva';
import { EstadoDisponible } from './estadoDisponible';
import { EstadoEnMantenimiento } from './estadoEnMantenimiento';

export class EstadoEnAlquiler extends EstadoBase {
    private reservaActual: Reserva;

    constructor(reserva: Reserva) {
        super();
        this.reservaActual = reserva;
        this.nombreEstado = "En Alquiler";
    }

    public devolver(vehiculo: Vehiculo) {
        const costoTotal = this.reservaActual.obtenerCostoTotal()
        console.log(`Costo Total Reserva: $${costoTotal}`);

        let kilometrajeReserva = this.reservaActual.getKilometraje().calcularKmsTotalesRecorridos();
        console.log(`Kilometros Recorridos: ${kilometrajeReserva}km`);
        let kilometrajeTotal = vehiculo.getKilometrajeTotal();

        kilometrajeTotal += kilometrajeReserva;
        vehiculo.setKilometrajeTotal(kilometrajeTotal);

        this.reservaActual.getCliente().desasociarReserva();

        const mantenimiento = vehiculo.getMantenimiento();
        mantenimiento.registrarAlquilerCompletado();

        if (mantenimiento.verificarNecesidadMantenimiento(vehiculo.getKilometrajeTotal())) {
            console.log("Disparador de mantenimiento activado.")

            vehiculo.iniciarMantenimiento(new Date());
        }

        vehiculo.setEstado(new EstadoDisponible());
        console.log(`Vehiculo '${vehiculo.getMatricula()}' devuelto con exito.`);
    }

    public iniciarMantenimiento(vehiculo: Vehiculo, fechaInicio: Date): void {
        vehiculo.getMantenimiento().iniciarRegistroMantenimiento(fechaInicio);
        vehiculo.setEstado(new EstadoEnMantenimiento());
        console.log(`Vehiculo '${vehiculo.getMatricula()}' enviado a mantenimiento.`);
    }
}