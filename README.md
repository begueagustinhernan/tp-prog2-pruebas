🚗 DriveHub: Sistema de Gestión para una Plataforma de Alquiler de Autos
📜 Descripción del Proyecto
DriveHub es un sistema de gestión orientado a objetos (POO) desarrollado con TypeScript y Node.js para administrar la flota de vehículos y las reservas de una plataforma de alquiler de autos.

El proyecto se centra en la aplicación de patrones de diseño y principios de POO para manejar de forma robusta la disponibilidad de vehículos, el cálculo de tarifas complejas y la gestión de estados, asegurando que las operaciones (como alquilar un auto) solo se permitan bajo las condiciones de negocio correctas.

✨ Características Principales
El sistema ofrece una gestión completa y flexible, capaz de manejar:

Flota Categorizada: Gestión de vehículos de tipo Compacto, Sedán y SUV, cada uno con su propia lógica de tarifa y estado.

Cálculo de Tarifas Dinámico: Incluye tarifas base, cargos por kilometraje excedente (con límites variables por categoría) y un ajuste de precios según la Temporada (Baja, Media, Alta).

Gestión de Estados Estricta: Implementación de reglas para restringir operaciones. Un vehículo En Mantenimiento o En Alquiler no puede ser reservado, informando errores de manera clara.

Mantenimiento Automático: Disparadores que cambian el estado del vehículo a "En Mantenimiento" basados en criterios como: kilometraje acumulado, tiempo transcurrido o número de alquileres completados.

Reportes y Estadísticas: Generación de métricas clave como Rentabilidad por Vehículo (Ingresos vs. Costos de Mantenimiento) y Ocupación de la Flota.

🏗️ Diagramas de Diseño

Diagrama de Clases (UML)
Enlace al Diagrama de Clases

Diagrama de Secuencia
Enlace al Diagrama de Secuencia
