## Here is the full folder structure

```js
Next.js App/
├── node_modules/ # Auto-generated, ignore
├── public/ # Static files (images, favicon, etc.)
│ ├── favicon.ico
│ ├── images/
│ └── ...
├── src/ # Main source code
│ ├── app/ # Pages and layouts (Next.js app directory)
│ │ ├── (dashboard) # Consider dashboard will another app
│ │ │ ├── layout.tsx # Root layout for the dashboard
│ │ │ └── page.tsx # Dashboard homepage
│ │ ├── layout.tsx # Root layout for the app
│ │ ├── page.tsx # Home page
│ │ ├── [slug]/ # Dynamic routes for future pages
│ │ │ └── page.tsx
│ │ └── ...
│ ├── assets/
│ │ ├── svg/  # All the svg icons (e.g., Moon.tsx)
│ │ ├── images/ # like dynamic images or something like that
│ │ └── ...
│ ├── components/ # Reusable UI components
│ │ ├── ui/ # Generic, reusable components (e.g., Button, Input)
│ │ │ ├── Button.tsx
│ │ │ ├── Input.tsx
│ │ │ └── Box.tsx
│ │ ├── layout/ # Layout-specific components - will be available though out the app
│ │ │ ├── Navbar.tsx # for components specific to layouts
│ │ │ └── Footer.tsx
│ │ └── page/ # Page-specific components
│ │ │ ├── DashboardHeader.tsx # for components specific to layouts
│ │ │ └── HomePageServices.tsx # Parent component will be map through the data to child
│ │ │ │ └── HomePageService.tsx # Child component being mapped to parent (e.g, HomePageServices.tsx)
│ ├── lib/ # Utility functions and constants
│ │ ├── types.ts # TypeScript types and interfaces
│ │ └── utils.ts # Utility functions
│ ├── store/ # Redux-related files
│ │ ├── slices/ # Redux slices for different features
│ │ │ ├── authSlice.ts
│ │ │ └── userSlice.ts
│ │ ├── store.ts # Redux store configuration
│ │ └── types.ts # Redux-specific types
│ ├── styles/ # Tailwind and global styles
│ │ └── custom.css # Custom utility classes if needed
│ └── hooks/ # Custom React hooks
│ │ ├── useAuth.ts # Example custom hook
│ │ └── ...
├── .gitignore # Git ignore file
├── eslint.config.mjs # ESLint configuration
├── next.config.ts # Next.js configuration
├── next-env.d.ts # TypeScript environment definitions
├── package.json # Project dependencies and scripts
├── postcss.config.mjs # PostCSS configuration (for Tailwind)
├── README.md # Project documentation
└── tsconfig.json # TypeScript configuration
```

## Best Practices and Guidance About Folder Structure

This guide is here to help you understand the purpose of each folder and how to use them effectively in our front-end app, mainly for Next.js app. Let’s follow these conventions to keep our codebase centralized and scalable!.

### `public/`

- **Purpose**: Stores static files like images, favicon, and other assets served directly by Next.js.
- **Usage**: Add `favicon.ico`, `images/` for media, and other static resources. Reference them with `/filename` in your code.

### `src/app/`

- **Purpose**: Contains pages and layouts using Next.js.
- **Usage**:
  - `layout.tsx`: Define the root layout for the app or dashboard (e.g., `(dashboard)/layout.tsx`).
  - `page.tsx`: Create individual pages (e.g., `page.tsx` for home, `[slug]/page.tsx` for dynamic routes).
  - Use subdirectories like `(dashboard)` for feature-specific apps or sections.

### `src/assets/`

- **Purpose**: Holds static assets like SVG icons and images.
- **Usage**:
  - `svg/`: Store SVG components (e.g., `Moon.tsx`).
  - `images/`: Place dynamic images or media files. Import or reference as needed in components.

### `src/components/`

- **Purpose**: Houses reusable UI components.
- **Usage**:
  - `ui/`: Generic components like `Button.tsx`, `Input.tsx` for universal use.
  - `layout/`: Layout-specific components like `Navbar.tsx`, `Footer.tsx`.
  - `page/`: Page-specific components like `DashboardHeader.tsx` or `HomePageServices.tsx` (with child `HomePageService.tsx`).

### `src/lib/`

- **Purpose**: Contains utility functions, constants, and modules.
- **Usage**:
  - `types.ts`: Define shared TypeScript types and interfaces.
  - `utils.ts`: Add utility functions (e.g., `formatDate`, `generateSlug`).

### `src/store/`

- **Purpose**: Manages Redux state logic.
- **Usage**:
  - `slices/`: Create feature-specific slices (e.g., `authSlice.ts`, `userSlice.ts`).
  - `store.ts`: Configure the Redux store.
  - `types.ts`: Define Redux-specific types.

### `src/styles/`

- **Purpose**: Stores global and custom styles with Tailwind CSS.
- **Usage**:
  - `globals.css`: Include Tailwind directives and global styles.
  - `custom.css`: Add custom utility classes if needed.

### `src/hooks/`

- **Purpose**: Contains custom React hooks.
- **Usage**: Create hooks like `useAuth.ts` for reusable stateful logic.

## Team Guidelines

- Follow the folder structure for consistency.
- Add new components to `components/` with appropriate subfolders.
- Use `lib/` for reusable utilities and `store/` for state management.
- Document changes in `README.md` and update types in `lib/types.ts` as needed.
- Avoid cluttering `app/` with non-page files; use subdirectories for organization.

This structure ensures a centralized workflow, making it easy for your team to collaborate and scale the app.
