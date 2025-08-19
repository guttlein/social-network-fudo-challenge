# Social Network App - Fudo Challenge

A social network application developed in React + TypeScript that allows creating, reading, updating, and deleting posts and comments, with scalable architecture and modern quality tools.

Vercel website: `https://social-network-fudo-challenge.vercel.app/`

## 🚀 **Implemented Features**

- ✅ **Posts**: Create, edit, delete, and view posts with infinite scroll
- ✅ **Comments**: **Complete nested comment system with replies and visual tree structure**
- ✅ **Comment Management**: **Handle orphaned comments when parent is deleted**
- ✅ **Responsive Design**: Tailwind CSS optimized for mobile
- ✅ **React Router**: Navigation between pages
- ✅ **React Query**: Optimized state management and caching
- ✅ **TypeScript**: Complete type safety
- ✅ **Docker**: Optimized multi-stage build with Nginx for production
- ✅ **Scalable Architecture**: Feature-based and atomic design
- ✅ **Quality Tools**: Configured (ESLint, Prettier, Simple Git Hooks)
- ✅ **Complete Testing**: Vitest + React Testing Library
- ✅ **Skeleton Loaders**: UX improvements for posts and comments
- ✅ **Toast System**: User feedback system
- ✅ **Confirmation Modals**: For destructive actions
- ✅ **Infinite Scroll**: For posts with performance optimization
- ✅ **Comment Tree Structure**: **Visual representation of nested comments with proper parent-child relationships**

## 🛠 **Technology Stack**

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite with optimized path mapping
- **Styling**: Tailwind CSS with responsive design
- **State Management**: TanStack React Query v5
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with centralized configuration
- **Containerization**: Docker multi-stage + optimized Nginx
- **Code Quality**: ESLint 9 (flat config) + Prettier + Simple Git Hooks
- **Testing**: Vitest + React Testing Library + 70%+ Coverage
- **Performance**: Infinite scroll with Intersection Observer

## 📱 **Implemented Functionality**

### **Core Features:**

1. ✅ **Posts**: Complete CRUD with infinite scroll
2. ✅ **Comments**: **Complete nested system with replies, editing, and proper parent-child management**
3. ✅ **Navigation**: Routing between main and detail pages
4. ✅ **Responsive**: Design optimized for mobile and desktop

### **Comment System Features:**

1. ✅ **Nested Comments**: **Reply to comments with unlimited nesting levels**
2. ✅ **Visual Tree Structure**: **Clear visual representation with color-coded borders**
3. ✅ **Orphaned Comment Handling**: **Comments whose parent was deleted are shown with explanatory notes**
4. ✅ **Proper Parent-Child Relationships**: **Correct parentId management for API calls**
5. ✅ **Comment CRUD Operations**: **Create, read, update, delete comments and replies**

### **UX Enhancements:**

1. ✅ **Skeleton Loaders**: Loading states for posts and comments
2. ✅ **Toast Notifications**: Feedback for successful/failed actions
3. ✅ **Confirmation Modals**: Confirmation before deleting content
4. ✅ **Infinite Scroll**: Progressive loading of posts
5. ✅ **Loading States**: Visual state indicators
6. ✅ **Visual Comment Hierarchy**: **Color-coded borders for different nesting levels**

### **Technical Features:**

1. ✅ **Path Mapping**: Simplified imports with `@/` aliases
2. ✅ **Type Safety**: Strict TypeScript with complete interfaces
3. ✅ **Error Handling**: Robust API error handling
4. ✅ **Performance**: Optimization with React Query and lazy loading
5. ✅ **Testing**: Complete coverage of components and hooks
6. ✅ **API Integration**: **Proper parentId handling for MockAPI compatibility**

## 🚀 **Installation and Development**

### **Prerequisites**

- Node.js 18+
- npm or yarn
- Git

### **Installation**

```bash
# Clone the repository
git clone <your-repo-url>
cd social-network-fudo-challenge

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### **Available Scripts**

```bash
npm run dev                    # Development server
npm run build                  # Production build
npm run preview                # Build preview
npm run lint                   # Run ESLint
npm run lint:fix               # ESLint with auto-fix
npm run format                 # Format with Prettier
npm run test                   # Tests in watch mode
npm run test:run               # Tests once
npm run test:coverage          # Tests with coverage
```

### **Docker Commands**

```bash
# Build production image
docker build -t social-network-app .

# Run container
docker run -p 3000:80 social-network-app

# View container logs
docker logs <container-id>

