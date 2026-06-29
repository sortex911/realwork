# Green Realm Landscape - Project Context & Architecture

This document serves as the AI memory and architectural overview of the Green Realm Landscape portfolio project. It is intended to maintain consistency and context for long-term development.

## 📁 Folder Structure

```text
/
├── public/                 # Static assets (images, icons, etc.)
├── src/                    # Main source code
│   ├── components/         # Reusable React components (UI, Navbar, Footer, etc.)
│   ├── context/            # Global React Contexts (AuthContext.jsx)
│   ├── lib/                # Utility functions, custom hooks, Cloudinary config (cloudinary.js)
│   ├── pages/              # Route-level components (Home, About, Admin, Dashboard, etc.)
│   ├── services/           # Database CRUD logic (adminService.js)
│   ├── styles/             # Global CSS and component-specific stylesheets
│   ├── App.jsx             # Main routing, layout wrapping, and animation providers
│   ├── firebase.js         # Firebase SDK initialization
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables (Firebase & Cloudinary keys)
└── package.json            # Project dependencies and scripts
```

## 🗄️ Firestore Collections

The application uses Firebase Firestore as its primary NoSQL database. All CRUD operations should be routed through `src/services/adminService.js`.

- **`projects`**: Portfolio items containing `title`, `description`, `categoryId`, `imageUrl`, `images[]`, and `order`.
- **`categories`**: Groupings for projects.
- **`users`**: Role-based access control. Maps Firebase Auth UID to user data (e.g., `{ email: "...", role: "admin" }`).
- **`team`**: Team member profiles (`name`, `role`, `image`).
- **`news`**: Blog/news entries categorized into `recent_news`, `publications`, `interviews`, `online_features`.
- **`clients`**: Client logo URLs.
- **`inquiries`**: Submissions from the contact form.
- **`services`**: Services offered (`title`, `desc`, `icon`, `images[]`).

## 🪣 Cloudinary Image Storage

Firebase is used for authentication and database. **Cloudinary** is used for all media storage.

- **Cloud Name**: `daivsnmcc`
- **Folder Mode**: Dynamic folders
- **Folders used**: `projects`, `team`, `news`, `clients`, `services`, `general`
- **Usage**: All images uploaded from the Admin Dashboard are pushed to Cloudinary via `src/lib/cloudinary.js`. The resulting `secure_url` from Cloudinary is saved to Firestore documents.
- **Optimization**: Images are auto-optimized on display via Cloudinary URL transforms (`w_{width},q_auto,f_auto`).

## 🔐 Authentication Flow

1. **Provider**: Firebase Authentication (Email/Password only).
2. **Global State**: Managed by `<AuthProvider>` in `src/context/AuthContext.jsx`.
3. **Flow**:
   - User logs in via the `/admin` route.
   - `onAuthStateChanged` triggers globally.
   - If a valid `firebaseUser` is found, the app queries the `users` collection in Firestore for a document matching the user's `UID`.
   - If the document exists and has `role: 'admin'`, the context sets `isAdmin = true`.
4. **Route Protection**: The `/dashboard` route is wrapped in `<ProtectedRoute>`. If a user is not authenticated or lacks the admin role, they are redirected.

## 📜 Coding Rules

1. **Preservation**: Do not rewrite working code, alter existing functionality, or change UI aesthetics unnecessarily.
2. **Reusability**: Reuse existing components (e.g., `<OptimizedImage>`, `<FadeUp>`, `<ServiceCard>`) to maintain a DRY and clean architecture.
3. **Separation of Concerns**: Keep UI logic in components/pages, and keep database/storage logic inside `src/services/adminService.js` and `src/lib/`.
4. **Targeted Fixes**: Fix only the specific issues requested. Avoid scope creep.
5. **Stability**: Ensure code is production-ready, optimized, and error-free. Verify that changes do not break existing features, animations (Framer Motion/GSAP), or responsive designs.
6. **No Placeholders**: When writing or updating code, always provide fully functional and complete code blocks.

## 🔄 Project Workflow for AI

1. **Understand Requirements**: Read the user's specific request carefully.
2. **Consult Context**: Refer back to this `PROJECT_CONTEXT.md` to understand architectural constraints.
3. **Analyze Impact**: Evaluate how the requested changes affect current routing, global state, styling, and UI.
4. **Implement**: Write or modify code adhering to the established patterns.
5. **Verify & Report**: Ensure the logic holds up, builds successfully, and provide a clear, concise summary of the changes to the user.
