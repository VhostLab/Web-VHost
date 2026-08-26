---
title: "El gestor de archivos del panel: subir plugins, mods y editar configuraciones"
description: "Cómo usar el gestor de archivos del panel de Vhost: subir plugins y mods, editar server.properties desde el navegador, comprimir, mover y cambiar permisos."
pubDate: 2026-08-26
updatedDate: 2026-08-26
author: "Equipo de Vhost"
game: "Minecraft"
category: "Panel"
level: "Principiante"
summary:
  - "Todo cuelga de /home/container: lo que ves al abrir la pestaña Files es la raíz de tu servidor."
  - "Puedes subir arrastrando, o pegar una URL directa y que el panel descargue el archivo por ti."
  - "El menú de cada fila trae renombrar, mover, permisos, copiar, comprimir, descargar y borrar."
  - "El botón Advanced esconde dos atajos útiles: un editor de server.properties y la subida del icono del servidor."
faqs:
  - question: "¿Dónde tengo que dejar los plugins?"
    answer: "En la carpeta plugins de la raíz del servidor. Si no existe, es que tu servidor no usa Paper, Spigot ni Purpur: en Forge, NeoForge o Fabric la carpeta correcta es mods, y los plugins no funcionan ahí. Después de copiar el archivo hay que reiniciar el servidor para que lo cargue."
  - question: "¿Puedo subir un modpack entero desde el navegador?"
    answer: "Puedes, pero es lento y una conexión inestable te obliga a empezar de cero. Para cientos de archivos es mejor subir el zip y descomprimirlo ya en el servidor, o conectarte por SFTP con FileZilla o WinSCP."
  - question: "¿Cómo edito server.properties sin descargarlo?"
    answer: "Pulsa sobre el nombre del archivo y se abre el editor del panel. También tienes un atajo en el botón Advanced, con la opción Server Properties, que te presenta los mismos ajustes en un formulario. Guarda y reinicia el servidor para que los cambios se apliquen."
  - question: "¿Qué hago si un archivo da error de permisos?"
    answer: "Abre el menú de los tres puntos de esa fila y entra en Permissions. Ahí puedes ajustar los permisos del archivo o la carpeta sin salir del navegador, igual que harías con un chmod por consola."
  - question: "¿Se puede recuperar un archivo borrado por error?"
    answer: "Desde el gestor no: el borrado es inmediato y definitivo. La única red de seguridad son las copias de la pestaña Backups, así que conviene crear una antes de ponerte a limpiar carpetas."
---

El gestor de archivos del panel está en la pestaña **Files** de tu servidor y
te enseña `/home/container`, la raíz donde vive todo. Desde ahí puedes subir
plugins y mods, editar cualquier configuración en el navegador, comprimir,
mover y cambiar permisos, sin instalar nada.

## Lo que ves al entrar

La barra superior tiene cinco herramientas:

- **Search**: busca por nombre dentro de la carpeta en la que estés.
- **Create Directory**: crea una carpeta.
- **Upload**: sube archivos desde tu equipo. La flecha de al lado abre una
  segunda opción, **subir desde una URL**: pegas el enlace directo al archivo y
  el panel lo descarga por su cuenta, sin pasar por tu conexión.
- **New file**: crea un archivo vacío y lo abre en el editor.
- **Advanced**: dos atajos que merece la pena conocer, y que vemos más abajo.

Justo debajo hay una miga de pan (`home / container`) que te dice dónde estás y
te deja volver atrás de un clic.

## Subir plugins y mods

El sitio depende del software que use tu servidor:

| Software | Carpeta | Qué admite |
| --- | --- | --- |
| Paper, Spigot, Purpur | `plugins/` | Plugins `.jar` |
| Forge, NeoForge, Fabric | `mods/` | Mods `.jar` |
| Vanilla | — | Ni una cosa ni la otra |

Si la carpeta no existe, créala con **Create Directory** con ese nombre exacto,
en minúsculas. Copia dentro el `.jar` y **reinicia el servidor**: los plugins y
los mods se cargan al arrancar, así que hasta ese momento no pasará nada.

Para subir, puedes arrastrar los archivos directamente sobre la lista. Con un
modpack completo es mejor subir el `.zip` y descomprimirlo ya dentro del
servidor, o tirar de [SFTP con FileZilla o WinSCP](/blog/conectar-sftp-filezilla-winscp/).

## Editar configuraciones sin descargar nada

Pulsa el nombre de cualquier archivo de texto —`server.properties`, un `.yml`
de un plugin, `eula.txt`— y se abre el editor del panel. Cambias lo que
necesites, guardas y reinicias.

Es la forma cómoda de tocar ajustes sueltos: bajar el `view-distance`, cambiar
el `motd` o poner el servidor en modo creativo para una prueba.

## El menú de cada archivo

El botón de los tres puntos al final de cada fila abre siete acciones:

| Acción | Para qué |
| --- | --- |
| **Rename** | Cambiar el nombre |
| **Move** | Mover a otra carpeta |
| **Permissions** | Ajustar permisos, el equivalente a un `chmod` |
| **Copy** | Duplicar el archivo |
| **Archive** | Comprimirlo |
| **Download** | Descargarlo a tu equipo |
| **Delete** | Borrarlo, sin papelera ni vuelta atrás |

Las casillas de la izquierda permiten seleccionar varios archivos a la vez y
aplicarles la misma acción en bloque, que es lo práctico cuando hay que limpiar
una carpeta de plugins.

## Los dos atajos del botón Advanced

**Advanced** despliega dos herramientas que no están en un Pterodactyl normal:

- **Server Properties**: presenta los ajustes de `server.properties` en un
  formulario, en vez de dejarte a solas con el archivo de texto. Va bien para
  los cambios de siempre sin miedo a romper la sintaxis.
- **Upload Minecraft Icon**: sube el icono que se ve junto a tu servidor en la
  lista de servidores del juego. Necesita un PNG de 64 × 64 píxeles.

## Cuándo dejar el navegador

El gestor cubre el día a día, pero hay tres casos en los que conviene pasarse
al SFTP:

- Modpacks o mundos con muchísimos archivos.
- Descargar una carpeta entera a tu equipo.
- Subidas grandes en las que el navegador se atraganta.

## Antes de borrar nada

El borrado del gestor es inmediato y **no hay papelera**. Si vas a reorganizar
carpetas o a limpiar plugins viejos, crea antes una copia desde la pestaña
**Backups**: son dos clics y te ahorra el disgusto.