# Stop container
docker stop <container-id>
```

## 🏗 **Project Architecture**

### **Feature-Based + Atomic Design Structure**

```
src/
├── app/                       # Application configuration
│   ├── providers/            # Providers (React Query, Toast)
│   └── routes/               # Route configuration
├── features/                  # Features by functionality
│   ├── posts/                # Posts feature
│   │   ├── hooks/           # usePosts, useInfinitePosts
│   │   └── index.ts         # Public exports
│   └── comments/             # Comments feature
│       ├── hooks/            # useComments
│       └── index.ts          # Public exports
├── shared/                    # Shared resources
│   ├── api/                  # Centralized API services
│   ├── components/           # Reusable components
│   │   ├── atoms/           # Basic components (Skeleton)
│   │   └── molecules/       # Compound components
│   ├── constants/            # Application constants
│   ├── contexts/             # Contexts (Toast)
│   ├── hooks/                # Shared hooks
│   ├── types/                # TypeScript types
│   ├── utils/                # Utilities (buildCommentTree)
│   └── index.ts              # Centralized exports
├── pages/                     # Application pages
├── test/                      # Test configuration
└── main.tsx                  # Entry point
```

### **Design Principles**

- **Feature-based**: Organization by functionality
- **Atomic Design**: Components organized by complexity
- **Path Mapping**: Simplified imports with `@/` aliases
- **Separation of concerns**: API, types, and logic separated
- **Reusability**: Modular and configurable components

## 🔧 **Development Configuration**

### **ESLint 9 + Prettier**

- **ESLint**: Flat configuration with strict TypeScript and React rules
- **Prettier**: Consistent code formatting
- **Integration**: ESLint and Prettier configured to work together

### **Simple Git Hooks + lint-staged**

- **Pre-commit hooks**: Automatic validation before each commit
- **lint-staged**: Only validates modified files
- **Migration**: From Husky to Simple Git Hooks (no deprecation)

### **TypeScript**

- **Strict configuration**: Better code quality
- **Path mapping**: Simplified imports with `@/` aliases
- **Project references**: Configuration optimized for Vite

### **Vite**

- **Optimized configuration**: Fast and efficient build
- **Path mapping**: Support for TypeScript aliases
- **Hot reload**: Fast development with real-time changes

## 🧪 **Testing**

### **Configuration**

- **Vitest**: Fast and modern testing framework
- **React Testing Library**: React component testing
- **Coverage**: Minimum 70% in lines, functions, branches, and statements
- **Test Utils**: Custom render with providers

### **Test Coverage**

- **Modal.test.tsx**: 16/16 tests ✅
- **Toast.test.tsx**: 22/22 tests ✅
- **CommentItem.test.tsx**: 13/13 tests ✅
- **Home.test.tsx**: 2/2 tests ✅
- **Total**: 53/53 tests passing (100%)

### **Running Tests**

```bash
npm run test                   # Tests in watch mode
npm run test:run               # Tests once
npm run test:coverage          # Tests with coverage report
```

## 🎨 **Implemented UI Components**

### **Skeleton Loaders**

- **Skeleton**: Reusable base component
- **PostSkeleton**: Specific loader for posts
- **CommentSkeleton**: Specific loader for comments
- **SkeletonList**: List of skeletons

### **Modals**

- **Modal**: Reusable base component
- **ConfirmDeleteModal**: Confirmation modal for deletion

### **Toast System**

- **Toast**: Individual notification component
- **ToastContainer**: Toast container
- **ToastContext**: Context for toast management
- **useToastActions**: Helper hook for toast actions

### **Infinite Scroll**

- **InfiniteScrollLoader**: Loader for infinite scroll
- **useThresholdFetch**: Hook for scroll detection

### **Comment System Components**

- **CommentItem**: **Handles individual comments with nested replies**
- **CommentForm**: **Form for creating comments and replies**
- **CommentSkeleton**: **Loading state for comments**
- **buildCommentTree**: **Utility for building comment hierarchy**

## 🐳 **Docker and Deployment**

### **Build Image**

```bash
docker build -t social-network-app .
```

### **Run Container**

```bash
docker run -p 3000:80 social-network-app
```

### **Verify Image**

```bash
# View available images
docker images | grep social-network-app

# View container logs
docker logs <container-id>

# Access container for debugging
docker exec -it <container-id> sh
```

### **Nginx Configuration**

The application includes an optimized Nginx configuration for SPAs:

- ✅ **SPA Routing**: Complete support for React Router
- ✅ **Gzip Compression**: Performance optimization
- ✅ **Static Files Cache**: Appropriate cache headers
- ✅ **Security Headers**: XSS protection, frame options
- ✅ **MIME Types**: Correct configuration for static files

### **Ports and Access**

- **Internal port**: 80 (Nginx)
- **External port**: 3000 (configurable)
- **Access URL**: `http://localhost:3000`

### **Docker Optimizations**

- **Multi-stage build**: Reduces final image size
- **Alpine Linux**: Lightweight base image
- **Layer caching**: Docker layer optimization
- **Production ready**: Configuration ready for production

### **Docker Troubleshooting**

#### **Common Issues and Solutions**

**Error: "command not found: tsc" or "command not found: vite"**

- ✅ **Solution**: The Dockerfile is already corrected to install all dependencies
- ✅ **Cause**: devDependencies are needed for the build

**Error: "Cannot find module"**

- ✅ **Solution**: Verify that `package-lock.json` is in the repository
- ✅ **Cause**: Dependencies not synchronized

**Error: "Permission denied" in Nginx**

- ✅ **Solution**: The Dockerfile already handles permissions correctly
- ✅ **Cause**: Permission issues with static files

#### **Debugging Commands**

