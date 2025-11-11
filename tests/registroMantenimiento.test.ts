import { RegistroMantenimiento } from "../src/registroMantenimiento";

describe("Tests Clase RegistroMantenimiento", () => {
    let registroMantenimiento: RegistroMantenimiento;

    beforeEach(() => {
        registroMantenimiento = new RegistroMantenimiento(
            300,
            new Date(2025, 10, 4),
            new Date(2025, 10, 5),
            3500,
            "Mantenimiento Programado."
        )
    })

    it("El constructor de la clase 'RegistroMantenimiento' debe instanciar un objeto de tipo 'RegistroMantenimiento'", () => {

        expect(registroMantenimiento).toBeInstanceOf(RegistroMantenimiento);
    });

    it("getKmFinal debe devolver el valor actual del atributo 'kmFinal' correctamente", () => {

        expect(typeof (registroMantenimiento.getKmFinal())).toBe("number");
        expect(registroMantenimiento.getKmFinal()).toEqual(300);
    });

    it("getFechaInicio debe devolver el valor actual del atributo 'fechaInicio' correctamente", () => {

        expect(registroMantenimiento.getFechaInicio()).toBeInstanceOf(Date);
        expect(registroMantenimiento.getFechaInicio()).toEqual(new Date(2025, 10, 4));
    });

    it("getFechaFin debe devolver el valor actual del atributo 'fechaFin' correctamente", () => {

        expect(registroMantenimiento.getFechaFin()).toBeInstanceOf(Date);
        expect(registroMantenimiento.getFechaFin()).toEqual(new Date(2025, 10, 5));
    });

    it("getCosto debe devolver el valor actual del atributo 'costo' correctamente", () => {

        expect(typeof (registroMantenimiento.getCosto())).toBe("number");
        expect(registroMantenimiento.getCosto()).toEqual(3500);
    });

    it("getDescripcion debe devolver el valor actual del atributo 'descripcion' correctamente", () => {

        expect(typeof (registroMantenimiento.getDescripcion())).toBe("string");
        expect(registroMantenimiento.getDescripcion()).toEqual("Mantenimiento Programado.");
    });



})