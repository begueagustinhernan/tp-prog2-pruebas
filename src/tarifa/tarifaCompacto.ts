import { Tarifa } from "./tarifa";
import Kilometraje from "../kilometraje";
import SinRegistrosDeKmsError from "../excepciones/kilometraje/sinRegistrosDeKmsError";
import { IEstrategiaTarifaTemporada } from "../temporadas/iEstrategiaTarifaTemporada";

const TARIFA_BASE_DIA = 30;
const CARGO_ADICIONAL = 0.15;
const LIMITE_KM_DIA = 100;

/**
 * Tarifa específica para vehículos Compactos.
 *
 * Hereda de la clase Tarifa y define los valores por defecto que se aplican
 * a este tipo de vehículo: tarifa base diaria, cargo adicional por km extra
 * y límite de kilómetros permitidos por día.
 *
 * Si el cliente supera el límite diario de km, se cobra un adicional por km excedido.
 */
export default class TarifaCompacto extends Tarifa {

    /**
     * Crea una tarifa para vehículos Compactos con una estrategia de temporada.
     *
     * @param {IEstrategiaTarifaTemporada} estrategiaTemporada - Estrategia usada para ajustar la tarifa según la temporada.
     */
    constructor(estrategiaTemporada: IEstrategiaTarifaTemporada) {
        super(estrategiaTemporada);
        this.tarifaBase = TARIFA_BASE_DIA;
        this.cargoPorKmRecorrido = CARGO_ADICIONAL;
    }

    /**
     * Calcula el costo total de la reserva según:
     * - La duración indicada (en días)
     * - La tarifa base ajustada por la estrategia de temporada
     * - Los kilómetros recorridos cada día
     * - Los kilómetros que excedan el límite permitido de km/día
     *
     * Lanza un error si no hay registros de kilómetros.
     *
     * @param {number} duracionReserva - Duración de la reserva en días.
     * @param {Kilometraje} kilometrosRecorridos - Registro diario de kilómetros recorridos.
     * @returns {number} Costo total de la reserva.
     * @throws {SinRegistrosDeKmsError} Si no se registraron kilómetros para calcular el costo variable.
     */
    public calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number {

        let costoBaseTotal: number = duracionReserva * this.getTarifaBaseAjustada();
        let costoVariableTotal: number = 0;

        if (kilometrosRecorridos.getKmsRecorridosPorDia().size > 0) {
            for (const kmRecorridos of kilometrosRecorridos.getKmsRecorridosPorDia().values()) {

                if (kmRecorridos > LIMITE_KM_DIA) {
                    const kmExcedidos = kmRecorridos - LIMITE_KM_DIA;
                    const cargoExtraDiario = kmExcedidos * this.getCargoPorKmRecorrido();
                    costoVariableTotal += cargoExtraDiario;
                }
            }

            const costoTotal = costoBaseTotal + costoVariableTotal;

            return costoTotal;
        }
        else {
            throw new SinRegistrosDeKmsError("No hay kilómetros registrados: el mapa de kilómetros recorridos está vacío.")
        }
    }
}