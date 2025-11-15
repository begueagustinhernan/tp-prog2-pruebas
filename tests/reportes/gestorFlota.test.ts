import { GestorFlota } from "../../src/reportes/gestorFlota";

describe("Tests Clase GestorFlota", () => {

    class VehiculoMock {
        private matricula: string;
        constructor(matricula: string) {
            this.matricula = matricula;
        }

        public getMatricula(): string {
            return this.matricula;
        }
    }

    afterEach(() => {
        GestorFlota.getInstance()["vehiculos"] = [];
        GestorFlota.getInstance()["vehiculos"].length = 0;;

    })

    it("getInstance debe devolver siempre la misma instancia de GestorFlota", () => {
        const instancia1 = GestorFlota.getInstance();

        const instancia2 = GestorFlota.getInstance();

        expect(instancia1).toBeInstanceOf(GestorFlota);
        expect(instancia2).toBeInstanceOf(GestorFlota);
        expect(instancia1).toBe(instancia2);
    });

    it("getVehiculos debe devolver un array vacío si GestorFlota no tiene registros", () => {
        const gestorFlota = GestorFlota.getInstance();

        expect(gestorFlota.getVehiculos()).toBeInstanceOf(Array);
        expect(Array.isArray(gestorFlota.getVehiculos())).toBe(true);
        expect(gestorFlota.getVehiculos().length).toEqual(0);
    })

    it("getVehiculos debe devolver el array completo de vehículos de la flota", () => {
        const gestorFlota = GestorFlota.getInstance();

        const vehiculoA = new VehiculoMock("V-A") as any;
        const vehiculoB = new VehiculoMock("V-B") as any;

        gestorFlota["vehiculos"].push(vehiculoA);
        gestorFlota["vehiculos"].push(vehiculoB);

        expect(gestorFlota.getVehiculos()).toBeInstanceOf(Array);
        expect(Array.isArray(gestorFlota.getVehiculos())).toBe(true);
        expect(gestorFlota.getVehiculos().length).toEqual(2);
        expect(gestorFlota.getVehiculos().some(v => v["matricula"] === "V-A")).toBe(true);
        expect(gestorFlota.getVehiculos().some(v => v["matricula"] === "V-A")).toBe(true);

    })

    it("agregarVehiculos debe debe añadir correctamente un vehículo a la flota", () => {
        const gestorFlota = GestorFlota.getInstance();
        const flota = gestorFlota["vehiculos"];

        const vehiculoA = new VehiculoMock("V-A") as any;
        const vehiculoB = new VehiculoMock("V-B") as any;

        gestorFlota.agregarVehiculo(vehiculoA);
        gestorFlota.agregarVehiculo(vehiculoB);

        expect(flota).toBeInstanceOf(Array);
        expect(Array.isArray(flota)).toBe(true);
        expect(flota.length).toEqual(2);
        expect(flota.some(v => v["matricula"] === "V-A")).toBe(true);
        expect(flota.some(v => v["matricula"] === "V-A")).toBe(true);
    })
})