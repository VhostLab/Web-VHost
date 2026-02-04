# VHost - Plataforma Web 🎮

> Sitio web oficial de VHost - Proveedor premium de hosting para servidores de juegos

## 📖 Sobre el Proyecto

**VHost** es una plataforma web desarrollada con Astro que ofrece servicios de hosting especializado para servidores de videojuegos. El sitio permite a los usuarios explorar y contratar diferentes planes de hosting para juegos populares como Minecraft, Rust, ARK, GTA V, Hytale y TeamSpeak 3.

### Características Principales

- 🎮 **Múltiples Juegos Soportados**: Minecraft, Rust, ARK, GTA V, Hytale, TeamSpeak 3
- 💎 **Tres Gamas de Servidores**: Budget (económico), Normal (estándar), Premium (alto rendimiento)
- 🛡️ **Protección Anti-DDoS**: Todos los planes incluyen protección contra ataques
- 📊 **Monitoreo en Tiempo Real**: Visualización de latencia y estado de servidores
- 🌍 **Infraestructura en España**: Nodos en Barcelona y Logroño
- 📱 **Diseño Responsivo**: Optimizado para desktop y móvil
- ⚡ **Rendimiento Optimizado**: Build optimizado con compresión y minificación

### Stack Tecnológico

- **Framework**: [Astro 5.16.6](https://astro.build) - SSG (Static Site Generation)
- **Estilos**: [Tailwind CSS 3.4.17](https://tailwindcss.com) - Utility-first CSS
- **TypeScript**: Strict mode para seguridad de tipos
- **Interactividad Cliente**: Alpine.js (vía CDN)
- **Iconografía**: Font Awesome 6
- **Backend**: Node.js para API de estado de servidores

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
# Abre http://localhost:4321

# 3. Build para producción
npm run build

# 4. Vista previa del build
npm run preview
```

## 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes Astro reutilizables
│   ├── layout/          # Componentes de layout (Header, Footer, etc.)
│   ├── sections/        # Secciones de páginas
│   │   ├── home/       # Secciones específicas de la home
│   │   ├── products/   # Secciones de productos
│   │   ├── servers/    # Secciones de servidores
│   │   └── pages/      # Secciones de otras páginas
│   ├── products/        # Componentes de productos
│   ├── partners/        # Componentes de partners
│   ├── interactive/     # Componentes interactivos
│   └── ui/              # Componentes UI pequeños
│
├── data/                # Datos centralizados
│   ├── products.ts     # Productos por gama (budget, normal, premium)
│   └── servers.ts      # Configuración de servidores
│
├── services/            # Lógica de negocio
│   ├── pingService.ts           # Servicio de ping (cliente)
│   └── serverStatusService.ts   # Servicio de estado de servidores (servidor)
│
├── types/               # Tipos TypeScript
│   ├── product.ts      # Tipos de productos
│   ├── server.ts       # Tipos de servidores
│   └── index.ts        # Exportaciones centralizadas
│
├── scripts/             # Scripts de cliente
│   └── serverPing.ts   # Script de ping para el cliente
│
└── utils/               # Utilidades
    └── helpers.ts      # Funciones auxiliares
```

## 📜 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo en http://localhost:4321
npm run build        # Construye el sitio para producción
npm run preview      # Vista previa del build de producción
npm run check        # Verifica tipos TypeScript con Astro
npm run clean        # Limpia carpetas dist/ y .astro/
```

## 🎨 Características del Código

### Arquitectura Limpia

Este proyecto ha sido completamente refactorizado siguiendo las mejores prácticas:

- ✅ **Separación de Responsabilidades**: Datos, lógica y UI completamente separados
- ✅ **DRY (Don't Repeat Yourself)**: ~500 líneas de código duplicado eliminadas
- ✅ **Type Safety**: TypeScript en modo estricto para prevenir errores
- ✅ **Componentes Reutilizables**: Arquitectura basada en componentes genéricos
- ✅ **Path Aliases**: Imports limpios con `@components`, `@data`, `@services`
- ✅ **Optimización**: Minificación, compresión y optimización de imágenes


## 🗂️ Organización de Datos

### Productos

Los productos están centralizados en `src/data/products.ts`:

```typescript
import { productTiers } from '@data/products';

// Acceder a productos por gama
const budgetProducts = productTiers.budget.products;
const normalProducts = productTiers.normal.products;
const premiumProducts = productTiers.premium.products;
```

Cada gama incluye:
- **6 productos** (Coal, Iron, Gold, Lapis, Emerald, Diamond)
- **Características** específicas del plan
- **Procesador** asignado (i5-8500, i7-9700K, Ryzen 5 9600X)

### Servicios

#### API de Estado de Servidores
- **Endpoint**: `/api/status`
- **Función**: Obtiene el estado y latencia de todos los servidores
- **Método**: GET
- **Cache**: 30 segundos

#### Monitoreo en Cliente
- **Script**: `src/scripts/serverPing.ts`
- **Función**: Mide latencia en tiempo real desde el navegador
- **Frecuencia**: Cada 15 segundos
- **Visualización**: Colores dinámicos según latencia

## 🧩 Componentes Destacados

### ProductSection
Componente genérico que reemplaza 3 componentes duplicados:

```astro
<!-- En vez de tener BudgetSection, NormalSection, PremiumSection -->
<ProductSection tier="budget" />
<ProductSection tier="normal" />
<ProductSection tier="premium" />
```

### ProductCard
Card reutilizable para mostrar productos:

```astro
<ProductCard
  product={productData}
  features={tierFeatures}
/>
```

## 🌐 Páginas del Sitio

### Principales
- **/** - Página de inicio con hero, características, stats, comparación de precios
- **/tienda/tienda** - Catálogo de juegos disponibles
- **/partners** - Programa de partners y colaboradores
- **/soporte** - Contacto y soporte
- **/status** - Estado de servidores en tiempo real

### Juegos
- **/tienda/minecraft** - Hosting de Minecraft (3 gamas)
- **/tienda/hytale** - Hosting de Hytale
- **/tienda/rust** - Hosting de Rust
- **/tienda/ark** - Hosting de ARK
- **/tienda/gta5** - Hosting de GTA V
- **/tienda/teamspeak3** - Hosting de TeamSpeak 3

### Legales
- **/aviso-legal**
- **/politica-privacidad**
- **/politica-cookies**
- **/terminos-condiciones**

## 🛠️ Desarrollo

### Requisitos Previos
- Node.js >= 18.0.0
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/VhostLab/Web-VHost
cd Web-VHost

# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321) en tu navegador.

### Variables de Entorno

Este proyecto no requiere variables de entorno en desarrollo. Todas las configuraciones están en:
- `astro.config.mjs` - Configuración de Astro
- `tailwind.config.js` - Configuración de Tailwind
- `tsconfig.json` - Configuración de TypeScript

## 🚢 Deploy

```bash
# Construir para producción
npm run build

# Previsualizar build
npm run preview
```

El build genera archivos estáticos optimizados en `dist/` listos para desplegar en:
- Vercel
- Netlify
- Cloudflare Pages
- GitHub Pages
- Cualquier servidor estático

## 📝 Guías de Uso

### Agregar un Nuevo Producto

1. Edita `src/data/products.ts`
2. Agrega el producto al array correspondiente (budget/normal/premium)
3. El componente `ProductSection` lo mostrará automáticamente

```typescript
// src/data/products.ts
const budgetProducts: Product[] = [
  // ... productos existentes
  {
    type: "Netherite",
    ram: "32GB RAM",
    img: "/images/tienda/minecraft/plan/Netherite.webp",
    price: "19,99€ /mes",
    url: "https://billing.vhost.tech/products/Plan-Budget/Netherite-Budget",
    // ... resto de propiedades
  }
];
```

### Agregar una Nueva Página de Juego

1. Crea el archivo en `src/pages/tienda/nuevo-juego.astro`
2. Importa los componentes necesarios
3. Define los datos del juego (planes, FAQs)
4. Usa los componentes reutilizables

Ver `src/pages/tienda/rust.astro` como ejemplo.

### Modificar Precios

Todos los precios están centralizados en `src/data/products.ts`. Edita el archivo y reconstruye:

```bash
# Edita src/data/products.ts
# Luego reconstruye
npm run build
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y pertenece a VHost Hosting Services.

## 📧 Contacto

- Web: [vhost.tech](https://vhost.tech)
- Discord: [Click here](https://discord.gg/Ykr85wevrj)
- Email: vhostts3@gmail.com

---

**Hecho con ❤️ por el equipo de VHost**
