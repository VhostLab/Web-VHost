---
title: "Cómo poner un mapa descargado en tu servidor de Minecraft"
description: "Instala mapas de aventura, parkour u OneBlock en tu servidor desde la pestaña Worlds del panel de Vhost, o súbelos a mano cambiando level-name en server.properties."
pubDate: 2026-08-28
updatedDate: 2026-08-28
author: "Equipo de Vhost"
game: "Minecraft"
category: "Panel"
level: "Principiante"
summary:
  - "La pestaña Worlds instala mapas en el servidor sin que descargues nada: OneBlock, mapas de aventura, parkour y skyblock."
  - "El mundo que carga el servidor lo decide level-name en server.properties, no la carpeta que exista."
  - "Cambiar de mapa no borra el anterior: se queda en su carpeta y puedes volver cambiando level-name."
  - "Muchos mapas están hechos para una versión concreta de Minecraft y se rompen en otra."
faqs:
  - question: "¿Dónde se elige qué mundo carga el servidor?"
    answer: "En la propiedad level-name de server.properties, que guarda el nombre de la carpeta del mundo. El servidor carga esa carpeta y ninguna otra. Puedes cambiarla desde la pestaña Properties del panel."
  - question: "¿Instalar un mapa borra el mundo que tenía?"
    answer: "No. El mundo anterior se queda en su carpeta, simplemente deja de usarse. Si quieres volver a él, cambias level-name otra vez al nombre de su carpeta y reinicias. Eso sí, si vas justo de disco conviene borrar los que ya no uses."
  - question: "¿Por qué mi mapa aparece roto o con bloques que faltan?"
    answer: "Casi siempre porque el mapa está hecho para otra versión de Minecraft. Los mapas de aventura suelen depender de comandos y bloques concretos, y al abrirlos en una versión distinta esas piezas cambian o desaparecen. Comprueba para qué versión se publicó."
  - question: "¿Tienen que descargarse mis amigos el mapa?"
    answer: "No. El mundo vive en el servidor, así que se conectan con su Minecraft normal. Otra cosa es que el mapa pida un paquete de recursos, que sí se descarga en el cliente y suele ofrecerse solo al entrar."
  - question: "¿Puedo subir un mapa que me he descargado por mi cuenta?"
    answer: "Sí. Subes la carpeta del mundo a la raíz del servidor con Upload Folders, o comprimida en zip para descomprimirla allí, y luego pones su nombre en level-name. Es el mismo resultado que la pestaña Worlds, a mano."
---

Un mapa de Minecraft es una carpeta de mundo. Ponerlo en tu servidor es
dejarla en el sitio correcto y decirle al servidor que cargue esa y no la suya.

El panel lo hace por ti desde la pestaña **Worlds**, en el grupo *Content*.

## Desde la pestaña Worlds

![Pestaña Worlds del panel con el buscador y las tarjetas de los mapas disponibles, cada una con su botón Select version](../../images/blog/panel/worlds-buscador.webp)

Funciona como las demás pestañas de contenido: buscas, eliges y **Select
version**. Encontrarás sobre todo mapas de OneBlock, skyblock, aventura y
parkour, que son los que más se juegan en servidores con amigos.

La pestaña **Installed worlds** te dice cuáles tienes ya descargados.

## Lo que de verdad decide qué mundo carga

Esta es la parte que despista a casi todo el mundo: **tener la carpeta del mapa
en el servidor no basta**. El servidor carga el mundo cuyo nombre aparece en la
propiedad `level-name` de `server.properties`.

Si el mapa se llama `OneBlock`, la propiedad tiene que decir exactamente eso:

```
level-name=OneBlock
```

Lo cambias sin tocar archivos desde la pestaña **Properties**, buscando
`level-name` en su buscador. Está explicado en
[cómo configurar server.properties desde el panel](/blog/editar-server-properties-panel/).

Después, **reinicia**. El cambio de mundo solo se aplica al arrancar.

Dos detalles que ahorran disgustos:

- El nombre distingue mayúsculas de minúsculas.
- Si te equivocas y pones un nombre que no existe, el servidor no falla:
  **genera un mundo nuevo y vacío con ese nombre**. Si arrancas y apareces en
  un mundo recién creado, revisa cómo lo has escrito.

## Subir un mapa que te has descargado tú

Si el mapa no está en la pestaña Worlds, se sube a mano:

1. Descomprime el `.zip` en tu ordenador. Dentro tiene que haber una carpeta
   con un archivo `level.dat`: **esa** es la carpeta del mundo, y a veces está
   metida un nivel más adentro de lo que parece.
2. En la pestaña **Files**, en la raíz del servidor, usa **Upload** →
   **Upload Folders** y sube esa carpeta.
3. Cambia `level-name` al nombre de la carpeta.
4. Reinicia.

Para un mapa grande, el navegador puede quedarse corto. En ese caso sube el
`.zip` y descomprímelo ya dentro del servidor, o conéctate por
[SFTP con FileZilla o WinSCP](/blog/conectar-sftp-filezilla-winscp/).

## La versión importa

Muchos mapas, sobre todo los de aventura, están hechos para una versión
concreta de Minecraft. Dependen de comandos, de bloques y de estructuras que
cambian entre versiones, y al abrirlos en otra se rompen de formas raras:
puertas que no se abren, comandos que no disparan, zonas vacías.

Mira para qué versión se publicó el mapa y, si hace falta, cámbiala desde
[la pestaña Versions](/blog/cambiar-version-software-servidor/). Ten en cuenta
que abrir un mundo en una versión más nueva actualiza su formato **sin marcha
atrás**.

## Antes de cambiar de mapa, una copia

Cambiar `level-name` no borra el mundo anterior: se queda en su carpeta y
puedes volver cuando quieras. Pero si vas a mover carpetas o a hacer limpieza,
crea antes una copia desde **Backups**, que el borrado del gestor de archivos
no tiene papelera:
[copias de seguridad en el panel](/blog/copias-seguridad-backups-panel/).

Y si andas justo de disco, acuérdate de que los mundos viejos siguen ocupando
sitio aunque no se usen.
