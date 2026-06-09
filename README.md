# Gestor de Transacciones

Aplicación desarrollada con Angular para consultar, filtrar y gestionar transacciones operativas provenientes de distintos sistemas.

## Tecnologías utilizadas

- Angular 21
- PrimeNG 21
- Tailwind CSS
- RxJS
- JSON Server (API que se simuló para el desarrollo)

## Funcionalidades principales

- Consulta de transacciones en una tabla paginada.
- Filtros por estado, tipo de transacción, sistema de origen y rango de fechas.
- Búsqueda por texto con debounce para reducir llamadas innecesarias.
- Visualización del detalle de cada transacción.
- Consulta del historial de eventos asociados a una transacción.
- Reproceso de transacciones fallidas con confirmación previa.
- Notificaciones visuales para informar el resultado de las acciones realizadas.

## Instalación

```bash
npm install
```

## Ejecución

Primero iniciar la API simulada:

```bash
npm run api
```

Luego iniciar la aplicación:

```bash
npm start
```

o

```bash
ng serve
```

La aplicación estará disponible en:

http://localhost:4200

## Pruebas

```bash
npm run test
```

## Pantallas y Flujos

- **Pantalla principal:** muestra los registros y acciones disponibles.
- **Filtros:** permite realizar búsquedas y aplicar criterios de consulta.
- **Detalle de transacción:** presenta información completa, payload e historial.
- **Reproceso:** permite reenviar transacciones fallidas mediante una confirmación previa.

## Decisiones técnicas

- Uso de Reactive Forms para la gestión de filtros.
- Implementación de debounceTime y distinctUntilChanged en búsquedas.
- Uso de takeUntilDestroyed para limpieza automática de suscripciones.
- Tipado estricto en TypeScript.
- Uso de Signals para el manejo del estado.
- Uso de Tailwind CSS para estilos.

## Consideraciones

- Solo las transacciones fallidas pueden reprocesarse.
- La persistencia se realiza mediante JSON Server.
- La solución puede evolucionar fácilmente a paginación desde backend.

## Mejoras futuras

- Paginación y ordenamiento desde backend.
- Autenticación y permisos.
- Generación de transacciones.
- Generación de escenarios de pruebas.
- Generación de endpoints para obtener catalogo de valores para estados, tipos y sistemas de origen y popular información de selects en el apartado de filtros.

