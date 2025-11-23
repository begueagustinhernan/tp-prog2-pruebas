import { GestorFlota } from "./gestorFlota";

/**
 * Clase abstracta base para todos los reportes del sistema.
 *
 * Define la secuencia de pasos para la generación del reporte 
 * y delega el cálculo y la impresión del contenido específico a las subclases
 * a través del método abstracto `ejecutarCalculoReporte()`.
 * @abstract
 */
export abstract class ReporteBase {

    /**
     * Título descriptivo del reporte que se mostrará en el encabezado.
     * @protected
     * @type {string}
     */
    protected titulo: string = "";

    /**
     * Referencia a la única instancia del GestorFlota (Singleton), que es la fuente
     * de datos para todos los reportes.
     * @protected
     * @type {GestorFlota}
     */
    protected gestorFlota: GestorFlota = GestorFlota.getInstance();

    /**
     * Obtiene el título descriptivo del reporte.
     * @returns {string} El título del reporte.
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * Método abstracto que contiene la lógica específica para calcular y mostrar
     * el contenido del reporte. Debe ser implementado por las subclases concretas.
     * @protected
     * @abstract
     */
    protected abstract ejecutarCalculoReporte(): void;

    /**
     * Define los pasos de la generación del reporte.
     *
     * 1. Imprime el encabezado (título del reporte).
     * 2. Llama al método abstracto `ejecutarCalculoReporte()`.
     * 3. Imprime el pie de página.
     */
    public generarReporte(): void {
        console.log(`\n======================================================`);
        console.log(`| ** REPORTE GENERADO: ${this.getTitulo().toUpperCase()} ** |`);
        console.log(`======================================================`);

        this.ejecutarCalculoReporte();

        console.log(`======================================================`);
    };
}