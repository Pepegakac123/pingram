# Pingram - Social Media Image Sharing Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white)](https://tanstack.com/router/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)](https://appwrite.io/)

## 📸 Project Overview

Pingram is a modern social media platform for sharing images, inspired by Instagram's core functionality. This project demonstrates my ability to build a complete, interactive frontend application with real-world features including user authentication, image uploads, social interactions, and responsive design.

I created this project to practice implementing complex frontend features while integrating with backend services through a comprehensive API. It serves as a practical application of React patterns, state management, and modern web development workflows.

## [Live Demo](https://pingram.kacperadamczyk.pl/)

![Pingram Demo](https://github.com/Pepegakac123/pingram/blob/main/public/pingram.gif)

## 🚀 Key Features

- **User Authentication System** - Complete registration and login flows with secure JWT authentication
- **Image Upload & Management** - Post creation with image uploads, captions, location tagging, and custom tags
- **Social Interactions** - Like and save functionalities for posts
- **Infinite Scroll Feed** - Dynamically loaded content with efficient pagination
- **Responsive Design** - Fully responsive UI that works seamlessly on mobile and desktop devices
- **User Profiles** - View user profiles and their posted content
- **Post Discovery** - Explore page with search functionality to discover content
- **Real-time Feedback** - Toast notifications to provide user feedback for actions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Latest React features with functional components and hooks
- **TypeScript** - Type safety throughout the application
- **TanStack Router** - Modern routing with type-safe routes
- **TanStack Query** - Data fetching and cache management
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Shadcn UI** - Reusable UI components with consistent design
- **React Hook Form** - Form validation and submission handling
- **Zod** - Schema-based validation

### Backend & Services
- **Appwrite** - Backend-as-a-Service for:
  - User authentication and account management
  - Database and file storage
  - Image hosting and avatar generation

## 💡 Implementation Highlights

- **Optimistic UI Updates** - Immediate UI updates for likes and saves before API confirmation
- **Custom Hooks** - Reusable logic extracted into custom hooks (e.g., `useDebounce` for search)
- **Context API** - User authentication state management across the application
- **Form Validation** - Client-side validation with immediate feedback using React Hook Form and Zod
- **Error Handling** - Comprehensive error handling with user-friendly feedback
- **Responsive Layout** - Tailored UI components for different screen sizes with utility classes
- **Code Organization** - Clean project structure with separation of concerns

## 🔍 Project Structure

```
pingram/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── forms/       # Form components for user inputs
│   │   ├── shared/      # Common components used across pages
│   │   └── ui/          # Basic UI elements from shadcn/ui
│   ├── context/         # React Context for global state
│   ├── hooks/           # Custom React hooks
│   ├── lib/
│   │   ├── appwrite/    # Appwrite API integration
│   │   ├── validation/  # Zod validation schemas
│   │   └── react-query/ # Query and mutation definitions
│   ├── routes/          # Application routes with TanStack Router
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper functions and utilities
├── public/              # Static assets
├── globals.css          # Global styles and Tailwind utilities
└── main.tsx             # Application entry point
```

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pingram.git
   cd pingram
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file with your Appwrite credentials:
   ```
   VITE_APPWRITE_URL=
   VITE_APPWRITE_PROJECT_ID=
   VITE_APPWRITE_DATABASE_ID=
   VITE_APPWRITE_STORAGE_ID=
   VITE_APPWRITE_USERS_COLLECTION_ID=
   VITE_APPWRITE_POSTS_COLLECTION_ID=
   VITE_APPWRITE_SAVES_COLLECTION_ID=
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔮 Why This Project Matters

This project demonstrates my ability to:

1. **Build Complex UI Systems** - I've implemented a complete social media interface with multiple views and interactive components
2. **Manage Application State** - Using React Context and TanStack Query to efficiently handle local and server state
3. **Implement Authentication Flows** - Secure user authentication with proper JWT handling
4. **Create Responsive Interfaces** - Mobile-first design approach with adaptive layouts
5. **Work with APIs** - Integration with backend services through a structured API layer
6. **Handle Asynchronous Operations** - Loading states, error handling, and optimistic updates
7. **Apply Modern React Patterns** - Custom hooks, context, and functional components with React 18 features

I faced several challenges during development, including:

- Implementing infinite scroll with efficient data fetching
- Managing complex form state with proper validation
- Creating a responsive layout that works across devices
- Handling image uploads with proper UI feedback


## 📄 License

MIT License

---

Thanks for checking out my project! I'm continuously working to improve my development skills and would appreciate any feedback.