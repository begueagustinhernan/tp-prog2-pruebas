import { Vehiculo } from "../vehiculo/vehiculo";

export class GestorFlota {

    private static instance: GestorFlota;
    private vehiculos: Vehiculo[] = [];

    private constructor() {};

    public static getInstance(): GestorFlota {
        if (!GestorFlota.instance) {
            GestorFlota.instance = new GestorFlota();
        }

        return GestorFlota.instance;
    }

    public agregarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.push(vehiculo);
    }

    public getVehiculos(): Vehiculo[] {
        return this.vehiculos;
    }
}