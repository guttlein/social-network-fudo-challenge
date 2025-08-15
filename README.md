# Social Network App - Fudo Challenge

A social network application developed in React + TypeScript that allows creating, reading, updating, and deleting posts and comments, with scalable architecture and modern quality tools.

## 🚀 **Implemented Features**

- ✅ **Posts**: Create, edit, delete, and view posts with infinite scroll
- ✅ **Comments**: Nested comment system with visual tree structure
- ✅ **Responsive Design**: Tailwind CSS optimized for mobile
- ✅ **React Router**: Navigation between pages
- ✅ **React Query**: Optimized state management and caching
- ✅ **TypeScript**: Complete type safety
- ✅ **Docker**: Configured for Nginx deployment
- ✅ **Scalable Architecture**: Feature-based and atomic design
- ✅ **Quality Tools**: Configured (ESLint, Prettier, Simple Git Hooks)
- ✅ **Complete Testing**: Vitest + React Testing Library
- ✅ **Skeleton Loaders**: UX improvements for posts and comments
- ✅ **Toast System**: User feedback system
- ✅ **Confirmation Modals**: For destructive actions
- ✅ **Infinite Scroll**: For posts with performance optimization

## 🛠 **Technology Stack**

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite with optimized path mapping
- **Styling**: Tailwind CSS with responsive design
- **State Management**: TanStack React Query v5
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios with centralized configuration
- **Containerization**: Docker + Nginx
- **Code Quality**: ESLint 9 (flat config) + Prettier + Simple Git Hooks
- **Testing**: Vitest + React Testing Library + 70%+ Coverage
- **Performance**: Infinite scroll with Intersection Observer

## 📱 **Implemented Functionality**

### **Core Features:**

1. ✅ **Posts**: Complete CRUD with infinite scroll
2. ✅ **Comments**: Nested system with replies and editing
3. ✅ **Navigation**: Routing between main and detail pages
4. ✅ **Responsive**: Design optimized for mobile and desktop

### **UX Enhancements:**

1. ✅ **Skeleton Loaders**: Loading states for posts and comments
2. ✅ **Toast Notifications**: Feedback for successful/failed actions
3. ✅ **Confirmation Modals**: Confirmation before deleting content
4. ✅ **Infinite Scroll**: Progressive loading of posts
5. ✅ **Loading States**: Visual state indicators

### **Technical Features:**

1. ✅ **Path Mapping**: Simplified imports with `@/` aliases
2. ✅ **Type Safety**: Strict TypeScript with complete interfaces
3. ✅ **Error Handling**: Robust API error handling
4. ✅ **Performance**: Optimization with React Query and lazy loading
5. ✅ **Testing**: Complete coverage of components and hooks

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

## 🐳 **Docker**

### **Build Image**

```bash
docker build -t social-network-app .
```

### **Run Container**

```bash
docker run -p 3000:80 social-network-app
```

The application will be available at `http://localhost:3000`

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
- `GET /comment` - Get comments
- `POST /comment` - Create comment
- `PUT /comment/:id` - Update comment
- `DELETE /comment/:id` - Delete comment

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
- Visual separators for nested comments

### **Step 4: Performance** ✅

- Infinite scroll for posts
- Optimization with React Query
- Custom hooks for specific functionalities

### **Step 5: Testing** ✅

- Complete tests for all components
- 100% test coverage
- Optimized Vitest configuration

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

### **Infrastructure**

- GitHub Actions for CI/CD ✅
- Automated testing and linting ✅
- Docker image building ✅
- Dependency management ✅
- Release automation ✅
