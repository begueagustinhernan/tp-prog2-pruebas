import { Vehiculo } from '../vehiculo';
import Kilometraje from '../../kilometraje';
import Cliente from '../../cliente';
import Reserva from '../../reserva';
import { EstadoBase } from './estadoBase';
import { EstadoEnAlquiler } from './estadoEnAlquiler';

export class EstadoDisponible extends EstadoBase {
    
    protected nombreEstado(): string {
        return "Disponible";
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
        console.log(`Vehiculo alquilado con exito.`);
    }

    public iniciarMantenimiento(vehiculo: Vehiculo): void {
        console.log(`Iniciando mantenimiento...`);
    }
}
