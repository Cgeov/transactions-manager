# Prueba técnica take-home — Desarrollador Frontend

## 1. Objetivo

Construir una aplicación frontend empresarial que permita consultar, filtrar, visualizar y gestionar transacciones operativas. La prueba busca validar dominio de **Angular preferentemente**, consumo de APIs, manejo de estado, componentes reutilizables, formularios, UX, manejo de errores, pruebas y documentación.

La intención no es evaluar diseño visual avanzado, sino claridad funcional, arquitectura frontend, mantenibilidad y experiencia de usuario.

## 2. Contexto del ejercicio

Una plataforma recibe transacciones desde sistemas externos. Los usuarios internos necesitan monitorear su estado, revisar errores y solicitar reprocesos cuando sea necesario.

Debes construir una interfaz web para operar estas transacciones.

## 3. Stack esperado

### Preferente

- Angular 17 o superior.
- TypeScript.
- RxJS.
- Angular Reactive Forms.

### Permitido si se justifica

- React con TypeScript.

### Deseable

- Angular Material, PrimeNG u otra librería UI.
- Manejo de estado con Signals, NgRx, Component Store u otra estrategia clara.
- Pruebas unitarias con Jasmine, Jest, Karma o equivalente.
- Mock API local, JSON Server, MSW, MirageJS o servicio simulado.
- Docker opcional.

## 4. Funcionalidades mínimas

### 4.1 Listado de transacciones

Construir una pantalla principal con tabla de transacciones.

Debe mostrar como mínimo:

- ID.
- Identificador externo.
- Tipo de transacción.
- Sistema origen.
- Estado.
- Fecha/hora de recepción.
- Última actualización.
- Acción para ver detalle.

### 4.2 Filtros

La pantalla debe permitir filtrar por:

- Estado.
- Tipo de transacción.
- Sistema origen.
- Texto libre o identificador externo.
- Rango de fechas, opcional.

### 4.3 Detalle de transacción

Construir una vista o panel de detalle que muestre:

- Datos generales de la transacción.
- Payload o resumen del payload.
- Estado actual.
- Mensaje de error, si aplica.
- Historial de eventos o intentos.

### 4.4 Reproceso controlado

Agregar una acción para solicitar reproceso de una transacción fallida.

Debe considerar:

- Confirmación previa.
- Evitar doble clic o doble envío accidental.
- Mostrar resultado de la acción.
- Manejo de errores.

### 4.5 Estados de UI

La aplicación debe manejar correctamente:

- Loading.
- Error.
- Empty state.
- Success feedback.
- Validaciones en filtros o formularios.

## 5. Fuente de datos

Puedes elegir una de estas opciones:

- Mock API local.
- Archivo JSON.
- Servicio simulado dentro de la aplicación.
- JSON Server u otra herramienta simple.

No es obligatorio construir backend real para esta prueba.

## 6. Requisitos técnicos esperados

El proyecto debe demostrar:

- Estructura clara de carpetas.
- Componentes reutilizables.
- Separación entre componentes, servicios y modelos.
- Uso correcto de TypeScript.
- Consumo de datos mediante servicios.
- Manejo correcto de errores HTTP o errores simulados.
- Diseño responsivo básico.
- Accesibilidad básica.
- Pruebas unitarias para componentes o servicios principales.
- Código legible y mantenible.

## 7. Entregables

Debes entregar un repositorio o archivo comprimido con:

```text
/frontend-solution
  /src
  README.md
  AI_USAGE.md
  package.json
  archivo de mock data o configuración mock
```

### README.md

Debe incluir:

- Descripción de la solución.
- Cómo instalar dependencias.
- Cómo ejecutar la aplicación.
- Cómo ejecutar pruebas.
- Descripción de pantallas y flujo.
- Decisiones técnicas relevantes.
- Supuestos realizados.
- Pendientes o mejoras futuras.

### AI_USAGE.md

Debes indicar si usaste o no herramientas de asistencia con IA.

Si usaste IA, documenta:

- Herramienta utilizada.
- Para qué la utilizaste.
- Qué partes aceptaste, modificaste o descartaste.
- Cómo validaste que el resultado era correcto.
- Qué decisiones técnicas fueron tuyas.

No incluyas credenciales, información confidencial ni datos sensibles en herramientas externas.

## 8. Uso de Coding Assistants con IA

El uso de IA está permitido. Será evaluado positivamente si demuestra criterio técnico y responsabilidad.

Se espera que puedas explicar:

- Qué prompts o instrucciones generales usaste.
- Qué revisaste antes de aceptar código sugerido.
- Cómo verificaste que la UI funcionara correctamente.
- Cómo evitaste introducir código innecesario, inseguro o que no entiendes.

El uso de IA no reemplaza la responsabilidad del candidato sobre el diseño, calidad y funcionamiento de la solución.

## 9. Criterios de evaluación

| Criterio | Peso |
|---|---:|
| Cumplimiento funcional | 20 |
| Arquitectura frontend y separación de responsabilidades | 15 |
| Uso de Angular/TypeScript/RxJS o stack equivalente | 15 |
| Experiencia de usuario y manejo de estados | 15 |
| Consumo de datos, errores y acciones de reproceso | 10 |
| Calidad de código y componentes reutilizables | 10 |
| Pruebas | 5 |
| Documentación y claridad de entrega | 5 |
| Uso responsable de IA | 5 |
| **Total** | **100** |

## 10. Criterios eliminatorios

La prueba puede ser descartada si:

- No se puede ejecutar.
- No incluye instrucciones claras.
- No implementa una aplicación web funcional.
- No permite consultar ni visualizar transacciones.
- No maneja errores o estados básicos de UI.
- Presenta código copiado sin comprensión aparente.
- Incluye credenciales reales o información sensible.

## 11. Revisión posterior

Durante la entrevista posterior se podrá pedir que expliques:

- Estructura de componentes.
- Estrategia de manejo de estado.
- Manejo de errores y loading.
- Decisiones de UX.
- Pruebas realizadas.
- Uso de IA, si aplica.
- Qué mejorarías con más tiempo.
