import Cliente from "../src/cliente";
import * as MOCKS from "./mocks";

describe("Tests Clase Cliente", () => {
    let cliente: Cliente;
    let reserva: MOCKS.ReservaMock;

    beforeEach(() => {
        reserva = new MOCKS.ReservaMock();
        cliente = new Cliente(10, "Fernando", "Fernandez", "fernando@gmail.com", 1131062747, reserva as any);
    });

    it("El constructor de la clase 'Cliente' debe instanciar un objeto de tipo 'Cliente'", () => {
        expect(cliente).toBeInstanceOf(Cliente);
    });

    it("getIdCliente debe devolver el valor actual del atributo 'idCliente' correctamente", () => {
        expect(cliente.getIdCliente()).toEqual(10);
    });

    it("getNombre debe devolver el valor actual del atributo 'nombre' correctamente", () => {
        expect(cliente.getNombre()).toEqual("Fernando");
    });

    it("getApellido debe devolver el valor actual del atributo 'apellido' correctamente", () => {
        expect(cliente.getApellido()).toEqual("Fernandez");
    });

    it("getMail debe devolver el valor actual del atributo 'mail' correctamente", () => {
        expect(cliente.getMail()).toEqual("fernando@gmail.com");
    });

    it("getTelefono debe devolver el valor actual del atributo 'telefono' correctamente", () => {
        expect(cliente.getTelefono()).toEqual(1131062747);
    });

    it("getReserva debe devolver una instancia de la clase 'Reserva'", () => {
        expect(cliente.getReserva()).toBeInstanceOf(MOCKS.ReservaMock);
    });
});