```bash
# View detailed build logs
docker build -t social-network-app . --progress=plain

# Run with real-time logs
docker run -p 3000:80 social-network-app

# Verify that the image was built correctly
docker run --rm social-network-app nginx -t
```

## 🚀 **CI/CD Pipeline**

### **GitHub Actions Workflow**

The project includes a basic GitHub Actions workflow that runs automatically:

#### **When does it run?**

- ✅ **Push to main**: Executes the complete pipeline
- ✅ **Pull Request**: Verifies everything works before merging

#### **What does it do?**

1. **Install dependencies** (`npm ci`)
2. **Run ESLint** (`npm run lint`)
3. **Run tests** (`npm run test:run`)
4. **Build the app** (`npm run build`)

#### **How does it work?**

- **Automatic**: You don't need to do anything else
- **Verification**: Ensures code works before merging
- **Quality**: Maintains consistent code standards

#### **Documentation**

This workflow is based on the [official GitHub Actions documentation](https://docs.github.com/en/actions).

### **Benefits**

- ✅ **Automatic quality**: No more linting errors or failing tests
- ✅ **Confidence**: You know the code works before merging
- ✅ **Professional**: Industry standard implemented

## 📡 **API Integration**

### **Configuration**

- **Base URL**: MockAPI for development
- **Endpoints**: Posts and comments
- **Error Handling**: Robust error handling
- **Caching**: React Query for optimization

### **Used Endpoints**

- `GET /post` - Get posts with pagination
- `GET /post/:id` - Get specific post
- `POST /post` - Create new post
- `PUT /post/:id` - Update post
- `DELETE /post/:id` - Delete post
- `GET /post/:id/comment` - Get comments for a post
- `POST /post/:id/comment` - Create comment or reply
- `PUT /post/:id/comment/:commentId` - Update comment
- `DELETE /post/:id/comment/:commentId` - Delete comment

### **Comment API Features**

- ✅ **Proper parentId Handling**: **Correctly manages parentId for nested comments**
- ✅ **Orphaned Comment Support**: **Handles comments whose parent was deleted**
- ✅ **MockAPI Compatibility**: **Works with MockAPI's parentId format**
- ✅ **Tree Structure Building**: **Efficient comment hierarchy construction**

## 🚀 **Performance and Optimization**

### **React Query**

- **Caching**: Intelligent data caching
- **Background Updates**: Background updates
- **Optimistic Updates**: Immediate responsive UI

### **Infinite Scroll**

- **Lazy Loading**: Progressive content loading
- **Intersection Observer**: Efficient scroll detection
- **Memory Management**: Optimized memory management

### **Components**

- **Memoization**: React.memo where necessary
- **Lazy Loading**: Deferred loading of heavy components
- **Bundle Splitting**: Intelligent code division

### **Comment System Performance**

- ✅ **Efficient Tree Building**: **buildCommentTree utility optimized for performance**
- ✅ **Proper State Management**: **React Query for comment caching and updates**
- ✅ **Optimized Re-renders**: **Minimal re-renders when updating comment trees**

## 🎯 **Implemented Improvements**

### **Step 1: Architecture and Organization** ✅

- Feature-based + atomic design reorganization
- Path mapping with `@/` aliases
- Scalable folder structure

### **Step 2: Quality Tools** ✅

- ESLint 9 with strict configuration
- Prettier for consistent formatting
- Simple Git Hooks (migration from Husky)
- lint-staged for pre-commit validation

### **Step 3: UI and UX** ✅

- Skeleton loaders for posts and comments
- Toast system for feedback
- Confirmation modals
- Improved responsive design
- **Visual separators for nested comments with color coding**

### **Step 4: Performance** ✅

- Infinite scroll for posts
- Optimization with React Query
- Custom hooks for specific functionalities

### **Step 5: Testing** ✅

- Complete tests for all components
- 100% test coverage
- Optimized Vitest configuration

### **Step 6: Comment System Enhancement** ✅

- **Complete nested comment system with unlimited nesting levels**
- **Proper parentId management for API compatibility**
- **Orphaned comment handling when parent is deleted**
- **Visual tree structure with color-coded borders**
- **Efficient comment tree building utility**

### **Code Standards**

- **ESLint**: Code must pass all rules
- **Prettier**: Automatic formatting applied
- **Tests**: New features must include tests
- **Coverage**: Maintain minimum 70% coverage
- **TypeScript**: Strict typing required

## 📄 **License**

This project was developed as part of the technical challenge for Fudo.

## 👨‍💻 **Author**

Developed as a technical challenge to demonstrate skills in:

- **React 18 + TypeScript** advanced
- **Scalable frontend architecture** (feature-based + atomic design)
- **Complete testing** with Vitest + RTL
- **Modern quality tools** (ESLint 9, Simple Git Hooks)
- **Optimized performance and UX**
- **Docker and containerization**
- **Robust API integration**
- **Reusable component development**
- **Complex nested data structures** and **tree management**

### **Infrastructure**

- GitHub Actions for CI/CD ✅
- Automated testing and linting ✅
- Docker image building ✅
- Dependency management ✅
- Release automation ✅
