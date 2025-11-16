import Kilometraje from "../kilometraje";
import { IEstrategiaTarifaTemporada } from "../temporadas/iEstrategiaTarifaTemporada";

/**
 * Clase abstracta que representa una tarifa base para calcular el costo de una reserva.
 * Utiliza el patrón Strategy para ajustar la tarifa en función de la temporada.
 */
export abstract class Tarifa {

    /**
     * Tarifa fija inicial sin ajustes de temporada.
     * @protected
     * @type {number}
     */
    protected tarifaBase: number;

    /**
     * Costo adicional por kilómetro recorrido.
     * @protected
     * @type {number}
     */
    protected cargoPorKmRecorrido: number;

    /**
     * Estrategia utilizada para ajustar la tarifa en función de la temporada.
     * Implementa el patrón Strategy.
     * @private
     * @type {IEstrategiaTarifaTemporada}
     */
    private estrategiaTemporada: IEstrategiaTarifaTemporada;

    /**
     * Crea una nueva tarifa con una estrategia de temporada dada.
     *
     * @param {IEstrategiaTarifaTemporada} estrategiaTemporada - Estrategia que define cómo se ajusta la tarifa según la temporada.
     */
    constructor(estrategiaTemporada: IEstrategiaTarifaTemporada) {
        this.tarifaBase = 0;
        this.cargoPorKmRecorrido = 0;
        this.estrategiaTemporada = estrategiaTemporada;
    }

    /**
     * Obtiene la tarifa base sin ajustes.
     * @returns {number} Tarifa base original.
     */
    public getTarifaBase(): number {
        return this.tarifaBase;
    }

    /**
     * Obtiene la tarifa base ajustada según la estrategia de temporada vigente.
     *
     * @returns {number} Tarifa base ajustada por temporada.
     */
    public getTarifaBaseAjustada(): number {
        return this.estrategiaTemporada.ajustarTarifaBase(this.tarifaBase);
    }

    /**
     * Obtiene el cargo adicional por kilómetro recorrido.
     * @returns {number} Costo por kilómetro.
     */
    public getCargoPorKmRecorrido(): number {
        return this.cargoPorKmRecorrido;
    }

    /**
     * Cambia la estrategia de temporada usada para ajustar la tarifa.
     *
     * @param {IEstrategiaTarifaTemporada} estrategia - Nueva estrategia de temporada.
     */
    public setEstrategiaTemporada(estrategia: IEstrategiaTarifaTemporada): void {
        this.estrategiaTemporada = estrategia;
    }

    /**
     * Calcula el costo final de la reserva en función de su duración y los kilómetros recorridos.
     * Este método debe ser implementado por las tarifas concretas.
     *
     * @abstract
     * @param {number} duracionReserva - Duración de la reserva en horas/días (según modelo).
     * @param {Kilometraje} kilometrosRecorridos - Kilómetros recorridos durante la reserva.
     * @returns {number} Costo total de la reserva.
     */
    public abstract calcularCosto(
        duracionReserva: number,
        kilometrosRecorridos: Kilometraje
    ): number;
}