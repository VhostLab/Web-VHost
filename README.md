# VHOST Hosting Services Web

Sitio web oficial de [VHOST Hosting Services](https://vhost.tech), especializado en hosting de servidores para videojuegos como Minecraft, GTA V, Rust, Ark y Counter-Strike. Desarrollado con [Astro](https://astro.build/) y [TailwindCSS](https://tailwindcss.com/).

---

## 🚀 Características

- **Frontend moderno:** Astro + Tailwind para velocidad y diseño responsive.
- **Panel de tienda** para elegir hosting según juego, tipo de plan y presupuesto.
- **Sistema de preguntas frecuentes (FAQ)** para resolver dudas de clientes rápidamente.
- **Soporte multi-juego:** Minecraft, GTA V, Rust, Ark, CS y más.
- **Panel administrativo modular** (para futuras integraciones).
- **Optimización SEO y buenas prácticas de accesibilidad.**

---

## 📦 Instalación local

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/VhostLab/Web.git
   cd Web
   ```

2. **Instala dependencias:**

   ```bash
   npm install
   ```

3. **Ejecuta en modo desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abre en tu navegador:**  
   Normalmente en [http://localhost:4321](http://localhost:4321)

---

## 🛠️ Estructura del proyecto

```
public/
  images/
    tienda/
    juegos/
src/
  components/
    layout/
    movil/
    ui/
    sections/
  layouts/
  pages/
    tienda/
    ...
  styles/
  utils/
astro.config.mjs
tailwind.config.js
package.json
README.md
```

- **/public/images**: Imágenes públicas usadas en la web.
- **/src/components**: Componentes Astro (layout, UI, secciones, móvil, etc.).
- **/src/pages**: Rutas del sitio (páginas y subtiendas).
- **/src/styles**: Estilos globales.
- **/src/layouts**: Layouts principales.
- **/src/utils**: Utilidades JS/TS, helpers, etc.

---

## 🌐 Deploy/Producción

Para generar la web estática para producción:

```bash
npm run build
```

Los archivos generados estarán en `/dist`.

---



## 🧑‍💻 Stack principal

- [Astro](https://astro.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)

---

## 📧 Contacto

¿Dudas técnicas o soporte?  
Escríbenos a [vhostts3@gmail.com](mailto:vhostts3@gmail.com) o entra en nuestro [Discord](https://discord.gg/Ykr85wevrj).

---

## © 2024 VHOST Hosting Services. Todos los derechos reservados.
