# Social Network App - Fudo Challenge

Una aplicación de red social desarrollada en React + TypeScript que permite crear, leer, actualizar y eliminar posts y comentarios.

## 🚀 **Características**

- ✅ **Posts**: Crear, eliminar y ver posts
- ✅ **Comentarios**: Sistema de comentarios anidados (como Reddit)
- ✅ **Diseño responsive** con Tailwind CSS
- ✅ **React Router** para navegación entre páginas
- ✅ **React Query** para manejo de estado y cache
- ✅ **TypeScript** para type safety
- ✅ **Docker** configurado para deployment
- ✅ **Arquitectura escalable** con feature-based y atomic design
- ✅ **Herramientas de calidad** configuradas (ESLint, Prettier, Husky)

## 🛠 **Tecnologías utilizadas**

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Containerization**: Docker + Nginx
- **Code Quality**: ESLint + Prettier + Husky + lint-staged
- **Testing**: Vitest + React Testing Library

## 📱 **Funcionalidades implementadas**

### **Requerimientos obligatorios:**

1. ✅ Pantalla principal con lista de posts
2. ✅ Pantalla de detalle de post con comentarios
3. ✅ Crear posts y comentarios
4. ✅ Eliminar posts y comentarios
5. ✅ Diseño personalizado (sin librerías de componentes)
6. ✅ Dockerfile para Nginx

### **Bonus implementados:**

1. ✅ Comentarios anidados con estructura de árbol
2. ✅ Sistema de respuestas a comentarios
3. ✅ Editar posts y comentarios
4. ✅ Tests unitarios con Vitest y React Testing Library
5. ✅ Arquitectura escalable y organizada
6. ✅ Herramientas de calidad y pre-commit hooks

### **Pendiente por implementar:**

1. ⏳ Skeleton loaders y mejoras de UX
2. ⏳ Animaciones con Framer Motion
3. ⏳ Likes y reacciones
4. ⏳ Paginación e infinite scroll
5. ⏳ Perfiles de usuario

## 🚀 **Instalación y desarrollo**

### **Prerrequisitos**

- Node.js 18+
- npm o yarn

### **Instalación**

