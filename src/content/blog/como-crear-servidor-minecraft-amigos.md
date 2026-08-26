---
title: "Cómo crear un servidor de Minecraft para jugar con amigos"
description: "Tres formas de crear un servidor de Minecraft para jugar con amigos: mundo en LAN, Realms o servidor alojado. Requisitos, pasos y qué elegir en cada caso."
pubDate: 2026-08-26
updatedDate: 2026-08-26
author: "Equipo de Vhost"
game: "Minecraft"
category: "Instalación"
level: "Principiante"
summary:
  - "Hay tres caminos: abrir tu mundo a la LAN, contratar Realms o levantar un servidor propio."
  - "La LAN es gratis, pero solo llega a quien esté en tu misma red y se acaba al cerrar el mundo."
  - "Realms es oficial y sencillo, aunque no admite mods ni plugins."
  - "Si quieres mods, jugar por internet y no dejar el PC encendido, la opción práctica es un servidor alojado."
faqs:
  - question: "¿Es gratis crear un servidor de Minecraft?"
    answer: "Montarlo en tu propio PC es gratis: el .jar del servidor lo descargas de minecraft.net sin coste. Lo que no es gratis es mantenerlo online, porque consume tu conexión y obliga a tener el equipo encendido. Un servidor alojado parte de 0,75 €/mes y está disponible 24/7."
  - question: "¿Necesito abrir puertos en el router para jugar con amigos?"
    answer: "Solo si alojas el servidor en tu casa: hay que abrir el puerto 25565 y exponer tu IP pública. Con un servidor alojado no hace falta tocar el router, porque tus amigos se conectan a una IP o dominio que te damos ya funcionando."
  - question: "¿Cuántos amigos pueden entrar en mi servidor?"
    answer: "No hay límite técnico fijo: lo marca la RAM y la CPU. Con 2 GB entran cómodamente 4 jugadores en vanilla y con 8 GB unos 10-12 con plugins. El parámetro max-players de server.properties define el tope."
  - question: "¿Pueden jugar juntos amigos de Java y de Bedrock?"
    answer: "De serie no: son dos ediciones incompatibles. Se puede unir a ambas instalando Geyser y Floodgate en un servidor Java, que traduce las conexiones de Bedrock, aunque algunos mods y plugins no funcionan igual."
  - question: "¿Tengo que tener el PC encendido para que mis amigos jueguen?"
    answer: "Si el servidor está en tu ordenador, sí: al apagarlo el mundo deja de estar disponible. Esa es la razón principal por la que la mayoría acaba pasando a un servidor alojado, que sigue online aunque tú no estés jugando."
---

Hay **tres formas de crear un servidor de Minecraft** para jugar con amigos:
abrir tu mundo a la **LAN** (gratis, pero solo para quien esté en tu misma
red), contratar **Realms** (oficial y sencillo, sin mods ni plugins) o
levantar un **servidor propio**, ya sea en tu PC o alojado. Si quieres jugar
por internet, con mods y sin depender de tener el ordenador encendido, la
opción práctica es la tercera.

## Qué opción te conviene

| Opción | Jugadores | Mods y plugins | Disponible 24/7 | Coste |
| --- | --- | --- | --- | --- |
| Mundo en LAN | Solo misma red | Sí (los del mundo) | No | Gratis |
| Minecraft Realms | Hasta 10 | No | Sí | Suscripción |
| Servidor en tu PC | Los que aguante | Sí | No | Gratis + tu luz |
| Servidor alojado | Según el plan | Sí | Sí | Desde 0,75 €/mes |

## Opción 1: abrir tu mundo a la LAN

Es la vía más rápida y no requiere instalar nada. Entra en tu mundo, pulsa
`Esc`, elige **Abrir para LAN**, decide el modo de juego y pulsa **Iniciar
mundo LAN**. Tus amigos verán la partida en la pestaña multijugador siempre
que estén conectados a **la misma red** que tú.

Sirve para una tarde con gente en casa, pero no para jugar por internet: en
cuanto cierras el mundo, se acabó.

## Opción 2: montar el servidor en tu propio PC

Necesitas Java instalado y la versión correcta según tu Minecraft:

| Versión de Minecraft | Versión de Java necesaria |
| --- | --- |
| 1.17 | Java 16 |
| 1.18 – 1.20.4 | Java 17 |
| 1.20.5 en adelante | Java 21 |

Los pasos son estos:

1. Descarga el `server.jar` desde la web oficial de Minecraft.
2. Colócalo en una carpeta vacía y ejecútalo una vez: generará varios
   archivos y se cerrará.
3. Abre `eula.txt` y cambia `eula=false` por `eula=true`.
4. Vuelve a ejecutarlo. Ya tienes el mundo generado y el servidor en marcha.
5. Ajusta `server.properties`: `max-players`, `difficulty`, `view-distance`.

Para que entren desde fuera de tu casa tendrás que **abrir el puerto 25565**
en el router y pasarles tu IP pública. Aquí llegan los tres problemas de
siempre: expones tu IP, la subida de tu conexión limita cuánta gente aguanta
y el servidor se cae cada vez que apagas el PC.

## Opción 3: un servidor alojado

Es lo que resuelve los tres puntos anteriores: el servidor está en un centro
de datos, sigue online aunque tú no juegues, no tocas el router y la conexión
no depende de tu fibra. Instalas mods o plugins desde el panel y tus amigos
se conectan con una dirección fija.

En Vhost lo tienes listo en minutos con protección anti-DDoS incluida y
puedes empezar pequeño e ir subiendo: consulta los
[planes de Minecraft de 1 a 16 GB desde 0,75 €/mes](/tienda/minecraft/).

## Cuánta RAM pedir y cómo conectarse

Para elegir tamaño, la regla rápida es 2 GB para 1-4 jugadores en vanilla y
8 GB en adelante si vais con mods; lo tienes desglosado en nuestra guía sobre
[cuánta RAM necesita un servidor de Minecraft](/blog/cuanta-ram-servidor-minecraft/).

Cuando esté arrancado, tus amigos solo tienen que abrir Minecraft, entrar en
**Multijugador → Añadir servidor** y escribir la dirección que les pases. Si
usáis mods, todos deben tener **exactamente los mismos mods y la misma
versión**, o el servidor rechazará la conexión.
