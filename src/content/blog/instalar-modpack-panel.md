---
title: "Cómo instalar un modpack en tu servidor con un clic"
description: "La pestaña Modpacks del panel de Vhost instala modpacks de Modrinth y CurseForge sin descargar nada. Qué prepara por ti, qué tienes que hacer tú en el cliente y cuánta RAM vas a necesitar."
pubDate: 2026-08-28
updatedDate: 2026-08-28
author: "Equipo de Vhost"
game: "Minecraft"
category: "Mods y plugins"
level: "Principiante"
summary:
  - "La pestaña Modpacks busca en Modrinth y CurseForge e instala el pack entero, con su cargador y sus mods, sin que descargues nada."
  - "El servidor es solo la mitad: cada jugador necesita el mismo modpack y la misma versión en su launcher."
  - "Instalar un modpack sobrescribe la carpeta de mods, así que crea una copia antes si el servidor ya tiene gente."
  - "Los modpacks piden mucha memoria: uno mediano necesita 8 GB y los grandes 12 o 16."
faqs:
  - question: "¿El modpack se instala también en el cliente de mis amigos?"
    answer: "No. El panel prepara el servidor y nada más. Cada jugador tiene que instalar el mismo modpack en su ordenador, con la misma versión, usando un launcher como el de Modrinth, CurseForge, Prism o ATLauncher. Si las versiones no coinciden, la conexión se rechaza."
  - question: "¿Cuánta RAM necesita un modpack?"
    answer: "Un modpack ligero funciona con 8 GB para 2-5 jugadores. Los medianos piden 12 GB y los grandes, tipo RLCraft o All the Mods, 16 GB o más. Es la razón más habitual de que un servidor con modpack vaya a tirones."
  - question: "¿Instalar un modpack borra mi mundo?"
    answer: "El mundo suele conservarse, pero la carpeta de mods y buena parte de las configuraciones se sustituyen por las del pack. Y aunque el mundo siga ahí, un mundo generado sin esos mods se comportará de forma rara. Crea una copia antes y, si puedes, empieza mundo nuevo."
  - question: "¿Puedo instalar un modpack que no esté en Modrinth ni en CurseForge?"
    answer: "Sí, pero a mano: subes el server pack del modpack por SFTP o comprimido, y ajustas el arranque. Es bastante más trabajo, así que si el pack está en cualquiera de las dos webs, merece la pena usar la pestaña."
  - question: "¿Qué diferencia hay entre un modpack y una lista de mods?"
    answer: "Un modpack es una lista de mods ya elegida y configurada por alguien, con sus versiones probadas entre sí y sus ajustes hechos. Montar la lista tú mismo te da más control, pero tienes que resolver las compatibilidades a mano."
---

Un modpack son decenas o cientos de mods ya elegidos y configurados para
funcionar juntos. Montar uno a mano es un trabajo largo; el panel lo hace en un
clic desde la pestaña **Modpacks**, en el grupo *Content*.

## Cómo se instala

![Pestaña Modpacks del panel con el buscador, los filtros y las tarjetas de los modpacks disponibles](../../images/blog/panel/modpacks-buscador.webp)

Funciona igual que la pestaña de mods: buscador arriba, **Filters** a la
derecha para acotar por plataforma y versión, y un botón **Select version** en
cada tarjeta.

Eliges el modpack, eliges la versión y el panel se encarga del resto: descarga
el pack, instala el cargador que necesite —Fabric, Forge o NeoForge— y coloca
todos los mods y sus configuraciones en su sitio.

La pestaña **Installed modpacks**, al lado, te dice qué tienes puesto.

## La mitad que no hace el panel

Esto es lo que más dudas genera, así que va en claro: **el panel prepara el
servidor, no a tus jugadores**.

Cada persona que quiera entrar necesita **el mismo modpack y la misma versión**
instalados en su ordenador. Se hace con un launcher que los gestione:

- **Modrinth App**, si el pack está en Modrinth
- **CurseForge App**, si está en CurseForge
- **Prism Launcher** o **ATLauncher**, que admiten los dos

Si a alguien le rechaza la conexión nada más entrar, lo primero que hay que
mirar es si tiene exactamente la misma versión del pack.

## Antes de instalar, dos cosas

**Crea una copia.** Instalar un modpack sustituye la carpeta de mods y buena
parte de las configuraciones. El mundo suele sobrevivir, pero un mundo generado
sin esos mods se comporta de forma extraña: falta el terreno nuevo, faltan
estructuras y a veces aparecen bloques inexistentes. Lo tienes en
[copias de seguridad en el panel](/blog/copias-seguridad-backups-panel/).

**Mira la RAM.** Es la causa número uno de que un servidor con modpack vaya
mal:

| Modpack | Jugadores | RAM recomendada |
| --- | --- | --- |
| Ligero | 2-5 | 8 GB |
| Mediano | 5-10 | 12 GB |
| Grande (RLCraft, All the Mods) | 5-10 | 16 GB o más |

Los números completos, con el detalle de por qué, están en
[cuánta RAM necesita un servidor de Minecraft](/blog/cuanta-ram-servidor-minecraft/).

## Después de instalar

Arranca el servidor y ten paciencia: **el primer arranque de un modpack grande
tarda varios minutos**. El cargador tiene que procesar todos los mods y generar
sus archivos de configuración. Que parezca colgado durante un rato es normal.

Vigila la **Console**. Si algo no encaja, el error sale ahí.

Cuando entre el primer jugador, comprueba los TPS con `/tps`. Si van por debajo
de 20 desde el principio, casi siempre es memoria justa:
[cómo subir los TPS y quitar el lag](/blog/subir-tps-quitar-lag-servidor-minecraft/).

## Si quieres añadir algún mod al pack

Se puede, con cuidado: cualquier mod que añadas tiene que ser del mismo
cargador y de la misma versión de Minecraft que el pack, y tendrán que
instalarlo también todos tus jugadores.

Lo haces desde la pestaña **Mods**, como cuenta
[la guía de instalar mods desde el panel](/blog/instalar-mods-panel-automatico/).
Y antes de reiniciar, pasa la carpeta entera por el
[comprobador de mods](/utilidades/comprobador-mods/) para ver si has roto
alguna dependencia del pack.

## Si el modpack no está en ninguna de las dos webs

Entonces toca a mano: bajas el **server pack** del modpack —la versión para
servidor, no la de cliente—, lo subes por SFTP y ajustas el arranque. Es
bastante más trabajo, y lo tienes explicado en
[instalar mods manualmente](/blog/instalar-mods-manualmente-jar/) y en
[conectarte por SFTP](/blog/conectar-sftp-filezilla-winscp/).