```bash
# Clonar el repositorio
git clone <tu-repo-url>
cd social-network-fudo-challenge

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### **Scripts disponibles**

```bash
npm run dev                    # Iniciar servidor de desarrollo
npm run build                  # Construir para producción
npm run preview                # Previsualizar build de producción
npm run lint                   # Ejecutar ESLint
npm run lint:fix               # Ejecutar ESLint con auto-fix
npm run format                 # Formatear código con Prettier
npm run format:check          # Verificar formato con Prettier
npm run test                   # Ejecutar tests
npm run test:ui                # Ejecutar tests con interfaz visual
npm run test:coverage          # Ejecutar tests con cobertura
npm run test:coverage:check    # Verificar cobertura mínima (70%)
```

## 🏗 **Arquitectura del proyecto**

### **Estructura feature-based + atomic design**

```
src/
├── app/                       # Configuración de la aplicación
│   ├── providers/            # Providers (React Query, etc.)
│   └── routes/               # Configuración de rutas
├── features/                  # Funcionalidades por feature
│   ├── posts/                # Feature de posts
│   │   ├── hooks/           # Hooks específicos de posts
│   │   └── index.ts         # Exports públicos
│   └── comments/             # Feature de comentarios
│       ├── hooks/            # Hooks específicos de comentarios
│       └── index.ts          # Exports públicos
├── shared/                    # Recursos compartidos
│   ├── api/                  # Servicios de API
│   ├── components/           # Componentes reutilizables
│   │   └── molecules/        # Componentes moleculares
│   ├── constants/            # Constantes de la aplicación
│   ├── types/                # Tipos TypeScript
│   ├── utils/                # Utilidades y helpers
│   └── index.ts              # Exports centralizados
├── pages/                     # Páginas de la aplicación
└── main.tsx                  # Punto de entrada
```

### **Principios de diseño**

- **Feature-based**: Organización por funcionalidad
- **Atomic Design**: Componentes organizados por complejidad
- **Path mapping**: Imports simplificados con `@/` aliases
- **Separación de responsabilidades**: API, tipos, y lógica separados

## 🔧 **Configuración de desarrollo**

### **ESLint + Prettier**

- **ESLint**: Reglas estrictas de TypeScript y React
- **Prettier**: Formato consistente de código
- **Integración**: ESLint y Prettier configurados para trabajar juntos

### **Husky + lint-staged**

- **Pre-commit hooks**: Validación automática antes de cada commit
- **lint-staged**: Solo valida archivos modificados
- **Configuración automática**: Se instala automáticamente con `npm install`

### **TypeScript**

- **Configuración estricta**: Mejor calidad de código
- **Path mapping**: Imports simplificados con `@/` aliases
- **Project references**: Configuración optimizada para Vite

### **Vite**

- **Configuración optimizada**: Build rápido y eficiente
- **Path mapping**: Soporte para aliases de TypeScript
- **Hot reload**: Desarrollo rápido con cambios en tiempo real

## 🧪 **Testing**

### **Configuración**

- **Vitest**: Framework de testing rápido
- **React Testing Library**: Testing de componentes React
- **Cobertura**: Mínimo 70% en líneas, funciones, branches y statements

### **Ejecutar tests**

```bash
npm run test                   # Tests en modo watch
npm run test:ui                # Interfaz visual para tests
npm run test:coverage          # Tests con reporte de cobertura
npm run test:coverage:check    # Verificar cobertura mínima
```

## 🐳 **Docker**

### **Construir la imagen**

```bash
docker build -t social-network-app .
```

### **Ejecutar el contenedor**

```bash
docker run -p 3000:80 social-network-app
```

La aplicación estará disponible en `http://localhost:3000`

## 📡 **API Endpoints**

La aplicación consume la siguiente API pública:

- `GET /post` - Obtener todos los posts
- `GET /post/:id` - Obtener un post específico
- `POST /post` - Crear un nuevo post
- `DELETE /post/:id` - Eliminar un post
- `GET /post/:id/comment` - Obtener comentarios de un post
- `POST /post/:id/comment` - Crear un comentario
- `DELETE /post/:id/comment/:commentId` - Eliminar un comentario

## 🎨 **Diseño y UX**

- **Diseño minimalista** y moderno
- **Responsive design** para móviles y desktop
- **Sistema de colores** consistente
- **Tipografía legible** y jerarquía visual clara
- **Interacciones suaves** y feedback visual

## 🚀 **Deployment**

### **Opción 1: Docker (Recomendado)**

```bash
# Construir y ejecutar
docker build -t social-network-app .
docker run -p 80:80 social-network-app
```

### **Opción 2: Build estático**

```bash
npm run build
# Servir la carpeta dist con cualquier servidor web
```

## 🤝 **Contribución**

### **Flujo de trabajo**

1. **Fork** el proyecto
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Haz commit** de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la rama (`git push origin feature/AmazingFeature`)
5. **Abre un Pull Request**

### **Estándares de código**

- **ESLint**: El código debe pasar todas las reglas de linting
- **Prettier**: Formato automático aplicado
- **Tests**: Nuevas funcionalidades deben incluir tests
- **Cobertura**: Mantener cobertura mínima del 70%

## 📄 **Licencia**

Este proyecto fue desarrollado como parte del challenge técnico para Fudo.

## 👨‍💻 **Autor**

Desarrollado como challenge técnico para demostrar habilidades en:

- React + TypeScript
- Arquitectura de aplicaciones frontend escalable
- Integración con APIs
- Docker y containerización
- Diseño responsive y UX
- Testing y calidad de código
- Herramientas de desarrollo modernas
