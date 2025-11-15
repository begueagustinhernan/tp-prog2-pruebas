import { GestorFlota } from "./gestorFlota";

export abstract class ReporteBase {

    protected titulo: string = "";
    protected gestorFlota: GestorFlota = GestorFlota.getInstance();

    public getTitulo(): string {
        return this.titulo;
    }

    protected abstract ejecutarCalculoReporte(): void;

    public generarReporte(): void {
        console.log(`\n======================================================`);
        console.log(`| ** REPORTE GENERADO: ${this.getTitulo().toUpperCase()} ** |`);
        console.log(`======================================================`);

        this.ejecutarCalculoReporte();

        console.log(`======================================================`);
    };
}