---
title: "Tareas programadas: reinicios automáticos y backups sin estar delante"
description: "Programa reinicios, copias de seguridad y comandos automáticos en el panel de Vhost: modo fácil sin cron, avisos previos a los jugadores y encadenado de tareas."
pubDate: 2026-08-26
updatedDate: 2026-08-26
author: "Equipo de Vhost"
game: "Minecraft"
category: "Panel"
level: "Intermedio"
summary:
  - "Las tareas se crean en la pestaña Schedules, y el modo fácil las configura con desplegables, sin saber cron."
  - "Una tarea programada puede enviar un comando, ejecutar una acción de encendido o crear una copia de seguridad."
  - "El retraso entre tareas es lo que permite avisar a los jugadores un minuto antes de reiniciar."
  - "Un reinicio diario de madrugada arregla la mayoría de las fugas de memoria sin que nadie lo note."
faqs:
  - question: "¿Hace falta saber cron para programar una tarea?"
    answer: "No. El formulario se abre en modo fácil, con desplegables del tipo Cada día a medianoche o Días laborables, y una vista previa en texto de cuándo se ejecutará. El modo avanzado, con los cinco campos de cron, está ahí para quien lo necesite, y el panel incluye una chuleta de ejemplos."
  - question: "¿Qué puede hacer una tarea programada?"
    answer: "Tres cosas: enviar un comando a la consola, ejecutar una acción de encendido (arrancar, reiniciar, parar o matar el proceso) o crear una copia de seguridad. Una misma tarea puede encadenar varias acciones en orden."
  - question: "¿Cómo aviso a los jugadores antes de un reinicio?"
    answer: "Encadenando dos acciones dentro de la misma tarea: primero un comando say con el aviso, y después la acción de reinicio con un retraso de 60 segundos. Ese retraso es el que da tiempo a la gente a ponerse a salvo."
  - question: "¿Se ejecuta la tarea si el servidor está apagado?"
    answer: "Depende de la casilla Only When Server Is Online. Si está marcada, la tarea se salta cuando el servidor no está en marcha, que es lo que quieres para un reinicio. Desmárcala si lo que necesitas es justo lo contrario, por ejemplo arrancar el servidor a una hora fija."
  - question: "¿Con qué frecuencia conviene reiniciar un servidor?"
    answer: "Una vez al día de madrugada le va bien a casi todo el mundo. Si tienes muchos mods o plugins pesados y notas que el rendimiento se degrada con las horas, prueba cada doce horas. Reiniciar más a menudo no arregla nada y molesta a los jugadores."
---

Las tareas programadas están en la pestaña **Schedules** y sirven para que el
servidor haga solo lo que harías tú a mano: reiniciarse de madrugada, guardar
el mundo cada pocas horas o lanzar una copia de seguridad cada noche. **No hace
falta saber cron**: el formulario se abre en modo fácil, con desplegables.

## Crear la tarea

Pulsa **Create schedule**. En el formulario:

![Ventana Create new schedule con el nombre puesto, el modo fácil activo, los cinco desplegables de periodicidad y la vista previa que dice At 06:00 AM](../../images/blog/panel/tarea-crear.webp)

- **Schedule name**: un nombre que se entienda, como `Reinicio diario`.
- **Easy / Advanced**: el modo fácil usa desplegables con opciones ya hechas
  (*Cada 5 minutos*, *Cada día a medianoche*, *Días laborables*, *Fin de
  semana*…). El avanzado te da los cinco campos de cron, y con él aparece un
  botón de **chuleta** con ejemplos.
- Debajo de los desplegables hay una **vista previa en texto** del tipo
  «Every 5 minutes», que te confirma lo que acabas de configurar antes de
  guardar. Léela siempre: es la forma más rápida de cazar un error.
- **Only When Server Is Online**: la tarea solo se ejecuta si el servidor está
  encendido.
- **Schedule Enabled**: si lo desmarcas, la tarea se guarda pero no se ejecuta.
  Útil para dejarla preparada y activarla más adelante.

Al guardar, la tarea aparece en la lista con su estado y la hora de la próxima
ejecución.

## Añadir acciones

Una tarea vacía no hace nada: hay que darle acciones. Entra en ella y pulsa
**New Task**:

![Ventana Create Task con el desplegable Action en Send command, el campo Time offset, el Payload con el comando say del aviso y el interruptor Continue on Failure](../../images/blog/panel/tarea-accion.webp)

| Acción | Qué hace |
| --- | --- |
| **Send command** | Envía un comando a la consola, igual que si lo escribieras |
| **Send power action** | Arranca, reinicia, para o mata el proceso del servidor |
| **Create backup** | Lanza una copia de seguridad |

Cada acción tiene además dos ajustes importantes:

- **Time offset (in seconds)**: cuánto espera esta acción después de que
  termine la anterior. En la primera acción de la tarea no se aplica.
- **Continue on Failure**: si esta acción falla, las siguientes se ejecutan
  igualmente.

Ese retraso es la pieza clave: es lo que te permite avisar antes de reiniciar.

## Tres recetas que funcionan

### Reinicio diario avisando a los jugadores

Tarea con periodicidad **cada día a las 6:00** y dos acciones:

1. **Send command** → `say El servidor se reinicia en 60 segundos`
   (retraso: 0)
2. **Send power action** → `restart` (retraso: **60**)

Marca **Only When Server Is Online**: si el servidor ya está parado, no hay
nada que reiniciar.

### Copia de seguridad cada noche

Tarea **cada día a medianoche** con una sola acción, **Create backup**. Si tu
plan tiene un límite de copias, acuérdate de bloquear las que quieras
conservar; si no, la rotación acabará llevándoselas.

### Guardado periódico del mundo

Tarea **cada hora** con una acción **Send command** → `save-all`. Reduce lo que
se pierde si el servidor se cae entre guardados automáticos.

## Errores que se ven en el soporte

- **Poner el reinicio en hora punta.** Míralo con la lista de conexiones
  delante y elige el hueco más muerto del día.
- **Reiniciar sin avisar.** Un `say` sesenta segundos antes evita la mitad de
  las quejas.
- **Encadenar acciones con retraso 0.** Si la copia tarda dos minutos y el
  reinicio entra a los cero segundos, te cargas la copia a medias.
- **Programar cada 5 minutos «por si acaso».** Cada ejecución consume recursos;
  para un `save-all`, cada hora sobra.
- **No volver a mirarlo.** Entra de vez en cuando en la pestaña y comprueba la
  columna de última ejecución: una tarea que lleva semanas sin correr no te
  está protegiendo de nada.

## Combínalas con las copias

Los reinicios automáticos y [las copias de seguridad](/blog/copias-seguridad-backups-panel/)
son las dos automatizaciones que de verdad cambian el día a día de un servidor.
Con las dos puestas, puedes desaparecer una semana y el servidor sigue en pie.
