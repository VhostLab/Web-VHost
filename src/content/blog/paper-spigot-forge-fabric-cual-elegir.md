---
title: "Paper, Spigot, Forge o Fabric: qué software elegir para tu servidor"
description: "Diferencias entre Vanilla, Spigot, Paper, Purpur, Forge, NeoForge, Fabric y los híbridos: cuál usar según quieras plugins, mods o las dos cosas a la vez."
pubDate: 2026-08-26
updatedDate: 2026-08-26
author: "Equipo de Vhost"
game: "Minecraft"
category: "Mods y plugins"
level: "Principiante"
summary:
  - "Todo se reduce a una pregunta: ¿quieres plugins o quieres mods?"
  - "Los plugins solo se instalan en el servidor y tus amigos entran con su Minecraft normal: ahí Paper es la opción por defecto."
  - "Los mods se instalan también en cada jugador y con la misma versión: Forge, NeoForge o Fabric según lo pida el modpack."
  - "Si necesitas mods y plugins a la vez existen los híbridos (Mohist, Arclight, Ketting), a cambio de estabilidad y de quedarte sin soporte."
faqs:
  - question: "¿Cuál es la diferencia entre un plugin y un mod?"
    answer: "Un plugin se instala solo en el servidor y los jugadores entran con el Minecraft normal, sin tocar nada. Un mod tiene que estar instalado en el servidor y también en el cliente de cada jugador, con la misma versión, o la conexión será rechazada."
  - question: "¿Es mejor Paper o Spigot?"
    answer: "Paper para prácticamente todos los casos. Es un fork de Spigot con parches de rendimiento, más opciones de configuración y compatibilidad con los mismos plugins. Spigot solo tiene sentido con algún plugin antiguo que dé problemas en Paper."
  - question: "¿Puedo tener mods y plugins en el mismo servidor?"
    answer: "Sí, con un servidor híbrido como Mohist, Arclight o Ketting, que montan la API de Bukkit encima de un cargador de mods. Funciona, pero es una capa de compatibilidad: algunos plugins que tocan las tripas del servidor fallan, van por detrás en versiones y ni los autores de plugins ni los de mods dan soporte a servidores híbridos. Si solo necesitas una de las dos cosas, no lo uses."
  - question: "¿Mis amigos tienen que instalar algo para entrar?"
    answer: "Con Vanilla, Spigot, Paper o Purpur no: se conectan con el Minecraft de siempre. Con Forge, NeoForge o Fabric sí: necesitan el mismo cargador de mods y exactamente los mismos mods que el servidor."
  - question: "¿Qué software va mejor de rendimiento?"
    answer: "Para servidores de plugins, Paper y Purpur son los más optimizados. En mundos con mods, Fabric suele ser más ligero que Forge, aunque muchos modpacks grandes solo existen para Forge o NeoForge y ahí no hay elección."
---

La decisión se reduce a una pregunta: **¿quieres plugins o mods?** Si buscas
plugins y que tus amigos entren sin instalar nada, usa **Paper**. Si quieres
un modpack con dimensiones, máquinas y bloques nuevos, usa **Forge**,
**NeoForge** o **Fabric**, según lo pida el modpack. Vanilla solo si no
quieres añadir absolutamente nada. Y si necesitas **las dos cosas a la vez**,
existen los **híbridos** —Mohist, Arclight, Ketting—, que funcionan pero
tienen un precio en estabilidad que conviene conocer antes.

## Plugins y mods no son lo mismo

Esta es la diferencia que decide todo lo demás:

- **Plugins**: se instalan **solo en el servidor**. Cambian reglas, añaden
  comandos, protecciones de terreno, economía o minijuegos. Los jugadores se
  conectan con su Minecraft normal, sin instalar nada.
- **Mods**: se instalan **en el servidor y en cada jugador**. Añaden bloques,
  objetos, mobs y dimensiones nuevas. Todos deben tener los mismos mods y la
  misma versión.

## Comparativa rápida

| Software | Qué admite | El jugador instala | Ideal para |
| --- | --- | --- | --- |
| Vanilla | Nada | Nada | Supervivencia pura entre amigos |
| Spigot | Plugins | Nada | Servidores antiguos ya montados |
| Paper | Plugins | Nada | La opción por defecto |
| Purpur | Plugins | Nada | Quien quiere tocar cada detalle |
| Forge | Mods | Mods | Modpacks clásicos y grandes |
| NeoForge | Mods | Mods | Modpacks modernos |
| Fabric | Mods | Mods | Mods ligeros y de rendimiento |
| Mohist | Mods + plugins | Mods | Modpack con economía o protecciones |
| Arclight | Mods + plugins | Mods | Lo mismo, también sobre Fabric |
| Ketting | Mods + plugins | Mods | Alternativa reciente sobre Forge |

