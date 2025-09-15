import Reserva from "./reserva";

export default class Kilometraje {
    private kilometrosDia: number[];
    private kilometrosTotales: number;

    constructor(duracionAlquiler: number) {
        this.kilometrosDia = new Array(duracionAlquiler);
        this.kilometrosTotales = 0;
    }

    private setKilometrosTotales(kmTotales: number): void {
        this.kilometrosTotales = kmTotales;
    }

    public getKilometrosTotales(): number {
        return this.kilometrosTotales;
    }

    public cargarKilometrosPorDia() {
        const minKms = 20;
        const maxKms = 800
        for (let i = 0; i < this.kilometrosDia.length; i++) {
            let kilometrosRecorridos = Math.floor(Math.random() * (maxKms - minKms + 1)) + minKms;
            this.kilometrosDia[i] = kilometrosRecorridos;
            this.kilometrosTotales += kilometrosRecorridos;
        }
        
    }

}