---
title: "Cómo cambiar la versión o el software de tu servidor desde el panel"
description: "La pestaña Versions instala Paper, Purpur, Fabric, Forge, NeoForge y diez opciones más en un clic. Cómo cambiar de software o de versión sin perder el mundo, y qué casilla no marcar nunca sin querer."
pubDate: 2026-08-28
updatedDate: 2026-08-28
author: "Equipo de Vhost"
game: "Minecraft"
category: "Panel"
level: "Intermedio"
summary:
  - "La pestaña Versions instala catorce softwares distintos en un clic, desde Vanilla hasta los híbridos como Mohist."
  - "Cambiar de versión no borra tu mundo: la casilla Danger zone que sí lo borra viene desmarcada y hay que marcarla a propósito."
  - "Aun así, crea una copia antes: un mundo abierto en una versión más nueva no se puede devolver a la anterior."
  - "Cambiar de software es lo que decide si podrás usar plugins, mods o ninguna de las dos cosas."
faqs:
  - question: "¿Cambiar la versión borra mi mundo?"
    answer: "No por defecto. La ventana de instalación trae una casilla llamada Danger zone que resetea el servidor y borra todos los archivos, y viene desmarcada. Si no la tocas, se sustituye solo el software y tu mundo, tus configuraciones y tus mods siguen ahí."
  - question: "¿Puedo volver a una versión anterior después?"
    answer: "El software sí se puede devolver a la versión antigua, pero el mundo no siempre. Cuando Minecraft abre un mundo con una versión más nueva, actualiza su formato, y esa conversión no tiene marcha atrás. Por eso conviene crear una copia antes de subir de versión."
  - question: "¿Qué diferencia hay entre cambiar la versión y cambiar el software?"
    answer: "La versión es el número de Minecraft, por ejemplo pasar de 1.21.1 a 1.21.4. El software es el programa que hace de servidor: Vanilla, Paper, Fabric, Forge. Cambiar de software es lo que determina si podrás usar plugins, mods o ninguna de las dos cosas."
  - question: "Después de cambiar de software, ¿siguen valiendo mis plugins?"
    answer: "Solo si te mueves entre softwares de la misma familia. Paper, Spigot y Purpur comparten plugins entre ellos. Si pasas de Paper a Fabric, la carpeta plugins deja de usarse por completo y tendrás que buscar mods equivalentes."
  - question: "¿Tengo que reinstalar el servidor entero para cambiar de software?"
    answer: "No. La pestaña Versions sustituye el software y ya está. La opción Reinstall Server de la pestaña Settings es otra cosa distinta y bastante más agresiva: vuelve a ejecutar el script de instalación y puede tocar tus archivos."
---

Cambiar la versión de Minecraft de tu servidor, o pasar de Vanilla a Paper para
poder usar plugins, es una pestaña y dos clics. Está en **Versions**, dentro
del grupo *Content* del menú lateral.

## Los catorce softwares que puedes instalar

![Pestaña Versions del panel con las tarjetas de los catorce softwares disponibles, cada una con su botón Browse](../../images/blog/panel/versiones-lista.webp)

El listado sale de **MCJars**, que mantiene las descargas oficiales de cada
proyecto al día. Están agrupados por lo que hacen:

| Familia | Softwares | Para qué |
| --- | --- | --- |
| Vanilla | Vanilla | Minecraft tal cual, sin plugins ni mods |
| Plugins | Paper, Spigot, Purpur, Pufferfish, Folia | Servidores con plugins; Paper es la opción por defecto |
| Mods | Fabric, Forge, NeoForge | Servidores con mods |
| Híbridos | Mohist, Arclight | Mods y plugins a la vez, a cambio de estabilidad |
| Proxies | Velocity, Waterfall, BungeeCord | Unir varios servidores bajo una sola IP |

Si no tienes claro cuál te conviene, la comparativa completa está en
[Paper, Spigot, Forge o Fabric: qué software elegir](/blog/paper-spigot-forge-fabric-cual-elegir/).

## Instalarlo

Pulsa **Browse** en el software que quieras y se abre la ventana de
instalación:

![Ventana Browse versions Fabric con el desplegable de versión, la casilla Danger zone desmarcada y el botón Install](../../images/blog/panel/versiones-instalar.webp)

Tiene solo dos cosas:

- **Select a version**: el desplegable con todas las versiones publicadas.
  Incluye las snapshots y las release candidate, así que fíjate en lo que
  eliges si buscas algo estable.
- **Danger zone**: una casilla que dice *"Reset the server, and delete all
  files (worlds, configs, plugins etc)"*.

Sobre esa casilla, lo importante: **viene desmarcada y así debe quedarse** en
un cambio normal. Si no la tocas, el panel sustituye el software y deja
intactos tu mundo, tus configuraciones y tus mods. Solo tiene sentido marcarla
cuando quieras empezar de cero a propósito.

Elige la versión, comprueba que la casilla sigue desmarcada y pulsa
**Install**.

## Lo que sí conviene hacer antes

Que el instalador no borre nada no significa que no haya riesgo. El riesgo está
en el propio Minecraft: **cuando un mundo se abre con una versión más nueva, su
formato se actualiza y esa conversión no tiene vuelta atrás**. Podrás devolver
el software a la versión anterior, pero el mundo ya no abrirá bien en ella.

Así que, antes de subir de versión en un servidor con gente dentro:

1. Crea una copia desde la pestaña **Backups**. Ponle un nombre que lo diga,
   del tipo *"Antes de pasar a 1.21.4"*, y márcala como **Locked** para que no
   se la lleve la rotación automática. Lo tienes en
   [copias de seguridad en el panel](/blog/copias-seguridad-backups-panel/).
2. Comprueba que tus plugins o mods **ya existen para la versión nueva**. Es lo
   que más veces obliga a dar marcha atrás: el servidor arranca, pero medio
   modpack se queda fuera.
3. Avisa a tus jugadores, porque tendrán que cambiar de versión en el launcher.

## Qué pasa con lo que ya tenías

Depende de hacia dónde te muevas:

| Cambio | Qué ocurre |
| --- | --- |
| Paper → Purpur, Spigot → Paper | Los plugins siguen funcionando; son compatibles entre sí |
| Paper → Fabric o Forge | La carpeta `plugins` deja de usarse; necesitas mods |
| Fabric → Forge | Los mods **no** son compatibles; hay que rehacer la lista |
| Vanilla → cualquiera | El mundo se conserva y ganas plugins o mods |
| Subir de versión de Minecraft | El mundo se convierte al formato nuevo, sin marcha atrás |

## Después de instalar

Arranca el servidor y mira la **Console**. Los primeros segundos te dirán si
algún plugin o mod se ha quedado fuera por incompatibilidad.

Si has pasado a un cargador de mods, ya tienes disponible la pestaña **Mods**
para instalarlos sin descargar nada:
[cómo instalar mods desde el panel](/blog/instalar-mods-panel-automatico/).
Y si te has movido a Paper o Spigot, la equivalente es la pestaña **Plugins**:
[cómo instalar plugins desde el panel](/blog/instalar-plugins-panel/).

## No lo confundas con Reinstall Server

En la pestaña **Settings** hay un botón llamado **Reinstall Server**. No es lo
mismo y es bastante más agresivo: vuelve a ejecutar el script de instalación
original del servidor, y por el camino puede borrar o modificar archivos.

Para cambiar de versión o de software, lo que quieres es **Versions**.
