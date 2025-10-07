export class KilometrajeMock {
    private kmsRecorridosPorDia: Map<number, number> = new Map();
    constructor() {};
}

export class VehiculoMock {
    public marca: string;
    constructor(marca: string) {
        this.marca = marca;
    }
}

export class ClienteMock {
    public nombre: string;
    constructor(nombre: string) {
        this.nombre = nombre;
    }
}

export class ReservaMock {
    
}