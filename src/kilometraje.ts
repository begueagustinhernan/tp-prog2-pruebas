import KmsRecorridosPorDiaRepetidoError from "./excepciones/kilometraje/kmsRecorridosPorDiaRepetidos";
import SinRegistrosDeKmsError from "./excepciones/kilometraje/sinRegistrosDeKmsError";

export default class Kilometraje {
    private kmsRecorridosPorDia: Map<number, number> = new Map;

    public setKmsRecorridosPorDia(claveDia: number, kmsRecorridos: number): void {
        if (this.kmsRecorridosPorDia.has(claveDia)) {
            throw new KmsRecorridosPorDiaRepetidoError(claveDia, `Ya existen kilometros recorridos registrados para el dia con clave ${claveDia}`);
        }
        else {
            this.kmsRecorridosPorDia.set(claveDia, kmsRecorridos);
        }
    }

    public getKmsRecorridosPorDia(): Map<number, number> {
        return this.kmsRecorridosPorDia;
    }

    public calcularKmsTotalesRecorridos(): number {
        let kmsTotales = 0;
        if (this.kmsRecorridosPorDia.size > 0) {
            for (const kmsRecorridos of this.kmsRecorridosPorDia.values()) {
                kmsTotales += kmsRecorridos;
            }
            return kmsTotales;
        }
        else {
            throw new SinRegistrosDeKmsError("No hay kilometros registrados: el mapa de kilometros recorridos esta vacio")
        }

    }
}

