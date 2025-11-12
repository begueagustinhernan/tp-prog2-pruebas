import Cliente from "../src/cliente";
import Reserva from "../src/reserva";
import * as MOCKS from "./mocks";

describe("Tests Clase Cliente", () => {
    let cliente: Cliente;
    let reservaInicial: Reserva;

    beforeEach(() => {
        reservaInicial = new MOCKS.ReservaMock() as Reserva;
        cliente = new Cliente(10, "Fernando", "Fernandez", "fernando@gmail.com", 1131062747, reservaInicial as any);
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

    it("getReserva debe devolver una instancia de la clase 'reserva'", () => {
        expect(cliente.getReserva()).toBeInstanceOf(MOCKS.ReservaMock);
    });

    it("getReserva debe arrojar una excepcion si no hay una reserva asignada en el atributo 'reserva'", () => {
        try {
            cliente["reserva"] = null;

            cliente.getReserva();
        }
        catch (error) {
            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toEqual(`Acción inválida: No existen reservas asociadas al cliente Fernando Fernandez con ID: 10`);
            expect(cliente["reserva"]).toBeNull();

        }
    });

    it("setReserva debe asignar correctamente la reserva en el atributo 'reserva", () => {
        const nuevaReserva = new MOCKS.ReservaMock() as Reserva;

        expect(cliente["reserva"]).toEqual(reservaInicial);
        expect(cliente["reserva"]).not.toBe(nuevaReserva);

        cliente.setReserva(nuevaReserva);
        expect(cliente["reserva"]).toEqual(nuevaReserva);
    })

    it("setReserva debe asignar correctamente la reserva en el atributo 'reserva", () => {
        const nuevaReserva = new MOCKS.ReservaMock() as Reserva;

        expect(cliente["reserva"]).toEqual(reservaInicial);
        expect(cliente["reserva"]).not.toBe(nuevaReserva);

        cliente.setReserva(nuevaReserva);
        expect(cliente["reserva"]).toEqual(nuevaReserva);
    })

    it("desasociarReserva debe establecer el atributo 'reserva' a null", () => {

        expect(cliente["reserva"]).not.toBeNull();
        expect(cliente["reserva"]).toBeInstanceOf(MOCKS.ReservaMock);

        cliente.desasociarReserva();
        expect(cliente["reserva"]).toBeNull();
    });
});