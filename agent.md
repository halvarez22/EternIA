# Reglas Persistentes del Proyecto: EternIA (Generador de Memorias y Homenajes)

## REGLA INAMOVIBLE 1: APO (Auditoría Profunda Obligatoria) y Planning Mode Estricto
Quedan estrictamente prohibidos los "hotfixes" ciegos o rápidos. **NINGÚN CAMBIO ES TRIVIAL.** Antes de realizar CUALQUIER modificación a una lógica existente, el agente DEBE obligatoriamente:
1. **Mapeo del Grafo de Impacto Global:** Analizar toda la cadena de afectación: Componentes UI de formulario -> Servicios de Generación de Prompts -> Integración LLM (Gemini) -> Renderizado de Resultados (Letras/Storyboards).
2. **Identificación Previa de Efectos Secundarios (Zero Regressions):** Documentar qué otros componentes o tipos se verán alterados debido al cambio.
3. **Planning Mode Multi-Archivo:** Presentar un Plan de Implementación formal (`implementation_plan.md`) que detalle el diagnóstico técnico global antes de modificar código.

## REGLA INAMOVIBLE 2: HRU (Cero Hardcoding, Cero Regresiones, Universalidad Total)
- **Cero Hardcoding:** No se permite codificar valores fijos en la UI, ni quemar lógicas estáticas que limiten la creatividad. Los prompts base y configuraciones de LLM deben ser parametrizados.
- **Cero Regresiones:** Cualquier modificación en el frontend (React) o en el backend (`server.ts`) debe garantizar de forma irrefutable que el flujo actual de generación siga funcionando. Además, las actualizaciones en los prompts o versiones del modelo de IA no deben romper la validación del JSON ni empeorar la calidad poética o narrativa de las canciones y storyboards.
- **Universalidad Total:** La arquitectura y el flujo de orquestación deben ser capaces de manejar de forma homogénea distintos estilos musicales, tonos emocionales y categorías (bodas, despedidas, etc.) bajo un mismo contrato de interfaz.

## REGLA INAMOVIBLE 3: Arquitectura Anti-God-Component y Micro-Servicios Frontend
- **Delegación Obligatoria:** Todo motor lógico (ej. constructor de prompts, parseo y validación estricta de las respuestas JSON del LLM) DEBE construirse en un servicio/utilidad independiente e inyectarse en los componentes. Los componentes de React deben limitarse exclusivamente a "decidir a quién llamar" y renderizar.
- **Cero Tolerancia a Archivos Monstruo:** Si un componente de UI supera en complejidad su propósito presentacional (ej. el visor del Storyboard), debe separarse en Custom Hooks o sub-componentes modulares.

## REGLA INAMOVIBLE 4: U-First (Usabilidad y Experiencia Fantástica)
- **Empatía Técnica:** Dado que la aplicación maneja emociones y recuerdos, está estrictamente prohibido diseñar flujos que bloqueen al usuario. Toda interacción debe ser guiada y sumamente respetuosa.
- **Cero Callejones sin Salida:** Siempre proveer botones claros ("Volver", "Reintentar") si ocurre un error con el modelo de Gemini.
- **Efecto WOW:** Uso intensivo de Tailwind y librerías (como `motion`) para lograr transiciones, feedback visual constante y una interfaz altamente profesional y emotiva.

## REGLA INAMOVIBLE 5: SSD (Seguridad por Diseño - ISO/IEC 27034-1)
La refactorización debe alinearse estrictamente al estándar internacional de seguridad:
- **Sanitización Dinámica de Contexto:** Antes de enviar información personal o recuerdos del usuario a la API de Gemini, el sistema debe limpiar caracteres nulos, validar codificaciones y evitar inyecciones de prompt maliciosas, asumiendo un entorno "Zero Trust".
- **Aislamiento de Cargas (Anti-Data-Leak):** Garantizar la protección absoluta de la API Key, manteniéndola siempre en el backend (`server.ts`). El frontend jamás debe comunicarse directamente con la API externa para evitar exponer credenciales en el bundle.
- **Validación de Entradas en Servicios:** Cada módulo y endpoint (`/api/generate-story-script`) debe validar de forma independiente el origen e integridad de los datos que recibe.

## REGLA INAMOVIBLE 6: SQA (Software Quality Assurance) y Estrangulamiento Seguro
Para mitigar riesgos operativos al refactorizar o actualizar el motor de IA:
- **Mapeo de Dependencias (ARO):** No se permite migrar código o cambiar el esquema JSON del LLM sin mapear y documentar su firma y efectos secundarios en la UI (`types.ts`).
- **Refactorización por Capas (Strangler Fig Pattern):** Cualquier cambio estructural debe ejecutarse componente por componente. Validar primero el servicio de Gemini en el backend antes de conectarlo a la UI.
- **Idempotencia de Peticiones:** Las llamadas a Gemini en el frontend deben bloquear re-envíos múltiples de la misma solicitud (debouncing/bloqueo de UI) para prevenir consumos de tokens duplicados o estados de carrera.

## REGLA INAMOVIBLE 7: MCP (Model Context Protocol) Readiness y Context Economy
Aunque el frontend y backend llamen directamente a una API cloud (Gemini), la arquitectura debe asimilar los principios de MCP para una escalabilidad óptima:
- **Abstracción de Herramientas (Tooling):** La generación de letras y la creación de storyboards visuales no deben estar fuertemente acoplados a la UI, sino encapsularse como "Tools" o "Resources" estandarizados (similares a un servidor MCP).
- **Optimización de Contexto (Context Economy):** La ventana de contexto de Gemini es finita y tiene un costo. El sistema debe actuar como un regulador inteligente (similar a MCP), empaquetando estrictamente el historial relevante o limitando la longitud de las anécdotas para evitar latencias extremas y sobrecostos por tokens.
- **Modularidad de Prompts:** Todo el "system prompt" o contexto inicial debe inyectarse a través de un canal centralizado, preparando el terreno para múltiples agentes especializados (ej. Agente Músico vs Agente Guionista).

## REGLA INAMOVIBLE 8: Bucle de Descubrimiento de Código y Cero Parches
- Ante un problema (ej. un fallo en el renderizado del storyboard o desincronización en el JSON devuelto por Gemini), el agente ejecutará una estrategia de "Mapear Todo antes de Actuar", inspeccionando proactivamente la estructura del prompt en `server.ts` y las interfaces en `types.ts`.
- Planes de Implementación Consolidados y Definitivos para orquestar la comunicación Cliente-Servidor-IA.
- Si se descubre un efecto colateral (ej. ajustar la validación del backend rompe el estado del frontend), se debe detener la escritura y solicitar nueva aprobación (Cero parches aislados iterativos o "fix rápidos" sobre el código).
