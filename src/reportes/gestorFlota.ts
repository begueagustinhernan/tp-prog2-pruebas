import { Vehiculo } from "../vehiculo/vehiculo";

/**
 * Clase central que gestiona la flota completa de vehículos de la empresa.
 *
 * Implementa el **Patrón Singleton** para garantizar que solo exista una instancia
 * de la flota en toda la aplicación. Es responsable de mantener la lista de vehículos
 * y proveer acceso global a la misma, siendo utilizada a menudo por los reportes.
 */
export class GestorFlota {

    /**
     * Instancia estática única de la clase (Singleton).
     * @private
     * @static
     * @type {GestorFlota}
     */
    private static instance: GestorFlota;

    /**
     * Lista de todos los vehículos activos actualmente en la flota.
     * @private
     * @type {Vehiculo[]}
     */
    private vehiculos: Vehiculo[] = [];

    /**
     * Constructor privado para prevenir la instanciación directa de la clase
     * y asegurar que solo se utilice el método estático getInstance().
     * @private
     */
    private constructor() {};

    /**
     * Obtiene la única instancia (Singleton) de la clase GestorFlota.
     * Si la instancia no existe, la crea.
     *
     * @returns {GestorFlota} La instancia única del gestor de flota.
     */
    public static getInstance(): GestorFlota {
        if (!GestorFlota.instance) {
            GestorFlota.instance = new GestorFlota();
        }

        return GestorFlota.instance;
    }

    /**
     * Agrega un vehículo nuevo a la lista de la flota.
     *
     * @param vehiculo - El vehículo (instancia de Vehiculo) a ser agregado.
     */
    public agregarVehiculo(vehiculo: Vehiculo): void {
        this.vehiculos.push(vehiculo);
    }

    /**
     * Obtiene la lista completa de vehículos activos en la flota.
     *
     * @returns {Vehiculo[]} Un array que contiene todas las instancias de Vehiculo.
     */
    public getVehiculos(): Vehiculo[] {
        return this.vehiculos;
    }
}