## La rama de los plugins: Spigot, Paper y Purpur

Todas vienen de la misma familia y comparten la API de Bukkit, así que los
plugins suelen funcionar en las tres:

- **Spigot** es el veterano. Funciona, pero se ha quedado atrás.
- **Paper** es un fork de Spigot con parches de rendimiento y un fichero de
  configuración mucho más completo. Es lo que recomendamos por defecto: mismo
  catálogo de plugins, bastante más rendimiento.
- **Purpur** es un fork de Paper que añade decenas de opciones para modificar
  el comportamiento del juego. Interesante si te gusta afinar; innecesario si
  solo quieres que vaya rápido.

## La rama de los mods: Forge, NeoForge y Fabric

- **Forge** es el cargador histórico y el que usan la mayoría de modpacks
  grandes. A cambio, arranca más pesado y tarda en actualizarse.
- **NeoForge** nació como bifurcación de Forge y es hacia donde han ido
  muchos modpacks recientes. Antes de elegir, mira cuál pide **tu** modpack.
- **Fabric** es ligero y se actualiza muy rápido a cada versión nueva. Es el
  favorito para mods de optimización y paquetes pequeños, aunque su catálogo
  de modpacks grandes es menor.

La regla aquí es simple: **no eliges tú, elige el modpack**. Instala el
cargador que pida y en la versión exacta que pida.

## La tercera vía: híbridos, mods y plugins a la vez

Hay un caso que las dos ramas anteriores no cubren: quieres **un modpack y
además LuckPerms, una economía o protección de terreno**. Para eso están los
híbridos, que montan la API de Bukkit encima de un cargador de mods:

- **Mohist**: el más conocido. Forge más plugins de Bukkit y Spigot.
- **Arclight**: cubre Forge, NeoForge y también Fabric, y es de los que mejor
  al día se mantienen.
- **Ketting**: opción reciente sobre Forge, pensada para versiones actuales.
- **CatServer**: solo tiene sentido si sigues en 1.12.2.

### Lo que nadie te cuenta antes de instalarlos

Funcionan, y para muchos servidores son la única forma de tener lo que
quieren. Pero hay que ir con los ojos abiertos:

- **Son una capa de compatibilidad, no un servidor nativo.** Reimplementan
  Bukkit sobre un cargador de mods, y esa traducción no siempre es perfecta:
  hay plugins que tocan las tripas del servidor y fallan, y mods que se
  comportan raro.
- **Nadie te va a dar soporte.** La mayoría de autores de plugins y de mods
  cierran el ticket en cuanto ven que el servidor es híbrido, porque no pueden
  reproducir el fallo. El problema pasa a ser tuyo.
- **Van por detrás en versiones.** Tienen que esperar a que salga el cargador
  de mods y, encima, a portar la capa de Bukkit.
- **Consumen más.** Cargas el modpack completo y, además, los plugins.

### Cuándo compensa y cuándo no

| Situación | Qué usar |
| --- | --- |
| Modpack + rangos, economía o protecciones | Híbrido |
| Solo plugins | Paper, siempre |
| Solo un modpack | Forge, NeoForge o Fabric |
| Servidor grande donde la estabilidad manda | Evita el híbrido |

Si vas a montar uno, **prueba primero con pocos plugins** y ve añadiendo de uno
en uno: así sabrás cuál rompe algo. Y haz una
[copia de seguridad](/blog/copias-seguridad-backups-panel/) antes de cada
tanda, que es barata y te ahorra el disgusto.

Hay una alternativa más limpia para comunidades grandes: **dos servidores
detrás de un proxy** —uno con mods y otro con plugins—, cada uno nativo y
estable. Es más trabajo de montar, pero no arrastra ninguna de las pegas de
arriba.

## Cómo decidir en 30 segundos

1. ¿Quieres que tus amigos entren sin instalar nada? → **Paper**.
2. ¿Vais a jugar un modpack concreto? → El cargador que exija ese modpack.
3. ¿El modpack **y además** plugins de rangos o economía? → Un **híbrido**
   (Mohist, Arclight o Ketting), asumiendo lo que cuesta en estabilidad.
4. ¿Quieres pocos mods y la última versión cuanto antes? → **Fabric**.
5. ¿No quieres añadir nada? → **Vanilla**.

Ten en cuenta el consumo: un servidor de mods parte de una base de memoria
muy superior a uno de plugins. Puedes calcular lo que necesitas con la guía
de [cuánta RAM necesita un servidor de Minecraft](/blog/cuanta-ram-servidor-minecraft/),
y si aún no tienes servidor, empezar por los
[planes de Minecraft de Vhost](/tienda/minecraft/), donde puedes instalar
cualquiera de estos desde el panel y cambiar de uno a otro cuando quieras.
