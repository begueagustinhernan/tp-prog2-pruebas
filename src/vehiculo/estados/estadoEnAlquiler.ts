import { EstadoBase } from './estadoBase';
import { Vehiculo } from '../vehiculo';
import Kilometraje from '../../kilometraje';
import Reserva from '../../reserva';
import { EstadoDisponible } from './estadoDisponible';

export class EstadoEnAlquiler extends EstadoBase {
    private reservaActual: Reserva;

    constructor(reserva: Reserva) {
        super();
        this.reservaActual = reserva;
    }

    protected nombreEstado(): string {
        return "En Alquiler";
    }

    public devolver(vehiculo: Vehiculo) {
        const costoTotal = this.reservaActual.obtenerCostoTotal()
        console.log(`Costo Total Reserva: $${costoTotal}`);

        this.reservaActual.getCliente().desasociarReserva();

        vehiculo.setEstado(new EstadoDisponible());
        console.log(`Vehiculo devuelto con exito.`);
    }
}