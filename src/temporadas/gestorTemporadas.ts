import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";
import TemporadaAlta from "./temporadaAlta";
import TemporadaBaja from "./temporadaBaja";
import TemporadaMedia from "./temporadaMedia";

/**
 * Clase responsable de determinar qué estrategia de temporada se debe aplicar
 * según la fecha recibida.
 *
 * Actúa como un "gestor" centralizado que decide si una reserva pertenece
 * a temporada alta, media o baja.
 */
export default class GestorTemporadas {

    /**
     * Devuelve la estrategia de temporada correspondiente a la fecha dada.
     *
     * @param {Date} fecha - Fecha de la reserva.
     * @returns {IEstrategiaTarifaTemporada} Estrategia apropiada para esa fecha.
     *
     * - Meses de temporada **alta**: 1, 2, 7, 12
     * - Meses de temporada **media**: 3, 4, 5, 9, 10, 11
     * - Meses de temporada **baja**: 6, 8
     */
    public static obtenerEstrategia(fecha: Date): IEstrategiaTarifaTemporada {

        const mes = fecha.getMonth() + 1; // getMonth() devuelve 0–11

        if ([1, 2, 7, 12].includes(mes)) {
            return new TemporadaAlta();
        }
        else if ([3, 4, 5, 9, 10, 11].includes(mes)) {
            return new TemporadaMedia();
        }
        else {
            return new TemporadaBaja();
        }
    }

}