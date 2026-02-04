# Path Aliases - Guía de Uso

## Configuración

Los path aliases están configurados en `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@layouts/*": ["./src/layouts/*"],
      "@data/*": ["./src/data/*"],
      "@services/*": ["./src/services/*"],
      "@types/*": ["./src/types/*"],
      "@utils/*": ["./src/utils/*"],
      "@scripts/*": ["./src/scripts/*"]
    }
  }
}
```

## Uso

### ❌ Antes (rutas relativas)
```typescript
import MainLayout from "../../layouts/MainLayout.astro";
import Header from "../components/layout/Header.astro";
import { productTiers } from "../../../data/products";
import type { Product } from "../../../types";
```

### ✅ Después (path aliases)
```typescript
import MainLayout from "@layouts/MainLayout.astro";
import Header from "@components/layout/Header.astro";
import { productTiers } from "@data/products";
import type { Product } from "@types/index";
```

## Aliases Disponibles

| Alias | Ruta Real | Uso |
|-------|-----------|-----|
| `@/*` | `./src/*` | Cualquier archivo en src/ |
| `@components/*` | `./src/components/*` | Componentes |
| `@layouts/*` | `./src/layouts/*` | Layouts |
| `@data/*` | `./src/data/*` | Datos centralizados |
| `@services/*` | `./src/services/*` | Servicios |
| `@types/*` | `./src/types/*` | Tipos TypeScript |
| `@utils/*` | `./src/utils/*` | Utilidades |
| `@scripts/*` | `./src/scripts/*` | Scripts de cliente |

## Ejemplos por Categoría

### Estilos
```typescript
import "@/styles/global.css";
```

### Componentes
```typescript
// Layout
import Header from "@components/layout/Header.astro";
import Footer from "@components/layout/Footer.astro";

// Secciones
import HeroSection from "@components/sections/home/HeroSection.astro";
import ProductSection from "@components/sections/products/ProductSection.astro";

// UI
import LoadingSpinner from "@components/ui/LoadingSpinner.astro";

// Products
import ProductCard from "@components/products/ProductCard.astro";
```

### Datos
```typescript
import { productTiers } from "@data/products";
import { serverLocations } from "@data/servers";
```

### Servicios
```typescript
import { getServersStatus } from "@services/serverStatusService";
import { getServerLatency } from "@services/pingService";
```

### Tipos
```typescript
import type { Product, ProductTier } from "@types/index";
import type { ServerStatus } from "@types/server";
```

### Layouts
```typescript
import MainLayout from "@layouts/MainLayout.astro";
```

## Beneficios

1. ✅ **Más legible**: Inmediatamente sabes de dónde viene el import
2. ✅ **Menos errores**: No te equivocas contando `../../../`
3. ✅ **Refactoring seguro**: Mover archivos no rompe imports
4. ✅ **Autocompletado**: Mejor experiencia con IDE
5. ✅ **Consistencia**: Todos los imports se ven igual sin importar dónde estés

## Excepciones

NO uses aliases para:
- **Imágenes públicas**: `src="/images/logo.webp"` (ya son absolutas)
- **Scripts públicos**: `src="/scripts/stats.js"` (ya son absolutas)
- **Assets en public/**: Siempre usa rutas desde `/`

## Migración Completada

✅ **20 archivos** migrados a path aliases
✅ **88 imports** convertidos
✅ **0 imports relativos** en páginas y layouts
