---
title: "Copias de seguridad en el panel: crear, bloquear y restaurar backups"
description: "Cómo funcionan las copias de seguridad del panel de Vhost: crear un backup, excluir carpetas, bloquearlo para que nadie lo borre y restaurarlo cuando algo sale mal."
pubDate: 2026-08-26
updatedDate: 2026-08-26
author: "Equipo de Vhost"
game: "Minecraft"
category: "Panel"
level: "Principiante"
summary:
  - "Una copia se crea desde la pestaña Backups y guarda el contenido completo del servidor tal y como está en ese momento."
  - "Puedes excluir carpetas pesadas que no aportan nada, como las de caché o los registros antiguos."
  - "La opción Locked impide que la copia se borre, ni siquiera por error: úsala en la última copia buena antes de un cambio gordo."
  - "El mejor momento para crear una es antes de actualizar la versión, instalar un modpack o tocar configuraciones a fondo."
faqs:
  - question: "¿Qué se guarda exactamente en una copia?"
    answer: "El contenido de la carpeta del servidor: mundos, plugins o mods, configuraciones y registros. Es decir, todo lo que ves en el gestor de archivos, salvo lo que tú decidas excluir al crearla."
  - question: "¿Puedo descargar la copia a mi ordenador?"
    answer: "Sí. Cada copia terminada se puede descargar desde su menú, y el panel muestra su checksum para que compruebes que el archivo ha llegado íntegro. Guardar una copia fuera del hosting es buena idea antes de un cambio importante."
  - question: "¿Para qué sirve marcar una copia como Locked?"
    answer: "Para que no se pueda borrar hasta que la desbloquees. Protege tu última copia buena de un borrado accidental y de que la rotación automática se la lleve por delante cuando llegues al límite de copias de tu plan."
  - question: "¿Restaurar una copia borra lo que tengo ahora?"
    answer: "Sí: la restauración sobrescribe el estado actual del servidor con el de la copia. Todo lo hecho desde que se creó se pierde, así que si hay algo que quieras conservar, créate una copia nueva antes de restaurar la antigua."
  - question: "¿Puedo hacer copias automáticas cada día?"
    answer: "Sí, con una tarea programada. En la pestaña Schedules puedes crear una tarea con la acción Create backup y la periodicidad que quieras, y se ejecutará sola sin que tengas que entrar al panel."
---

Las copias de seguridad viven en la pestaña **Backups** de tu servidor. Con
**Create backup** guardas el estado completo de la carpeta del servidor en ese
momento; después podrás descargarla, bloquearla para que nadie la borre o
restaurarla si algo se tuerce. Es la única red de seguridad real que tienes:
ni el gestor de archivos ni el SFTP tienen papelera.

## Crear una copia

Pulsa **Create backup** y verás tres campos:

![Ventana Create Backup del panel, con los campos Backup name, Ignored Files & Directories, el interruptor Locked y el botón Start backup](../../images/blog/panel/backup-crear.webp)

- **Backup name**: el nombre con el que la reconocerás. Si lo dejas vacío se
  genera uno automático, pero un nombre como `antes-de-subir-a-1.21` te va a
  ahorrar tiempo dentro de dos meses.
- **Ignored Files & Directories**: carpetas y archivos que quieres dejar fuera.
- **Locked**: impide que la copia se borre mientras siga marcada.

Al confirmar con **Start backup**, la copia se genera en segundo plano. Puedes
seguir usando el servidor mientras tanto.

## Qué conviene excluir

Cuanto más pesada es la copia, más tarda y más ocupa. Estas exclusiones casi
siempre compensan:

| Ruta | Por qué dejarla fuera |
| --- | --- |
| `logs/` | Registros antiguos que no vas a restaurar nunca |
| `cache/`, `.cache/` | Se regenera sola al arrancar |
| `crash-reports/` | Solo sirven en el momento del fallo |
| `dynmap/` | Los mapas renderizados pesan muchísimo y se vuelven a generar |

El campo admite comodines, y puedes **negar una regla** poniendo un signo de
exclamación delante de la ruta, para excluir una carpeta entera pero rescatar
algo de dentro. Si dejas el campo vacío, el panel usa el archivo `.pteroignore`
de la raíz del servidor, si es que existe.

## Bloquear la copia buena

La casilla **Locked** es más útil de lo que parece. Una copia bloqueada no se
puede borrar hasta que la desbloquees, así que sobrevive tanto a un clic
descuidado como a la rotación cuando llegas al límite de copias de tu plan.

La costumbre sana: antes de un cambio grande, crea una copia, **bloquéala**, y
desbloquéala cuando estés seguro de que el cambio ha ido bien.

## Restaurar

Cada copia terminada tiene su propio menú, con la opción de restaurar,
descargar o borrar. Ten claro lo que hace la restauración: **sobrescribe el
estado actual** con el de la copia, y todo lo que haya pasado desde entonces se
pierde.

Por eso, antes de restaurar una copia de hace una semana, crea una del estado
de hoy. Si resulta que en el mundo actual había algo que querías conservar,
seguirás teniéndolo.

## Cuándo crear una copia

No hace falta obsesionarse, pero hay cinco momentos en los que es obligatorio:

1. **Antes de cambiar de versión** de Minecraft.
2. **Antes de instalar un modpack** o una tanda grande de plugins.
3. **Antes de tocar configuraciones a fondo**, sobre todo las de generación de
   mundo.
4. **Antes de reinstalar el servidor** desde Settings, que borra archivos.
5. **Después de una construcción importante** que te dolería perder.

## Que se hagan solas

Lo mejor de todo es no tener que acordarte. En la pestaña **Schedules** puedes
crear una tarea con la acción **Create backup** y la periodicidad que quieras
—cada día de madrugada, por ejemplo— y el panel se encarga. Lo vemos en la guía
de [tareas programadas](/blog/tareas-programadas-reinicios-automaticos/).

Una recomendación: si automatizas las copias, revisa de vez en cuando que
siguen creándose y que no te has quedado sin espacio. Una copia que falla en
silencio no es una copia.
