<p align="center">
  <a href="https://tailwindcss.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/djehzyhl5/image/upload/dev-kit_ratznl.jpg">
      <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/djehzyhl5/image/upload/dev-kit_ratznl.jpg">
      <img alt="Tailwind CSS" src="https://res.cloudinary.com/djehzyhl5/image/upload/dev-kit_ratznl.jpg" style="max-width: 100%;">
    </picture>
  </a>
</p>

## Here is the full folder structure 📂

```js
Next.js App/
├── node_modules/
├── public/
│ ├── favicon.ico
│ ├── images/
│ └── ...
├── src/
│ ├── app/
│ │ ├── (dashboard)
│ │ │ ├── layout.tsx
│ │ │ └── page.tsx
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ ├── [slug]/
│ │ │ └── page.tsx
│ │ └── ...
│ ├── assets/
│ │ ├── svg/
│ │ ├── images/
│ │ └── ...
│ ├── components/
│ │ ├── ui/
│ │ │ ├── Button.tsx
│ │ │ ├── Input.tsx
│ │ │ └── Box.tsx
│ │ ├── layout/
│ │ │ ├── Navbar.tsx
│ │ │ └── Footer.tsx
│ │ └── page/
│ │ │ ├── DashboardHeader.tsx
│ │ │ └── HomePageServices.tsx
│ │ │ │ └── HomePageService.tsx
│ ├── lib/
│ │ ├── types.ts
│ │ └── utils.ts
│ ├── store/
│ │ ├── slices/
│ │ │ ├── authSlice.ts
│ │ │ └── userSlice.ts
│ │ ├── store.ts
│ │ └── types.ts
│ ├── styles/
│ │ └── custom.css
│ └── hooks/
│ │ ├── useAuth.ts
│ │ └── ...
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Best Practices and Guidance About Folder Structure ⚡

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
