import { IEstrategiaTarifaTemporada } from "./iEstrategiaTarifaTemporada";
import TemporadaAlta from "./temporadaAlta";
import TemporadaBaja from "./temporadaBaja";
import TemporadaMedia from "./temporadaMedia";

export default class GestorTemporadas {

    public static obtenerEstrategia(fecha: Date): IEstrategiaTarifaTemporada {

        const mes = fecha.getMonth() + 1; // se adiciona 1 por que fecha.getMonth devuelve un numero entre 0 y 11.

        if ([1, 2, 7, 12].includes(mes)) {
            return new TemporadaAlta();
        }
        else if ([3, 4, 5, 9, 10, 11,].includes(mes)) {
            return new TemporadaMedia();
        }
        else {
            return new TemporadaBaja();
        }

    }

}