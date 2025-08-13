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

## 🛠 **Tecnologías utilizadas**

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Containerization**: Docker + Nginx

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

### **Pendiente por implementar:**
1. ⏳ Deployment en gh-pages (configuración lista)

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
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción
npm run lint         # Ejecutar ESLint
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

## 🏗 **Estructura del proyecto**

```
src/
├── api/              # Servicios de API
├── components/       # Componentes reutilizables
├── hooks/           # Custom hooks
├── pages/           # Páginas de la aplicación
├── types/           # Definiciones de TypeScript
├── utils/           # Utilidades y helpers
└── App.tsx          # Componente principal
```

## 🎨 **Diseño y UX**

- **Diseño minimalista** y moderno
- **Responsive design** para móviles y desktop
- **Sistema de colores** consistente
- **Tipografía legible** y jerarquía visual clara
- **Interacciones suaves** y feedback visual

## 🔧 **Configuración de desarrollo**

### **ESLint**
Configurado con reglas estrictas de TypeScript y React.

### **Tailwind CSS**
Configurado con PostCSS para optimización automática.

### **TypeScript**
Configuración estricta para mejor calidad de código.

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

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 **Licencia**

Este proyecto fue desarrollado como parte del challenge técnico para Fudo.

## 👨‍💻 **Autor**

Desarrollado como challenge técnico para demostrar habilidades en:
- React + TypeScript
- Arquitectura de aplicaciones frontend
- Integración con APIs
- Docker y containerización
- Diseño responsive y UX
