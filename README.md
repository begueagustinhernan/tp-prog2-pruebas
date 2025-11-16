# 🚗 DriveHub: Sistema de Gestión para una Plataforma de Alquiler de Autos

## 📜 Descripción del Proyecto

**DriveHub** es un sistema de gestión **orientado a objetos (POO)** desarrollado con **TypeScript** y **Node.js** para administrar la flota de vehículos y las reservas de una plataforma de alquiler de autos.

El proyecto se centra en la aplicación de patrones de diseño y principios de POO para manejar de forma robusta la disponibilidad de vehículos, el cálculo de tarifas complejas y la gestión de estados, asegurando que las operaciones (como alquilar un auto) solo se permitan bajo las condiciones de negocio correctas.

---

## ✨ Características Principales

El sistema ofrece una gestión completa y flexible, capaz de manejar:

* **Flota Categorizada:** Gestión de vehículos de tipo **Compacto**, **Sedán** y **SUV**, cada uno con su propia lógica de tarifa y estado.
* **Cálculo de Tarifas Dinámico:** Incluye tarifas base, cargos por kilometraje excedente (con límites variables por categoría) y un ajuste de precios según la **Temporada** (Baja, Media, Alta).
* **Gestión de Estados Estricta:** Implementación de reglas para restringir operaciones. Un vehículo **En Mantenimiento** o **En Alquiler** no puede ser reservado, informando errores de manera clara.
* **Mantenimiento Automático:** Disparadores que cambian el estado del vehículo a "En Mantenimiento" basados en criterios como: kilometraje acumulado, tiempo transcurrido o número de alquileres completados.
* **Reportes y Estadísticas:** Generación de métricas clave como **Rentabilidad por Vehículo** (Ingresos vs. Costos de Mantenimiento) y **Ocupación de la Flota**.

---
## 📂 Estructura del Proyecto

```
TP-PROG2-PRUEBAS/
│
├── diagramas/
│   ├── clases/
│   │   └── clases.puml
│   └── secuencia/
│       └── secuencia.puml
│
├── src/
│   ├── excepciones/
│   │   ├── kmsRecorridosPorDiaRepetidos.ts
│   │   └── sinRegistrosDeKmsError.ts
│   │
│   ├── reportes/
│   │   ├── gestorFlota.ts
│   │   ├── reporteBase.ts
│   │   ├── reporteOcupacionFlota.ts
│   │   ├── reportePopularidadFlota.ts
│   │   └── reporteRentabilidadFlota.ts
│   │
│   ├── tarifa/
│   │   ├── tarifa.ts
│   │   ├── tarifaCompacto.ts
│   │   ├── tarifaSedan.ts
│   │   └── tarifaSuv.ts
│   │
│   ├── temporadas/
│   │   ├── gestorTemporadas.ts
│   │   ├── iEstrategiaTarifaTemporada.ts
│   │   ├── temporadaAlta.ts
│   │   ├── temporadaBaja.ts
│   │   └── temporadaMedia.ts
│   │
│   ├── vehiculo/
│   │   ├── estados/
│   │   │   ├── estadoBase.ts
│   │   │   ├── estadoDisponible.ts
│   │   │   ├── estadoEnAlquiler.ts
│   │   │   ├── estaoEnMantenimiento.ts
│   │   │   └── iEstadoVehiculo.ts
│   │   ├── compacto.ts
│   │   ├── sedan.ts
│   │   └── suv.ts
│   │   └── vehiculo.ts
│   │
│   ├── cliente.ts
│   ├── dateutils.ts
│   ├── index.ts
│   ├── kilometraje.ts
│   ├── mantenimiento.ts
│   ├── registroMantenimiento.ts
│   └── reserva.ts
│
└── tests/
    └── ... (Archivos de pruebas)

 ```

## ⚙️ Cómo compilar el proyecto

El proyecto utiliza TypeScript, así que primero instalá las dependencias:

```bash

npm install

```

Luego compilá:

```bash

npm run build

```

## 🧪 Cómo ejecutar los tests

Este proyecto usa Jest con cobertura mínima del 80%.

Para ejecutar las pruebas:

```bash

npm run test

```

---

## 🏗️ Diagramas de Diseño

### 📘 Diagrama de Clases (UML)

![Diagrama de clases](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/begueagustinhernan/tp-prog2-pruebas/main/diagramas/clases.puml)

➡️ [**Abrir diagrama de clases (.puml)**](https://raw.githubusercontent.com/begueagustinhernan/tp-prog2-pruebas/main/diagramas/clases.puml)

---

### 📙 Diagrama de Secuencia

![Diagrama de Secuencia](https://www.plantuml.com/plantuml/proxy?src=https://raw.githubusercontent.com/begueagustinhernan/tp-prog2-pruebas/main/diagramas/secuencia.puml)

➡️ [**Abrir diagrama de secuencia (.puml)**](https://raw.githubusercontent.com/begueagustinhernan/tp-prog2-pruebas/main/diagramas/secuencia.puml)