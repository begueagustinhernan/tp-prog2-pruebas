import { Tarifa } from "./tarifa";
import Kilometraje from "../kilometraje";
import SinRegistrosDeKmsError from "../excepciones/kilometraje/sinRegistrosDeKmsError";

const TARIFA_BASE_DIA = 30;
const CARGO_ADICIONAL = 0.15;
const LIMITE_KM_DIA = 100;

export default class TarifaCompacto extends Tarifa {

    constructor() {
        super();
        this.tarifaBase = TARIFA_BASE_DIA;
        this.cargoPorKmRecorrido = CARGO_ADICIONAL;
    }

    public calcularCosto(duracionReserva: number, kilometrosRecorridos: Kilometraje): number {

        let costoBaseTotal: number = duracionReserva * this.getTarifaBase();
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
            throw new SinRegistrosDeKmsError("No hay kilómetros registrados: el mapa de kiloemtros recorridos está vacío.")
        }
    }
}