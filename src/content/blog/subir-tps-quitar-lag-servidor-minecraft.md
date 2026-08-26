---
title: "Cómo subir los TPS y quitar el lag de tu servidor de Minecraft"
description: "Cómo diagnosticar y arreglar el lag de un servidor de Minecraft: qué son los TPS, cómo medirlos con spark y los ajustes que más rendimiento recuperan."
pubDate: 2026-08-26
updatedDate: 2026-08-26
author: "Equipo de Vhost"
faqs:
  - question: "¿Qué son los TPS en un servidor de Minecraft?"
    answer: "TPS son los ticks por segundo que procesa el servidor. El máximo es 20 y significa que todo va a velocidad normal. Si bajan de 20, el mundo entero se ralentiza: los mobs se mueven a tirones, los cultivos crecen despacio y las máquinas de redstone fallan."
  - question: "¿Por qué mi servidor va a tirones si tengo buen ping?"
    answer: "Porque son dos problemas distintos. El ping mide la red entre tu PC y el servidor; los TPS miden cuánto tarda el servidor en procesar cada tick. Con 20 ms de ping y 12 TPS el juego irá lento igualmente, y la causa está en el servidor, no en tu conexión."
  - question: "¿Cómo sé qué plugin o mod está causando el lag?"
    answer: "Con el profiler spark: ejecuta /spark profiler start, deja pasar unos minutos con el servidor en uso y para con /spark profiler stop. Te devuelve un enlace con el desglose de qué está consumiendo el tiempo de cada tick."
  - question: "¿Bajar la distancia de renderizado mejora los TPS?"
    answer: "Es el ajuste con mejor relación esfuerzo-resultado. Pasar view-distance de 10 a 6 reduce mucho los chunks que el servidor mantiene cargados por jugador y suele recuperar varios TPS de golpe, sin que se note apenas al jugar."
  - question: "¿Añadir más RAM soluciona el lag?"
    answer: "Solo si el problema es falta de memoria. Si los TPS caen con la RAM a medio uso, el cuello de botella es la CPU o un plugin mal optimizado, y ampliar memoria no cambiará nada. Diagnostica antes de subir de plan."
---

Un servidor de Minecraft va fluido cuando mantiene **20 TPS** (ticks por
segundo). Si baja de ahí, el mundo se ralentiza y aparecen los tirones. Para
arreglarlo hay que hacer tres cosas en orden: **medir** con `/tps` y spark,
**identificar** qué consume el tick y **ajustar** distancia de renderizado,
entidades y plugins. Ampliar la RAM es lo último, no lo primero.

## TPS, MSPT y ping: no son lo mismo

Antes de tocar nada, conviene saber qué estás mirando:

- **TPS**: ticks por segundo del servidor. 20 es lo normal; por debajo, lag.
- **MSPT**: milisegundos que tarda cada tick. Por debajo de 50 ms vas
  sobrado; si supera 50 ms, los TPS empiezan a caer.
- **Ping**: latencia de red entre el jugador y el servidor. Un ping alto da
  tirones a **ese** jugador; unos TPS bajos los dan a **todos**.

Si tus jugadores tienen buen ping pero el mundo va lento, el problema está en
el servidor y esta guía es para ti.

## Cómo medir qué está pasando

En servidores Paper y derivados tienes `/tps` para ver el estado al momento.
Para saber la causa, instala **spark** y lanza un perfilado:

1. `/spark profiler start` con el servidor en uso real, con jugadores.
2. Espera unos minutos, mejor si coincide con un momento de lag.
3. `/spark profiler stop` y abre el enlace que devuelve.

El informe te dice qué plugin, mod o sistema se está comiendo el tick. Sin
este paso, cualquier cambio es adivinar.

## Síntomas y su causa habitual

| Síntoma | Causa probable | Solución |
| --- | --- | --- |
| Tirones al explorar | Generación de chunks nuevos | Pre-generar el mundo |
| Lag constante con gente | `view-distance` demasiado alto | Bajarlo a 6-8 |
| Lag en una zona concreta | Granja de mobs o redstone | Limitar o rediseñar |
| Empeora con las horas | Fuga de memoria o GC mal ajustado | Revisar flags de Java |
| Errores `OutOfMemoryError` | RAM insuficiente | Ampliar plan |

## Los ajustes que más recuperan

- **Baja `view-distance` y `simulation-distance`** en `server.properties`.
  De 10 a 6-8 es el cambio más rentable que existe.
- **Usa Paper o Purpur** en lugar del jar vanilla: traen parches de
  rendimiento y opciones de configuración que vanilla no tiene.
- **Pre-genera el mundo** con Chunky. Generar terreno sobre la marcha es lo
  que más castiga al servidor; hacerlo antes elimina esos picos.
- **Controla las entidades**: las granjas de mobs masivas y los cofres con
  decenas de hoppers encadenados son la causa clásica de lag localizado.
- **Quita lo que no uses**: cada plugin y cada mod suma trabajo por tick.
- **Revisa los flags de Java**: unos parámetros de recolección de basura bien
  puestos (las conocidas *Aikar's flags*) evitan los parones periódicos.

## Cuándo el problema sí es el plan

Si tras optimizar sigues con TPS bajos, mira dónde está el límite. Si la RAM
está al tope o ves errores de memoria, necesitas más memoria; puedes
calcularla con nuestra guía de
[cuánta RAM necesita un servidor de Minecraft](/blog/cuanta-ram-servidor-minecraft/).
Si la memoria va holgada pero el MSPT sigue alto, lo que necesitas es **más
rendimiento por núcleo de CPU**, porque Minecraft depende mucho de un solo
hilo.

En Vhost puedes cambiar de gama sin perder el mundo ni la configuración:
tienes las opciones en los
[planes de hosting de Minecraft](/tienda/minecraft/), con procesadores
elegidos precisamente por su rendimiento por núcleo.
